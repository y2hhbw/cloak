// Pixel debug test to understand how binary data is stored in pixels

// Mock TextEncoder and TextDecoder for Node.js environment
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

// Mock btoa and atob
global.btoa = (str) => Buffer.from(str, 'binary').toString('base64');
global.atob = (str) => Buffer.from(str, 'base64').toString('binary');

// Simulate pixel data array (RGBA format)
// Let's create a simple pixel array for testing
const pixelData = new Uint8Array(100 * 4); // 100 pixels, 4 channels each

// Initialize with some test data
for (let i = 0; i < pixelData.length; i++) {
  pixelData[i] = Math.floor(Math.random() * 256);
}

console.log('=== Pixel Debug Test ===');
console.log('Initial pixel data (first 20 pixels):');
for (let i = 0; i < 20; i++) {
  const pixelIndex = i * 4;
  console.log(`Pixel ${i}: R=${pixelData[pixelIndex]}, G=${pixelData[pixelIndex+1]}, B=${pixelData[pixelIndex+2]}, A=${pixelData[pixelIndex+3]}`);
}

// Test message
const message = '123';
console.log(`\nOriginal message: ${message}`);

// Step 1: Convert message to binary
const encoder = new TextEncoder();
const messageBytes = encoder.encode(message);
console.log('Message bytes:', messageBytes);

let messageBinary = '';
for (let i = 0; i < messageBytes.length; i++) {
  const binary = messageBytes[i].toString(2).padStart(8, '0');
  messageBinary += binary;
}
console.log('Message binary:', messageBinary);

// Step 2: Create length binary (32 bits)
const bytesLength = messageBytes.length;
const lengthBinary = bytesLength.toString(2).padStart(32, '0');
console.log('Length binary:', lengthBinary);

// Step 3: Combine length and message binary
const fullBinary = lengthBinary + messageBinary;
console.log('Full binary:', fullBinary);

// Step 4: Store binary data in pixels (LSB method)
console.log('\n=== Storing Binary Data in Pixels ===');
const storedPixels = new Uint8Array(pixelData); // Copy pixel data

// Store data starting from pixel 8 (index 8 * 4 = 32)
for (let i = 0; i < fullBinary.length; i++) {
  const pixelIndex = Math.floor(i / 3) * 4 + 32; // 从第8个像素后开始 (8 * 4 = 32)
  const channelIndex = i % 3;
  
  if (pixelIndex + channelIndex < storedPixels.length) {
    // Clear the least significant bit
    storedPixels[pixelIndex + channelIndex] &= 0xFE;
    // Set the least significant bit to the message bit
    storedPixels[pixelIndex + channelIndex] |= parseInt(fullBinary[i]);
    
    console.log(`Bit ${i}: Stored ${fullBinary[i]} in pixel ${Math.floor(pixelIndex/4)}, channel ${channelIndex}`);
  }
}

// Step 5: Extract binary data from pixels
console.log('\n=== Extracting Binary Data from Pixels ===');
let extractedBinary = '';
for (let i = 0; i < fullBinary.length; i++) {
  const pixelIndex = Math.floor(i / 3) * 4 + 32; // 从第8个像素后开始 (8 * 4 = 32)
  const channelIndex = i % 3;
  
  if (pixelIndex + channelIndex < storedPixels.length) {
    const bit = (storedPixels[pixelIndex + channelIndex] & 0x01).toString();
    extractedBinary += bit;
    
    console.log(`Bit ${i}: Extracted ${bit} from pixel ${Math.floor(pixelIndex/4)}, channel ${channelIndex}`);
  }
}

console.log('\nExtracted binary:', extractedBinary);
console.log('Match:', fullBinary === extractedBinary);

// Step 6: Decode the extracted binary data
console.log('\n=== Decoding Extracted Binary Data ===');
// Extract length (first 32 bits)
const extractedLengthBinary = extractedBinary.substring(0, 32);
console.log('Extracted length binary:', extractedLengthBinary);

const extractedMessageLength = parseInt(extractedLengthBinary, 2);
console.log('Extracted message length:', extractedMessageLength);

// Extract message binary
const extractedMessageBinary = extractedBinary.substring(32, 32 + extractedMessageLength * 8);
console.log('Extracted message binary:', extractedMessageBinary);

// Convert binary to bytes
const extractedBytes = new Uint8Array(extractedMessageLength);
for (let i = 0; i < extractedMessageBinary.length; i += 8) {
  const byte = extractedMessageBinary.substring(i, i + 8);
  const byteIndex = Math.floor(i / 8);
  extractedBytes[byteIndex] = parseInt(byte, 2);
}
console.log('Extracted message bytes:', extractedBytes);

// Convert bytes to string
const decoder = new TextDecoder('utf-8');
const extractedMessage = decoder.decode(extractedBytes);
console.log('Extracted message:', extractedMessage);

console.log('\n=== Final Result ===');
console.log('Original message:', message);
console.log('Extracted message:', extractedMessage);
console.log('Match:', message === extractedMessage);