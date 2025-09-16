// Simple Node.js test for Steganography class

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

// Import the Steganography class
const Steganography = require('./steganography.js');

console.log('=== Testing Steganography Class ===');

// Create a mock image
const mockImage = {
  width: 100,
  height: 100
};

// Test message
const message = '123';
console.log('Original message:', message);

// Test encoding and decoding
async function test() {
  try {
    // Test encoding
    console.log('\n=== Testing Encoding ===');
    const encodedDataURL = await Steganography.encode(mockImage, message, '', 'lsb');
    console.log('Encoding successful');
    console.log('Encoded data URL length:', encodedDataURL.length);
    
    // Create a mock encoded image
    const mockEncodedImage = {
      width: 100,
      height: 100
    };
    
    // Test decoding
    console.log('\n=== Testing Decoding ===');
    const decodedMessage = await Steganography.decode(mockEncodedImage, '', 'lsb');
    console.log('Decoded message:', decodedMessage);
    console.log('Match:', message === decodedMessage);
    
    if (message === decodedMessage) {
      console.log('Test PASSED!');
    } else {
      console.log('Test FAILED!');
    }
  } catch (error) {
    console.error('Error during testing:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

test();