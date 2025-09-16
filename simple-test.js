// Simple test to debug the encoding and decoding process
// This will help us understand what's happening with the binary data

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

// Test the encoding process manually
function testEncoding() {
  console.log('=== Testing Encoding Process ===');
  
  const message = '123';
  console.log('Original message:', message);
  
  // Step 1: Convert message to UTF-8 bytes
  const encoder = new TextEncoder();
  const messageBytes = encoder.encode(message);
  console.log('Message bytes:', messageBytes);
  
  // Step 2: Convert bytes to binary
  let messageBinary = '';
  for (let i = 0; i < messageBytes.length; i++) {
    const binary = messageBytes[i].toString(2).padStart(8, '0');
    messageBinary += binary;
  }
  console.log('Message binary:', messageBinary);
  
  // Step 3: Create length binary (32 bits)
  const bytesLength = messageBytes.length;
  const lengthBinary = bytesLength.toString(2).padStart(32, '0');
  console.log('Length binary:', lengthBinary);
  
  // Step 4: Combine length and message binary
  const fullBinary = lengthBinary + messageBinary;
  console.log('Full binary:', fullBinary);
  
  return fullBinary;
}

// Test the decoding process manually
function testDecoding(fullBinary) {
  console.log('\n=== Testing Decoding Process ===');
  
  // Step 1: Extract length (first 32 bits)
  const lengthBinary = fullBinary.substring(0, 32);
  console.log('Length binary:', lengthBinary);
  
  const messageLength = parseInt(lengthBinary, 2);
  console.log('Message length:', messageLength);
  
  // Step 2: Extract message binary
  const messageBinary = fullBinary.substring(32, 32 + messageLength * 8);
  console.log('Message binary:', messageBinary);
  
  // Step 3: Convert binary to bytes
  const bytes = new Uint8Array(messageLength);
  for (let i = 0; i < messageBinary.length; i += 8) {
    const byte = messageBinary.substring(i, i + 8);
    const byteIndex = Math.floor(i / 8);
    bytes[byteIndex] = parseInt(byte, 2);
  }
  console.log('Message bytes:', bytes);
  
  // Step 4: Convert bytes to string
  const decoder = new TextDecoder('utf-8');
  const decodedMessage = decoder.decode(bytes);
  console.log('Decoded message:', decodedMessage);
  
  return decodedMessage;
}

// Run the tests
const fullBinary = testEncoding();
const decodedMessage = testDecoding(fullBinary);

console.log('\n=== Final Result ===');
console.log('Original message:', '123');
console.log('Decoded message:', decodedMessage);
console.log('Match:', '123' === decodedMessage);