/* global importScripts, createImageBitmap, fetch, self */
importScripts('steganography.js');

async function loadImageFromPayload(payload = {}) {
  if (payload.dataUrl) {
    const response = await fetch(payload.dataUrl);
    const blob = await response.blob();
    return createImageBitmap(blob);
  }

  if (payload.fileBytes) {
    const bytes = payload.fileBytes instanceof Uint8Array ? payload.fileBytes : new Uint8Array(payload.fileBytes);
    const blob = new Blob([bytes], { type: payload.fileType || 'image/png' });
    return createImageBitmap(blob);
  }

  throw new Error('No image payload provided for stego worker task');
}

self.addEventListener('message', async (event) => {
  const { id, action, payload } = event.data || {};

  try {
    let result = null;
    const image = await loadImageFromPayload(payload || {});

    if (action === 'encode') {
      result = await Steganography.encode(
        image,
        payload.message,
        payload.password || '',
        payload.algorithm || 'lsb',
        payload.outputOptions || {}
      );
    } else if (action === 'decode') {
      result = await Steganography.decode(
        image,
        payload.password || '',
        payload.algorithm || 'auto'
      );
    } else if (action === 'hasHiddenContent') {
      result = await Steganography.hasHiddenContent(image);
    } else {
      throw new Error(`Unsupported worker action: ${action}`);
    }

    self.postMessage({ id, ok: true, result });
  } catch (error) {
    self.postMessage({ id, ok: false, error: error && error.message ? error.message : String(error) });
  }
});
