#!/usr/bin/env node
/**
 * RHAPSODY CINEMA — Firebase Storage Yükleyici
 * =============================================
 * Kesilen klibi Firebase Storage'a yükler ve
 * video-data.js'deki URL'yi otomatik günceller.
 *
 * Kullanım:
 *   node scripts/upload-clip.js <klip_dosyası.mp4> [video_data_id]
 *
 * Örnek:
 *   node scripts/upload-clip.js scripts/clips/the_matrix_22_46.mp4 100
 *
 * Gereksinim:
 *   npm install firebase-admin
 *   Firebase servis hesabı JSON dosyası (serviceAccountKey.json)
 */

const { execSync } = require('child_process');
const fs   = require('fs');
const path = require('path');

const [,, clipFile, idArg] = process.argv;

if (!clipFile || !fs.existsSync(clipFile)) {
  console.error(`Kullanım: node scripts/upload-clip.js <klip.mp4> [id]`);
  process.exit(1);
}

// Firebase Admin SDK kontrolü
let admin;
try {
  admin = require('firebase-admin');
} catch {
  console.log('firebase-admin yükleniyor...');
  execSync('npm install firebase-admin', { stdio: 'inherit' });
  admin = require('firebase-admin');
}

// Servis hesabı anahtarı
const keyPath = path.join(__dirname, '..', 'serviceAccountKey.json');
if (!fs.existsSync(keyPath)) {
  console.error(`
❌ serviceAccountKey.json bulunamadı!

Firebase Console → Proje Ayarları → Hizmet Hesapları → "Yeni Özel Anahtar Oluştur"
İndirilen dosyayı şuraya koy: ${keyPath}
`);
  process.exit(1);
}

const serviceAccount = require(keyPath);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: `${serviceAccount.project_id}.appspot.com`
  });
}

const bucket = admin.storage().bucket();
const fileName = path.basename(clipFile);
const destination = `cinema-clips/${fileName}`;

console.log(`\n☁️  Firebase Storage'a yükleniyor: ${destination}`);

(async () => {
  try {
    await bucket.upload(clipFile, {
      destination,
      metadata: {
        contentType: 'video/mp4',
        cacheControl: 'public, max-age=31536000'
      }
    });

    // Public URL oluştur
    const file = bucket.file(destination);
    await file.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;

    console.log(`✅ Yüklendi: ${publicUrl}`);

    // video-data.js'deki URL'yi güncelle
    if (idArg) {
      const videoDataPath = path.join(__dirname, '..', 'js', 'video-data.js');
      let content = fs.readFileSync(videoDataPath, 'utf8');

      // id: XXX bloğunu bul ve url'yi değiştir
      const idPattern = new RegExp(`(id:\\s*${idArg}[^}]*?url:\\s*)"[^"]*"`, 's');
      if (idPattern.test(content)) {
        content = content.replace(idPattern, `$1"${publicUrl}"`);
        fs.writeFileSync(videoDataPath, content, 'utf8');
        console.log(`✅ video-data.js'de ID ${idArg} URL'si güncellendi`);
      } else {
        console.log(`⚠️  ID ${idArg} bulunamadı, URL'yi manuel güncelle:`);
        console.log(`   url: "${publicUrl}"`);
      }
    }

    console.log(`\n📋 Eklenecek URL:\n   "${publicUrl}"\n`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Yükleme hatası:', err.message);
    process.exit(1);
  }
})();
