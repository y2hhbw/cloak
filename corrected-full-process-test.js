// Corrected full process test using the exact same index calculations as in Steganography class

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

// Simulate the complete encode and decode process with correct index calculations
function simulateFullProcess() {
  console.log('=== Simulating Full Encode and Decode Process ===');
  
  // Test message
  const message = '123';
  console.log('Original message:', message);
  
  // Step 1: Encode message to binary (as in the encode method)
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
  console.log('Full binary length:', fullBinary.length);
  
  // Step 4: Simulate storing in pixels (as in the encode method)
  console.log('\n=== Simulating Pixel Storage ===');
  // Create a mock pixel array
  const pixelCount = 1000; // Enough pixels for our test
  const pixelData = new Uint8Array(pixelCount * 4); // RGBA format
  
  // Initialize with some test data
  for (let i = 0; i < pixelData.length; i++) {
    pixelData[i] = Math.floor(Math.random() * 256);
  }
  
  // Store algorithm code in the first pixel's alpha channel
  const algorithmCode = 0; // 0 for LSB
  pixelData[3] = (pixelData[3] & 0xFC) | (algorithmCode & 0x03);
  
  // Store binary data in pixels starting from pixel 8 (index 32)
  const storedPixels = new Uint8Array(pixelData); // Copy pixel data
  for (let i = 0; i < fullBinary.length; i++) {
    const pixelIndex = Math.floor(i / 3) * 4 + 32; // 从第8个像素后开始 (8 * 4 = 32)
    const channelIndex = i % 3;
    
    if (pixelIndex + channelIndex < storedPixels.length) {
      // Clear the least significant bit
      storedPixels[pixelIndex + channelIndex] &= 0xFE;
      // Set the least significant bit to the message bit
      storedPixels[pixelIndex + channelIndex] |= parseInt(fullBinary[i]);
    }
  }
  
  console.log('Binary data stored in pixels');
  
  // Step 5: Simulate extracting from pixels (as in the decode method)
  console.log('\n=== Simulating Pixel Extraction ===');
  
  // Extract algorithm code from the first pixel's alpha channel
  const extractedAlgorithmCode = storedPixels[3] & 0x03;
  console.log('Extracted algorithm code:', extractedAlgorithmCode);
  
  // Extract binary data from pixels
  let extractedBinary = '';
  
  // First extract the length (32 bits)
  for (let i = 0; i < 32; i++) {
    const pixelIndex = Math.floor(i / 3) * 4 + 32; // 从第8个像素后开始 (8 * 4 = 32)
    const channelIndex = i % 3;
    
    if (pixelIndex + channelIndex < storedPixels.length) {
      const bit = (storedPixels[pixelIndex + channelIndex] & 0x01).toString();
      extractedBinary += bit;
    }
  }
  
  console.log('Extracted length binary:', extractedBinary);
  
  // Parse message length
  const extractedMessageLength = parseInt(extractedBinary.substring(0, 32), 2);
  console.log('Extracted message length:', extractedMessageLength);
  
  // Calculate bits to read
  const bitsToRead = extractedMessageLength * 8;
  console.log('Bits to read:', bitsToRead);
  
  // Clear binary data and extract message content
  extractedBinary = '';
  
  // Extract message content
  for (let i = 0; i < bitsToRead; i++) {
    const pixelIndex = Math.floor((i + 32) / 3) * 4 + 32; // 从长度信息后开始，从第8个像素后开始 (8 * 4 = 32)
    const channelIndex = (i + 32) % 3;
    
    if (pixelIndex + channelIndex < storedPixels.length) {
      const bit = (storedPixels[pixelIndex + channelIndex] & 0x01).toString();
      extractedBinary += bit;
    }
  }
  
  console.log('Extracted message binary:', extractedBinary);
  console.log('Extracted binary length:', extractedBinary.length);
  
  // Step 6: Convert binary to bytes and decode message (as in the decode method)
  console.log('\n=== Converting Binary to Message ===');
  
  // Convert binary to bytes
  const extractedBytes = new Uint8Array(Math.ceil(extractedBinary.length / 8));
  console.log('Bytes array length:', extractedBytes.length);
  
  for (let i = 0; i < extractedBinary.length; i += 8) {
    const byte = extractedBinary.substring(i, i + 8);
    const byteIndex = Math.floor(i / 8);
    console.log(`Processing byte ${byteIndex}: ${byte}`);
    extractedBytes[byteIndex] = parseInt(byte, 2);
  }
  
  console.log('Extracted bytes:', extractedBytes);
  
  // Decode bytes to string
  const decoder = new TextDecoder('utf-8');
  const extractedMessage = decoder.decode(extractedBytes);
  console.log('Extracted message:', extractedMessage);
  
  console.log('\n=== Final Result ===');
  console.log('Original message:', message);
  console.log('Extracted message:', extractedMessage);
  console.log('Match:', message === extractedMessage);
}

simulateFullProcess();
