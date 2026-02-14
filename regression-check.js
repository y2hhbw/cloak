const fs = require('fs');
const assert = require('assert');

const app = fs.readFileSync('app.js', 'utf8');
const stego = fs.readFileSync('steganography.js', 'utf8');
const i18n = fs.readFileSync('i18n.js', 'utf8');

// 1) app.js should consistently use I18N object
assert(!app.includes('i18n.t('), 'Found legacy i18n.t(...) calls in app.js');

// 2) hasHiddenContent should read DCT length bits with i%3, not (i+32)%3
assert(
  /if \(detectedAlgorithm === 'dct'\)[\s\S]*?const channelIndex = i % 3;/.test(stego),
  'DCT detection length-read channel index is inconsistent'
);

// 3) hasHiddenContent should read LSB length bits with i%3, not (i+32)%3
assert(
  /\} else \{[\s\S]*?const channelIndex = i % 3;[\s\S]*?binaryData \+= \(pixels\[pixelIndex \+ channelIndex\] & 0x01\)\.toString\(\);/.test(stego),
  'LSB detection length-read channel index is inconsistent'
);

// 4) encode capacity should be based on encoded bytes, not message.length before UTF-8/encryption
assert(
  !/const messageLength = message\.length;[\s\S]*?const bitsNeeded = messageLength \* 8 \+ 32;/.test(stego),
  'Encode capacity still uses message.length before UTF-8/encryption'
);

// 5) steganography.js should not include embedded node test harness in encode path
assert(!stego.includes('testSteganography'), 'Embedded test harness still present in steganography.js');

// 6) language switching should not hard-reload page (causes visible flicker)
assert(!i18n.includes('window.location.reload('), 'Language switching still triggers full page reload');

// 7) existing language selector should not register a second change listener in i18n.js
assert(
  !/existingSelector\.addEventListener\('change'/.test(i18n),
  'i18n.js still binds duplicate change listener for existing language selector'
);

console.log('Regression checks passed');
