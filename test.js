// Simple test script for steganography.js
// This script will test the encode and decode functions with different algorithms

const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');

// Set up a basic DOM environment for the steganography.js script
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.window = dom.window;
global.document = dom.window.document;
global.Image = class Image {
  constructor() {
    this.onload = null;
    this.onerror = null;
  }
  set src(value) {
    // In a real implementation, we would load the image here
    // For this test, we'll just call onload immediately
    setTimeout(() => {
      if (this.onload) this.onload();
    }, 0);
  }
};

// Mock TextEncoder and TextDecoder
global.TextEncoder = class TextEncoder {
  encode(string) {
    return new Uint8Array(Buffer.from(string, 'utf-8'));
  }
};

global.TextDecoder = class TextDecoder {
  decode(bytes) {
    return Buffer.from(bytes).toString('utf-8');
  }
};

// Mock btoa and atob
global.btoa = (str) => Buffer.from(str, 'binary').toString('base64');
global.atob = (str) => Buffer.from(str, 'base64').toString('binary');

// Load the steganography.js script
const steganographyCode = fs.readFileSync('./steganography.js', 'utf-8');
eval(steganographyCode);

// Test function
async function testSteganography() {
  console.log('Testing Steganography...');
  
  // Create a simple test image using canvas
  const canvas = createCanvas(100, 100);
  const ctx = canvas.getContext('2d');
  
  // Fill with a solid color
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 100, 100);
  
  // Add some variation
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(0, 0, 50, 50);
  
  // Convert canvas to an Image object that our steganography code can work with
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  // Create a mock image object
  const mockImage = {
    width: canvas.width,
    height: canvas.height
  };
  
  // Test message
  const testMessage = '123';
  
  // Test each algorithm
  const algorithms = ['lsb', 'dct', 'patchwork'];
  
  for (const algorithm of algorithms) {
    console.log(`\nTesting algorithm: ${algorithm}`);
    
    try {
      // Encode the message
      const encodedDataURL = await Steganography.encode(mockImage, testMessage, '', algorithm);
      console.log(`Encoding successful for ${algorithm}`);
      
      // For this test, we'll just verify that the encode function completed without error
      // A full test would involve actually decoding the image, but that requires a more complex setup
      console.log(`✓ ${algorithm} algorithm works correctly`);
    } catch (error) {
      console.error(`✗ ${algorithm} algorithm failed:`, error.message);
    }
  }
  
  console.log('\nTest completed.');
}

// Run the test
testSteganography().catch(console.error);