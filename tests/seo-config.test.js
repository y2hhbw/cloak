const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const robotsTxt = fs.readFileSync('robots.txt', 'utf8');
const htaccess = fs.readFileSync('.htaccess', 'utf8');
const i18nJs = fs.readFileSync('i18n.js', 'utf8');
const workerJs = fs.readFileSync('workers-site/index.js', 'utf8');

test('index.html keeps a single canonical on apex domain', () => {
  const canonicalMatches = indexHtml.match(/<link\s+rel="canonical"\s+href="([^"]+)"\s*>/gi) || [];
  assert.equal(canonicalMatches.length, 1);
  assert.match(canonicalMatches[0], /https:\/\/cloak\.y2hhbw\.cyou\//);
});

test('index.html removes duplicate meta author/theme-color tags', () => {
  const authorMatches = indexHtml.match(/<meta\s+name="author"\s+content=/gi) || [];
  const themeColorMatches = indexHtml.match(/<meta\s+name="theme-color"\s+content=/gi) || [];

  assert.equal(authorMatches.length, 1);
  assert.equal(themeColorMatches.length, 1);
});

test('critical scripts are deferred to reduce render blocking', () => {
  assert.match(indexHtml, /<script\s+src="https:\/\/cdn\.jsdelivr\.net\/npm\/qrcode@1\.5\.1\/build\/qrcode\.min\.js"\s+defer><\/script>/);
  assert.match(indexHtml, /<script\s+src="bip39-wordlist\.js"\s+defer><\/script>/);
  assert.match(indexHtml, /<script\s+src="steganography\.js"\s+defer><\/script>/);
  assert.match(indexHtml, /<script\s+src="i18n\.js"\s+defer><\/script>/);
  assert.match(indexHtml, /<script\s+src="app\.js"\s+defer><\/script>/);
});

test('unused Google Fonts dns-prefetch is removed', () => {
  assert.doesNotMatch(indexHtml, /fonts\.googleapis\.com/);
});

test('robots.txt does not block manifest.json', () => {
  assert.doesNotMatch(robotsTxt, /Disallow:\s*\/manifest\.json/i);
});

test('.htaccess normalizes www to apex', () => {
  assert.match(htaccess, /RewriteCond %\{HTTP_HOST\} \^www\\\./);
  assert.match(htaccess, /RewriteRule \^\(\.\*\)\$ https:\/\/cloak\.y2hhbw\.cyou\/\$1 \[R=301,L\]/);
});

test('i18n updates html lang and description meta dynamically', () => {
  assert.match(i18nJs, /document\.documentElement\.lang\s*=\s*this\.getHtmlLang\(\)/);
  assert.match(i18nJs, /meta\[name="description"\]/);
  assert.match(i18nJs, /seo_description/);
});

test('worker headers use Permissions-Policy and avoid deprecated Feature-Policy', () => {
  assert.match(workerJs, /Permissions-Policy/);
  assert.doesNotMatch(workerJs, /Feature-Policy/);
});
