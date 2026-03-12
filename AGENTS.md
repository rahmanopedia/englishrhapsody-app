# English Rhapsody — Project Context for AI Agents

## Project Overview
English Rhapsody is a Progressive Web App (PWA) for learning English vocabulary and grammar.
- **Live repo:** https://github.com/rahmanopedia/englishrhapsody-app
- **Firebase project:** `englishrhapsody-78866`
- **Tech stack:** Vanilla JS, Firebase (Auth + Firestore), PWA

## Directory Structure
```
englishrhapsody-fix/
├── index.html              # Main app shell
├── js/
│   ├── app.js              # Core app logic, XP system, state management
│   ├── auth.js             # Firebase Auth, cloud sync
│   ├── data.js             # Word/vocabulary database
│   ├── quantum.js          # Quantum mode: 650 sentence-building scenarios (s1–s650)
│   ├── leaderboard.js      # Daily/weekly/monthly XP leaderboard
│   ├── grammar.js          # Grammar exercises
│   ├── notifications.js    # Push notifications, daily XP tracking
│   └── ...
├── css/                    # Styles
├── assets/                 # Audio, images
├── firestore.rules         # Firestore security rules
├── firebase.json           # Firebase hosting config
└── functions/              # Cloud Functions (if any)
```

## Dev Scripts (run from project root with `node <script>`)
| Script | Purpose |
|--------|---------|
| `update_db.js` | Adds missing vocabulary words to `js/data.js` |
| `analyze2.js` | Analyzes vocabulary data |
| `patch.js` | One-off data patches |
| `scan.js` | Scans for issues |
| `generate_diverse_data.js` | Generates diverse word data |
| `audit.js` | Audits data quality |

## Firestore Structure
```
users/{uid}/data/state       — User progress, XP, level, history
users/{uid}/meta/profile     — Notifications prefs, xpToday, streak
leaderboards/{period}/users/{uid} — Leaderboard scores
  period format: daily_YYYY-MM-DD | weekly_YYYY-W## | monthly_YYYY-MM
```

## Key Design Decisions
- **XP history:** Stored as `{ 'YYYY-MM-DD': xp }` map — all dates are UTC
- **Quantum mode:** 650 sentences (s1–s150 original + s151–s650 regenerated with logical subject-verb-object pairs)
- **Leaderboard periods:** All period keys use UTC dates (daily/weekly/monthly consistent)
- **Turkish conjugations:** All verb forms follow Turkish vowel harmony rules (a/ı→mıyor, e/i→miyor, o/u→muyor, ö/ü→müyor)

## Recently Fixed
- Quantum mode sentences replaced with logical combinations (Mar 2026)
- Turkish conjugation errors fixed (pour: döküyor, plant: dikiyor, sort: sıralamaz, freeze: donduruluyor, etc.)
- Leaderboard timezone bug fixed: all period keys now UTC-consistent
- Firestore leaderboard read: requires authentication (was public)
