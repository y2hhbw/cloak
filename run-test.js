// Run the Steganography test

// Mock browser environment
global.window = {};
global.document = {
  createElement: (tag) => {
    if (tag === 'canvas') {
      return {
        width: 100,
        height: 100,
        getContext: () => {
          return {
            drawImage: () => {},
            getImageData: () => {
              // Create mock image data with random pixels
              const data = new Uint8Array(100 * 100 * 4);
              for (let i = 0; i < data.length; i++) {
                data[i] = Math.floor(Math.random() * 256);
              }
              return {
                data: data,
                width: 100,
                height: 100
              };
            },
            putImageData: () => {}
          };
        },
        toDataURL: () => {
          // Return a mock data URL
          return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
        }
      };
    }
    return {};
  }
};

// Mock TextEncoder and TextDecoder
class TextEncoder {
  encode(string) {
    return new Uint8Array(Buffer.from(string, 'utf-8'));
  }
}

class TextDecoder {
  decode(bytes) {
    return Buffer.from(bytes).toString('utf-8');
  }
}

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock btoa and atob
global.btoa = (str) => Buffer.from(str, 'binary').toString('base64');
global.atob = (str) => Buffer.from(str, 'base64').toString('binary');

// Load the Steganography class
const fs = require('fs');
const steganographyCode = fs.readFileSync('./steganography.js', 'utf-8');
eval(steganographyCode);

// Run the test
Steganography.test().then(result => {
  console.log('Test completed with result:', result);
}).catch(error => {
  console.error('Test failed with error:', error);
});