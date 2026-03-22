const https = require('https');
const fs = require('fs');
const path = require('path');

const { execSync } = require('child_process');
const TOKEN = (execSync('echo "protocol=https\nhost=github.com" | git credential fill').toString().match(/password=(.+)/) || [])[1]?.trim();
const OWNER = 'rahmanopedia';
const REPO = 'englishrhapsody-app';
const RELEASE_ID = 299921723;
const APK_PATH = path.join('C:', 'Users', 'ruhme', 'english-rhapsody-push', 'english-rhapsody.apk');

function request(method, hostname, p, headers, body) {
  return new Promise((resolve, reject) => {
    const opts = { hostname, path: p, method, headers };
    const req = https.request(opts, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

const BASE_HEADERS = {
  'Authorization': 'token ' + TOKEN,
  'User-Agent': 'node',
  'Accept': 'application/vnd.github+json'
};

async function main() {
  // Get release assets
  const rel = await request('GET', 'api.github.com', '/repos/' + OWNER + '/' + REPO + '/releases/' + RELEASE_ID, BASE_HEADERS);
  const release = JSON.parse(rel.body);
  for (const asset of release.assets || []) {
    if (asset.name.endsWith('.apk')) {
      const del = await request('DELETE', 'api.github.com', '/repos/' + OWNER + '/' + REPO + '/releases/assets/' + asset.id, BASE_HEADERS);
      console.log('Deleted old APK, status:', del.status);
    }
  }

  // Upload new APK
  const apkData = fs.readFileSync(APK_PATH);
  console.log('APK size:', apkData.length);
  const uploadHeaders = {
    ...BASE_HEADERS,
    'Content-Type': 'application/vnd.android.package-archive',
    'Content-Length': apkData.length
  };
  const up = await request('POST', 'uploads.github.com',
    '/repos/' + OWNER + '/' + REPO + '/releases/' + RELEASE_ID + '/assets?name=english-rhapsody.apk',
    uploadHeaders, apkData);
  console.log('Upload status:', up.status);
  const result = JSON.parse(up.body);
  console.log('Download URL:', result.browser_download_url);
}

main().catch(console.error);
