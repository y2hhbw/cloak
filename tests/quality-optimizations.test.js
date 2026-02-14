const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Steganography = require('../steganography.js');

const stegoJs = fs.readFileSync('steganography.js', 'utf8');
const appJs = fs.readFileSync('app.js', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const serverJs = fs.readFileSync('server.js', 'utf8');
const stegoWorkerJs = fs.existsSync('stego-worker.js') ? fs.readFileSync('stego-worker.js', 'utf8') : '';
const i18nCoreJs = fs.readFileSync('i18n.js', 'utf8');

test('steganography uses AES-GCM + PBKDF2 and keeps legacy compatibility', () => {
  assert.match(stegoJs, /ENCRYPTED3:/);
  assert.match(stegoJs, /AES-GCM/);
  assert.match(stegoJs, /PBKDF2/);
  assert.match(stegoJs, /ENCRYPTED2:/);
  assert.match(stegoJs, /ENCRYPTED:/);
});

test('AES-GCM encryption/decryption round-trip works', async () => {
  const encrypted = await Steganography.encryptText('hello cloak', 'test-password-123');
  assert.match(encrypted, /^ENCRYPTED3:/);
  const decrypted = await Steganography.decryptText(encrypted, 'test-password-123');
  assert.equal(decrypted, 'hello cloak');
});

test('legacy ENCRYPTED2 payload is still decodable', async () => {
  const password = 'legacy-pass';
  const plain = 'CLOAK:legacy message';
  const plainBytes = new TextEncoder().encode(plain);
  const passBytes = new TextEncoder().encode(password);
  const resultBytes = new Uint8Array(plainBytes.length);
  for (let i = 0; i < plainBytes.length; i++) {
    resultBytes[i] = plainBytes[i] ^ passBytes[i % passBytes.length];
  }
  const legacyPayload = `ENCRYPTED2:${Buffer.from(resultBytes).toString('base64')}`;
  const decrypted = await Steganography.decryptText(legacyPayload, password);
  assert.equal(decrypted, 'legacy message');
});

test('app includes capacity estimation and round-trip verification controls', () => {
  assert.match(indexHtml, /id="encode-capacity-status"/);
  assert.match(indexHtml, /id="crypto-capacity-status"/);
  assert.match(indexHtml, /id="verify-before-download"/);
  assert.match(indexHtml, /id="crypto-verify-before-download"/);
  assert.match(appJs, /updateEncodeCapacityStatus/);
  assert.match(appJs, /updateCryptoCapacityStatus/);
  assert.match(appJs, /verifyRoundTripDecode/);
});

test('app supports secure lifecycle clearing and clipboard API', () => {
  assert.match(appJs, /beforeunload/);
  assert.match(appJs, /visibilitychange/);
  assert.match(appJs, /navigator\.clipboard\.writeText/);
});

test('index has aria-live status region for non-blocking feedback', () => {
  assert.match(indexHtml, /aria-live="polite"/);
  assert.match(indexHtml, /id="app-status"/);
});

test('local server sets stronger modern security headers', () => {
  assert.match(serverJs, /Content-Security-Policy/);
  assert.match(serverJs, /Referrer-Policy/);
  assert.match(serverJs, /Permissions-Policy/);
  assert.match(serverJs, /Cross-Origin-Opener-Policy/);
  assert.doesNotMatch(serverJs, /Access-Control-Allow-Origin': '\*'/);
});

test('steganography includes cooperative chunk-yielding hooks', () => {
  assert.match(stegoJs, /PROCESS_CHUNK_SIZE/);
  assert.match(stegoJs, /_yieldToMainThread/);
});

test('app includes image metadata cache and debounced capacity updates', () => {
  assert.match(appJs, /imageMetaCache/);
  assert.match(appJs, /MAX_IMAGE_META_CACHE/);
  assert.match(appJs, /debouncedUpdateEncodeCapacity/);
  assert.match(appJs, /debouncedUpdateCryptoCapacity/);
  assert.match(appJs, /estimateEncodedMessageBytesFast/);
});

test('qrcode library is loaded on demand instead of blocking initial render', () => {
  assert.doesNotMatch(indexHtml, /qrcode\.min\.js/);
  assert.match(appJs, /ensureQRCodeLibrary/);
  assert.match(appJs, /https:\/\/cdn\.jsdelivr\.net\/npm\/qrcode@1\.5\.1\/build\/qrcode\.min\.js/);
});

test('bip39 wordlist is loaded on demand', () => {
  assert.doesNotMatch(indexHtml, /bip39-wordlist\.js/);
  assert.match(appJs, /ensureBip39Wordlist/);
  assert.match(appJs, /bip39-wordlist\.js/);
});

test('i18n library is loaded on demand', () => {
  assert.doesNotMatch(indexHtml, /i18n\.js"\s+defer/);
  assert.match(appJs, /ensureI18nLibrary/);
  assert.match(appJs, /i18n\.js/);
});

test('i18n language packs are split into separate files and loaded dynamically', () => {
  const expectedPacks = ['en', 'zh', 'zh-tw', 'fr', 'ja', 'es', 'de', 'ru'];
  assert.ok(fs.existsSync('i18n/manifest.json'), 'Missing i18n manifest file');
  const manifest = JSON.parse(fs.readFileSync('i18n/manifest.json', 'utf8'));
  expectedPacks.forEach((lang) => {
    assert.ok(fs.existsSync(`i18n/${lang}.json`), `Missing i18n pack file for ${lang}`);
    assert.ok(typeof manifest[lang] === 'string' && manifest[lang].length > 0, `Missing manifest hash for ${lang}`);
  });
  assert.match(i18nCoreJs, /i18n\/manifest\.json/);
  assert.match(i18nCoreJs, /loadLanguagePack/);
  assert.match(i18nCoreJs, /ensureLanguagePackLoaded/);
  assert.ok(i18nCoreJs.includes('i18n/${langCode}.json?v=${encodeURIComponent(packVersion)}'));
});

test('app includes workerized steganography execution with fallback', () => {
  assert.match(appJs, /new Worker\('stego-worker\.js'\)/);
  assert.match(appJs, /runStegoWorkerTask/);
  assert.match(appJs, /stegoWorkerSupported/);
  assert.match(appJs, /runStegoWorkerTask\('encode'/);
  assert.match(appJs, /runStegoWorkerTask\('decode'/);
});

test('app schedules non-blocking warmup during idle time', () => {
  assert.match(appJs, /scheduleDeferredWarmup/);
  assert.match(appJs, /requestIdleCallback/);
});

test('steganography worker exists and loads core implementation', () => {
  assert.ok(stegoWorkerJs.length > 0, 'stego-worker.js should exist');
  assert.match(stegoWorkerJs, /importScripts\('steganography\.js'\)/);
  assert.match(stegoWorkerJs, /action === 'encode'/);
  assert.match(stegoWorkerJs, /action === 'decode'/);
});

test('steganography exposes fast non-crypto size estimation helper', () => {
  assert.match(stegoJs, /estimateEncodedMessageBytesFast/);
  assert.match(stegoJs, /estimateEncryptedPayloadBytesFast/);
});
