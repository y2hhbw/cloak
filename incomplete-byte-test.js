// Test to check if there's an issue with incomplete bytes

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

// Test the binary to bytes conversion with incomplete data
function testIncompleteBytes() {
  console.log('=== Testing Incomplete Bytes ===');
  
  // Simulate a case where we have incomplete binary data
  // This could happen if there's an issue with pixel data extraction
  const incompleteBinary = '0000000000000000000000000000001100110001001100100011001'; // Missing one bit
  
  console.log('Incomplete binary:', incompleteBinary);
  console.log('Binary length:', incompleteBinary.length);
  
  // Current implementation
  const bytes = new Uint8Array(Math.ceil(incompleteBinary.length / 8));
  console.log('Bytes array length:', bytes.length);
  
  for (let i = 0; i < incompleteBinary.length; i += 8) {
    const byte = incompleteBinary.substring(i, i + 8);
    const byteIndex = Math.floor(i / 8);
    console.log(`Processing byte ${byteIndex}: ${byte}`);
    bytes[byteIndex] = parseInt(byte, 2);
  }
  
  console.log('Bytes:', bytes);
  
  // Try to decode
  const decoder = new TextDecoder('utf-8');
  const decoded = decoder.decode(bytes);
  console.log('Decoded result:', decoded);
  
  // Let's also try a corrected approach
  console.log('\n=== Testing Corrected Approach ===');
  
  // Pad the binary data to make it complete bytes
  const paddedBinary = incompleteBinary.padEnd(Math.ceil(incompleteBinary.length / 8) * 8, '0');
  console.log('Padded binary:', paddedBinary);
  
  const correctedBytes = new Uint8Array(Math.ceil(paddedBinary.length / 8));
  for (let i = 0; i < paddedBinary.length; i += 8) {
    const byte = paddedBinary.substring(i, i + 8);
    const byteIndex = Math.floor(i / 8);
    console.log(`Processing byte ${byteIndex}: ${byte}`);
    correctedBytes[byteIndex] = parseInt(byte, 2);
  }
  
  console.log('Corrected bytes:', correctedBytes);
  
  // Try to decode
  const correctedDecoded = decoder.decode(correctedBytes);
  console.log('Corrected decoded result:', correctedDecoded);
}

// Test with the correct binary data but simulate a possible issue
function testCorrectBinaryWithIssue() {
  console.log('\n=== Testing Correct Binary with Simulated Issue ===');
  
  // Correct binary for "123"
  const correctBinary = '00000000000000000000000000000011001100010011001000110011';
  
  // Simulate an issue where we might get extra bits or missing bits
  // Let's say we accidentally get one extra bit
  const withExtraBit = correctBinary + '1';
  console.log('With extra bit:', withExtraBit);
  
  const bytes = new Uint8Array(Math.ceil(withExtraBit.length / 8));
  for (let i = 0; i < withExtraBit.length; i += 8) {
    const byte = withExtraBit.substring(i, i + 8);
    const byteIndex = Math.floor(i / 8);
    console.log(`Processing byte ${byteIndex}: ${byte}`);
    bytes[byteIndex] = parseInt(byte, 2);
  }
  
  console.log('Bytes with extra bit:', bytes);
  
  const decoder = new TextDecoder('utf-8');
  const decoded = decoder.decode(bytes);
  console.log('Decoded with extra bit:', decoded);
}

testIncompleteBytes();
testCorrectBinaryWithIssue();