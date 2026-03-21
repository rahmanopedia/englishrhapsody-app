/* ================================================================
   ENGLISH RHAPSODY — Firebase Cloud Functions
   Zamanlanmis push bildirim gondericisi

   Kurulum:
     npm install -g firebase-tools
     firebase init functions   (Node 20, JavaScript)
     npm install in functions/
     firebase deploy --only functions

   Gerekli paketler (functions/package.json):
     "firebase-admin": "^12.0.0"
     "firebase-functions": "^5.0.0"
   ================================================================ */

const { onSchedule }  = require('firebase-functions/v2/scheduler');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
const { getMessaging } = require('firebase-admin/messaging');

initializeApp();

const db        = getFirestore();
const messaging = getMessaging();

const ONE_DAY_MS = 86_400_000;

// ── Helpers ───────────────────────────────────────────────────

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function tsToMs(ts) {
  if (!ts) return 0;
  if (ts instanceof Timestamp) return ts.toMillis();
  if (typeof ts === 'number') return ts;
  return 0;
}

function buildMessage(token, title, body, url, type) {
  return {
    token,
    notification: { title, body },
    data: { type, url },
    webpush: {
      fcmOptions: { link: url },
      notification: {
        icon:  '/icons/icon-192.png',
        badge: '/icons/icon-72.png',
      },
    },
  };
}

function pickReminder(profile) {
  const {
    notificationPrefs = {},
    lastActive        = '',
    streak            = 0,
    xpToday           = 0,
    xpGoal            = 100,
    lastSpeakingAt,
    lastNotificationSentAt,
  } = profile;

  const today          = todayStr();
  const studiedToday   = lastActive === today;
  const lastNotifMs    = tsToMs(lastNotificationSentAt);
  const lastSpeakMs    = tsToMs(lastSpeakingAt);

  // Cooldown: max 1 notification per day
  if (lastNotifMs && Date.now() - lastNotifMs < ONE_DAY_MS) return null;

  // 1. Streak warning — highest priority
  if (!studiedToday && streak > 0 && notificationPrefs.streakReminder !== false) {
    return {
      title: 'English Rhapsody',
      body:  `Serin bozulmak \u00FCzere \uD83D\uDD25 Bug\u00FCnk\u00FC k\u0131sa \u00E7al\u0131\u015Fman\u0131 yap`,
      url:   '/',
      type:  'streak',
    };
  }

  // 2. Daily lesson reminder
  if (!studiedToday && notificationPrefs.dailyReminder !== false) {
    return {
      title: 'English Rhapsody',
      body:  `Bug\u00FCnk\u00FC \u0130ngilizce dersini tamamlamay\u0131 unutma \uD83D\uDCDA`,
      url:   '/',
      type:  'daily',
    };
  }

  // 3. XP goal reminder
  if (xpToday < xpGoal && notificationPrefs.xpReminder !== false) {
    return {
      title: 'English Rhapsody',
      body:  `G\u00FCnl\u00FCk XP hedefin seni bekliyor \u26A1`,
      url:   '/',
      type:  'xp',
    };
  }

  // 4. Speaking reminder (inactive 3+ days)
  if (notificationPrefs.speakingReminder !== false) {
    const speakingInactiveDays = 3;
    if (!lastSpeakMs || Date.now() - lastSpeakMs > speakingInactiveDays * ONE_DAY_MS) {
      return {
        title: 'English Rhapsody',
        body:  `Bug\u00FCn konu\u015Fma pratiği yapal\u0131m \uD83C\uDFA4`,
        url:   '/',
        type:  'speaking',
      };
    }
  }

  return null;
}

// ── Scheduled Function — runs daily at 20:00 Istanbul time (17:00 UTC) ────

exports.sendDailyReminders = onSchedule(
  { schedule: '0 17 * * *', timeZone: 'UTC', region: 'europe-west1' },
  async () => {
    const today    = todayStr();
    console.log(`[FCM] sendDailyReminders started — ${today}`);

    let usersSnap;
    try {
      usersSnap = await db.collection('users').get();
    } catch (e) {
      console.error('[FCM] Failed to read users collection:', e.message);
      return;
    }

    const sends    = [];
    let   skipped  = 0;
    let   targeted = 0;

    for (const userDoc of usersSnap.docs) {
      const uid = userDoc.id;

      let profile = {};
      try {
        const snap = await db.doc(`users/${uid}/meta/profile`).get();
        if (!snap.exists) { skipped++; continue; }
        profile = snap.data();
      } catch (e) {
        skipped++;
        continue;
      }

      const { fcmToken, notificationPrefs = {} } = profile;

      if (!fcmToken)                             { skipped++; continue; }
      if (notificationPrefs.enabled === false)   { skipped++; continue; }

      const reminder = pickReminder(profile);
      if (!reminder)                             { skipped++; continue; }

      targeted++;
      const msg = buildMessage(fcmToken, reminder.title, reminder.body, reminder.url, reminder.type);

      sends.push(
        messaging.send(msg)
          .then(async () => {
            await db.doc(`users/${uid}/meta/profile`).update({
              lastNotificationSentAt: Timestamp.now(),
            });
            console.log(`[FCM] Sent to ${uid} (${reminder.type})`);
          })
          .catch(async (e) => {
            console.warn(`[FCM] Failed for ${uid}:`, e.message);
            if (e.code === 'messaging/registration-token-not-registered') {
              await db.doc(`users/${uid}/meta/profile`).update({ fcmToken: null });
            }
          })
      );
    }

    await Promise.allSettled(sends);
    console.log(`[FCM] Done. Targeted: ${targeted}, Skipped: ${skipped}`);
  }
);

// ── Manual Admin Trigger — HTTP callable for testing ──────────

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const { getAuth } = require('firebase-admin/auth');

// ── AI Coach Proxy ─────────────────────────────────────────────
// ANTHROPIC_KEY secret'ini ayarlamak için:
//   firebase functions:secrets:set ANTHROPIC_KEY
// Ardından: firebase deploy --only functions

const anthropicKey = defineSecret('ANTHROPIC_KEY');

exports.coachProxy = onCall(
  { region: 'europe-west1', secrets: [anthropicKey] },
  async (req) => {
    if (!req.auth) throw new HttpsError('unauthenticated', 'Login required');

    const { sentence, transcript, missed, score } = req.data || {};
    if (!sentence) throw new HttpsError('invalid-argument', 'sentence required');

    const key = anthropicKey.value();
    if (!key) throw new HttpsError('failed-precondition', 'Coach not configured');

    const missed_list = Array.isArray(missed) ? missed.slice(0, 5) : [];
    const prompt = `İngilizce telaffuz koçusun. Türk öğrenci:\nHedef cümle: "${sentence}"\nÖğrencinin söylediği: "${transcript || ''}"\nHatalı kelimeler: ${JSON.stringify(missed_list)}\nSkor: ${score || 0}/100\nTürkçe, 2-3 cümle, somut öneri + teşvik. Emoji kullan. Çok kısa ol.`;

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 200,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data?.content?.[0]?.text?.trim() || '';
      return { text };
    } catch (e) {
      throw new HttpsError('internal', 'Coach request failed');
    }
  }
);

exports.sendTestNotification = onCall({ region: 'europe-west1' }, async (req) => {
  // Must be called by a Firebase Admin user (set custom claims on backend)
  if (!req.auth) throw new HttpsError('unauthenticated', 'Login required');

  const callerUser = await getAuth().getUser(req.auth.uid);
  const claims = callerUser.customClaims || {};
  if (!claims.admin) {
    throw new HttpsError('permission-denied', 'Admin access required');
  }

  const { uid, title, body, url, type } = req.data;
  if (!uid || !title || !body) throw new HttpsError('invalid-argument', 'uid, title, body required');

  const snap = await db.doc(`users/${uid}/meta/profile`).get();
  if (!snap.exists || !snap.data().fcmToken) {
    throw new HttpsError('not-found', 'No FCM token for user');
  }

  const msg = buildMessage(snap.data().fcmToken, title, body, url || '/', type || 'admin');
  const result = await messaging.send(msg);
  return { success: true, messageId: result };
});
