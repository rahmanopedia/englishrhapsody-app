/**
 * Firebase Hosting: eski sürümleri sil, en son 2'yi bırak
 */
const https = require('https');
const fs    = require('fs');

const SITE = 'englishrhapsody-78866';

// 1) Access token al (refresh token'dan)
function getAccessToken(refreshToken) {
  return new Promise((resolve, reject) => {
    const body = new URLSearchParams({
      client_id:     '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com',
      client_secret: 'j9iVZfS8kkCEFUPaAeJV0sAi',
      grant_type:    'refresh_token',
      refresh_token: refreshToken,
    }).toString();

    const req = https.request({
      hostname: 'oauth2.googleapis.com',
      path:     '/token',
      method:   'POST',
      headers:  { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': body.length },
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const j = JSON.parse(data);
        if (j.access_token) resolve(j.access_token);
        else reject(new Error('Token alınamadı: ' + data));
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// 2) Sürümleri listele
function listReleases(token) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'firebasehosting.googleapis.com',
      path:     `/v1beta1/sites/${SITE}/releases?pageSize=25`,
      headers:  { Authorization: `Bearer ${token}` },
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  });
}

// 3) Sürümü sil (version'ı DELETE)
function deleteVersion(token, versionName) {
  return new Promise((resolve, reject) => {
    const path = `/v1beta1/${versionName}`;
    const req = https.request({
      hostname: 'firebasehosting.googleapis.com',
      path,
      method:   'DELETE',
      headers:  { Authorization: `Bearer ${token}` },
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const cfg = JSON.parse(fs.readFileSync('C:/Users/ruhme/.config/configstore/firebase-tools.json', 'utf8'));
  const refreshToken = cfg.tokens.refresh_token;

  console.log('Token alınıyor...');
  const token = await getAccessToken(refreshToken);
  console.log('Token OK');

  console.log('Sürümler listeleniyor...');
  const data = await listReleases(token);
  const releases = data.releases || [];
  console.log(`Toplam ${releases.length} sürüm bulundu`);

  if (releases.length <= 2) {
    console.log('Silinecek sürüm yok (en az 2 bırakıyoruz).');
    return;
  }

  // En son 2'yi tut, gerisini sil
  const toDelete = releases.slice(2);
  console.log(`${toDelete.length} eski sürüm silinecek...`);

  for (const rel of toDelete) {
    const versionName = rel.version && rel.version.name;
    if (!versionName) { console.log('  skip (no version name)'); continue; }
    try {
      const r = await deleteVersion(token, versionName);
      console.log(`  Silindi: ${versionName.split('/').pop()} → HTTP ${r.status}`);
    } catch(e) {
      console.log(`  Hata: ${e.message}`);
    }
  }

  console.log('\nTemizlik tamam. Şimdi deploy ediliyor...');
}

main().catch(e => { console.error(e); process.exit(1); });
