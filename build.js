#!/usr/bin/env node
/**
 * English Rhapsody — Build Script (esbuild)
 */
const fs      = require('fs');
const path    = require('path');
const esbuild = require('esbuild');

const SRC  = __dirname;
const DIST = path.join(__dirname, 'dist');

// These dirs/files are NEVER copied to dist
const EXCLUDE_DIRS = new Set(['node_modules', '.git', 'dist', 'functions',
  'scripts', 'temp_data', 'temp_video_render', '.firebase']);
// Dev-only root JS files that should NOT be deployed
const EXCLUDE_ROOT_JS = new Set(['build.js', 'analyze2.js', 'audit.js', 'patch.js',
  'scan.js', 'super_clean.js', 'update_db.js', 'expand_vocabulary.js',
  'generate_diverse_data.js', 'generate_high_quality_conversations.js']);

const EXCLUDE_FILES = new Set(['package.json', 'package-lock.json',
  'lh-report.json', 'lh-report2.json', 'lh-report3.json', '.firebaserc', 'firestore.rules',
  'remote_config.json', 'ntuser.dat', 'ntuser.ini', 'akia.ini',
  'AGENTS.md', 'words-list.txt', 'phrases-list.txt', '.gitignore',
  'lh-report3.json']);
const EXCLUDE_EXTS = new Set(['.blf', '.log1', '.log2', '.regtrans-ms']);

// Skip JS minification for huge pure-data files — gzip handles compression
const SKIP_MINIFY_JS = new Set([
  'data.js', 'stories-data.js', 'bridge-data.js', 'quantum.js',
  'phrasal_verbs_ext.js', 'phrasal_verbs_ext2.js',
]);

function mkdirp(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Copy a single directory, only files we want
function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  mkdirp(destDir);
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (EXCLUDE_DIRS.has(entry.name) || EXCLUDE_FILES.has(entry.name)) continue;
    if (EXCLUDE_EXTS.has(path.extname(entry.name).toLowerCase())) continue;
    const s = path.join(srcDir, entry.name);
    const d = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else {
      mkdirp(path.dirname(d));
      fs.copyFileSync(s, d);
    }
  }
}

async function minifyJS(srcFile, destFile) {
  const name = path.basename(srcFile);
  if (SKIP_MINIFY_JS.has(name)) {
    mkdirp(path.dirname(destFile));
    fs.copyFileSync(srcFile, destFile);
    const kb = (fs.statSync(srcFile).size / 1024).toFixed(0);
    console.log(`  ⤷ ${name.padEnd(38)} ${kb}KB (skipped — data file)`);
    return;
  }
  try {
    const result = await esbuild.transform(fs.readFileSync(srcFile, 'utf8'), {
      minify: true,
      minifyIdentifiers: false, // keep names for window.* dynamic access
      target: 'es2018',
    });
    mkdirp(path.dirname(destFile));
    fs.writeFileSync(destFile, result.code, 'utf8');
    const before = (fs.statSync(srcFile).size / 1024).toFixed(1);
    const after  = (Buffer.byteLength(result.code) / 1024).toFixed(1);
    const pct    = Math.round((1 - after / before) * 100);
    console.log(`  ✓ ${name.padEnd(38)} ${before}KB → ${after}KB (-${pct}%)`);
  } catch (e) {
    console.warn(`  ⚠ ${name} minify failed — copying as-is`);
    mkdirp(path.dirname(destFile));
    fs.copyFileSync(srcFile, destFile);
  }
}

async function minifyCSS(srcFile, destFile) {
  try {
    const result = await esbuild.transform(fs.readFileSync(srcFile, 'utf8'), {
      loader: 'css',
      minify: true,
    });
    mkdirp(path.dirname(destFile));
    fs.writeFileSync(destFile, result.code, 'utf8');
    const before = (fs.statSync(srcFile).size / 1024).toFixed(1);
    const after  = (Buffer.byteLength(result.code) / 1024).toFixed(1);
    const pct    = Math.round((1 - after / before) * 100);
    console.log(`  ✓ ${path.basename(srcFile).padEnd(38)} ${before}KB → ${after}KB (-${pct}%)`);
  } catch (e) {
    console.warn(`  ⚠ ${path.basename(srcFile)} CSS minify failed — copying as-is`);
    mkdirp(path.dirname(destFile));
    fs.copyFileSync(srcFile, destFile);
  }
}

function getDirSize(dir) {
  if (!fs.existsSync(dir)) return 0;
  return fs.readdirSync(dir).reduce((sum, f) => {
    try { return sum + fs.statSync(path.join(dir, f)).size; } catch { return sum; }
  }, 0);
}

async function build() {
  const t0 = Date.now();
  console.log('🔨 Building English Rhapsody (esbuild)...\n');

  if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
  mkdirp(DIST);

  // Copy root-level files (index.html, manifest.json, sw.js, icons, etc.)
  console.log('📁 Copying assets...');
  for (const entry of fs.readdirSync(SRC, { withFileTypes: true })) {
    if (EXCLUDE_DIRS.has(entry.name) || EXCLUDE_FILES.has(entry.name)) continue;
    if (EXCLUDE_EXTS.has(path.extname(entry.name).toLowerCase())) continue;
    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      // Skip dev-only root JS files; keep service workers and other root files
      if (ext === '.js' && EXCLUDE_ROOT_JS.has(entry.name)) continue;
      // Skip CSS at root level — none expected, all are in css/
      if (ext === '.css') continue;
      fs.copyFileSync(path.join(SRC, entry.name), path.join(DIST, entry.name));
      console.log(`  → ${entry.name}`);
    }
  }

  // Copy non-JS/CSS subdirectories (icons, images, audio, etc.)
  const subDirs = fs.readdirSync(SRC, { withFileTypes: true })
    .filter(e => e.isDirectory() && !EXCLUDE_DIRS.has(e.name) && e.name !== 'js' && e.name !== 'css');
  for (const d of subDirs) {
    console.log(`  → ${d.name}/`);
    copyDir(path.join(SRC, d.name), path.join(DIST, d.name));
  }

  // Minify JS
  console.log('\n📦 Minifying JavaScript...');
  const jsFiles = fs.readdirSync(path.join(SRC, 'js')).filter(f => f.endsWith('.js'));
  for (const f of jsFiles) {
    await minifyJS(path.join(SRC, 'js', f), path.join(DIST, 'js', f));
  }

  // Minify CSS
  console.log('\n🎨 Minifying CSS...');
  const cssFiles = fs.readdirSync(path.join(SRC, 'css')).filter(f => f.endsWith('.css'));
  for (const f of cssFiles) {
    await minifyCSS(path.join(SRC, 'css', f), path.join(DIST, 'css', f));
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  const srcSize  = getDirSize(path.join(SRC,  'js')) + getDirSize(path.join(SRC,  'css'));
  const distSize = getDirSize(path.join(DIST, 'js')) + getDirSize(path.join(DIST, 'css'));
  console.log(`\n📊 Build tamamlandı! (${elapsed}s)`);
  console.log(`   Kaynak JS+CSS : ${(srcSize  / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Dist  JS+CSS  : ${(distSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Tasarruf      : ${((srcSize - distSize) / 1024 / 1024).toFixed(2)} MB (-${Math.round((1 - distSize / srcSize) * 100)}%)`);
}

build().catch(e => { console.error(e); process.exit(1); });
