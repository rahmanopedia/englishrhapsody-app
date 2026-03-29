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
const { getAuth } = require('firebase-admin/auth');

// ── Rival: Hafta anahtarı yardımcısı ─────────────────────────

function rivalWeekKey() {
  const d = new Date();
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  const y1 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const wk = Math.ceil(((t - y1) / 86400000 + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(wk).padStart(2, '0')}`;
}

const QUEUE_TTL_MS = 60000; // 60 saniye

// ── Rival: Atom eşleştirme + kuyruk yönetimi ─────────────────

exports.rivalJoin = onCall({ region: 'europe-west1' }, async (req) => {
  if (!req.auth) throw new HttpsError('unauthenticated', 'Login gerekli');

  const { mode, level, name } = req.data;
  if (!mode || !level || !name) throw new HttpsError('invalid-argument', 'mode, level, name gerekli');

  const uid = req.auth.uid;
  const key = `${mode}_${level}`;
  const db  = getFirestore();

  // Kuyruğu tara
  const qSnap = await db.collection('rival_queue')
    .where('mode_level', '==', key).limit(20).get();

  const now  = Date.now();
  const pool = qSnap.docs.filter(d => {
    const da = d.data();
    return d.id !== uid && !da.matchId &&
           (now - (da.createdAt ? da.createdAt.toMillis() : 0)) < QUEUE_TTL_MS;
  });

  if (pool.length > 0) {
    // Rakip bulundu — transaction ile atomik "claim" et
    const oppDoc  = pool[Math.floor(Math.random() * pool.length)];
    const matchRef = db.collection('rival_matches').doc();
    const matchId  = matchRef.id;

    try {
      await db.runTransaction(async t => {
        const oppSnap = await t.get(db.collection('rival_queue').doc(oppDoc.id));
        if (!oppSnap.exists || oppSnap.data().matchId) {
          throw new Error('OPPONENT_TAKEN'); // Rakip zaten alınmış
        }
        // Maç kabuğunu oluştur (soru/klip verisi client tarafından doldurulacak)
        t.set(matchRef, {
          status: 'waiting_data', mode, level,
          hostId: uid, hostName: name,
          guestId: oppSnap.data().uid, guestName: oppSnap.data().name,
          questions: [], cinemaClips: [], maxScore: 0,
          hostScore: 0, guestScore: 0,
          hostQ: 0, guestQ: 0, hostClip: 0, guestClip: 0,
          hostDone: false, guestDone: false,
          createdAt: Timestamp.now(),
          expiresAt: new Date(Date.now() + 30 * 60000)
        });
        // Misafirin kuyruğunu matchId ile güncelle
        t.update(db.collection('rival_queue').doc(oppDoc.id), { matchId });
        // Evsahibini kuyruktan sil
        t.delete(db.collection('rival_queue').doc(uid));
      });

      return {
        status: 'matched', role: 'host', matchId,
        guestUid: oppDoc.data().uid, guestName: oppDoc.data().name
      };
    } catch (e) {
      if (e.message === 'OPPONENT_TAKEN') {
        // Rakip başkası tarafından alındı — kuyruğa gir
      } else {
        throw new HttpsError('internal', e.message);
      }
    }
  }

  // Kuyrukta rakip yok — kuyruğa ekle
  await db.collection('rival_queue').doc(uid).set({
    uid, name, mode_level: key, mode, level, matchId: null,
    createdAt: Timestamp.now()
  });
  return { status: 'waiting' };
});

// ── Rival: Maç sonu liderlik tablosu güncellemesi ─────────────

exports.rivalFinishMatch = onCall({ region: 'europe-west1' }, async (req) => {
  if (!req.auth) throw new HttpsError('unauthenticated', 'Login gerekli');

  const { matchId, win, tie } = req.data;
  if (!matchId) throw new HttpsError('invalid-argument', 'matchId gerekli');

  const uid = req.auth.uid;
  const db  = getFirestore();

  // Kullanıcının bu maçta olduğunu doğrula
  const matchSnap = await db.collection('rival_matches').doc(matchId).get();
  if (!matchSnap.exists) throw new HttpsError('not-found', 'Maç bulunamadı');
  const mData = matchSnap.data();
  if (mData.hostId !== uid && mData.guestId !== uid) {
    throw new HttpsError('permission-denied', 'Bu maça erişim yok');
  }

  const name    = req.auth.token?.name || uid;
  const weekDoc = `weekly_${rivalWeekKey()}`;

  // Her iki dönem için transaction ile güncelle
  for (const docId of [weekDoc, 'all']) {
    const ref = db.collection('rival_leaderboard').doc(docId).collection('users').doc(uid);
    await db.runTransaction(async t => {
      const snap = await t.get(ref);
      const cur  = snap.exists ? snap.data() : { wins: 0, losses: 0, ties: 0 };
      const wins   = (cur.wins   || 0) + (win && !tie ? 1 : 0);
      const losses = (cur.losses || 0) + (!win && !tie ? 1 : 0);
      const ties_  = (cur.ties   || 0) + (tie ? 1 : 0);
      const total  = wins + losses + ties_;
      t.set(ref, {
        uid, name, avatar: (name[0] || '?').toUpperCase(),
        wins, losses, ties: ties_,
        winRate: total > 0 ? Math.round(wins / total * 100) : 0,
        updatedAt: Timestamp.now()
      });
    });
  }

  return { success: true };
});

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
