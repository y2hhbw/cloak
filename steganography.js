/**
 * 隐写术工具类
 * 用于在图片中隐藏文字信息和从图片中提取隐藏的文字
 * 支持密码保护功能
 * 支持多种隐写算法：LSB、DCT、Patchwork
 */
class Steganography {
    static HEADER_OFFSET_BYTES = 32;
    static MAX_MESSAGE_BYTES = 10000;
    static PROCESS_CHUNK_SIZE = 16384;
    static PBKDF2_ITERATIONS = 210000;
    static AES_KEY_LENGTH = 256;
    static SALT_BYTES = 16;
    static IV_BYTES = 12;

    static getMaxEmbeddableBits(pixelArrayLength, algorithm = 'lsb') {
        const dataBytes = pixelArrayLength - this.HEADER_OFFSET_BYTES;
        if (dataBytes <= 0) return 0;

        const usablePixels = Math.floor(dataBytes / 4);
        if (algorithm === 'patchwork') {
            return usablePixels * 2;
        }
        return usablePixels * 3;
    }

    static getMaxEmbeddableBytes(pixelArrayLength, algorithm = 'lsb') {
        const maxBits = this.getMaxEmbeddableBits(pixelArrayLength, algorithm);
        const payloadBits = Math.max(0, maxBits - 32);
        return Math.floor(payloadBits / 8);
    }

    static estimatePixelArrayLength(width, height) {
        if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
            return 0;
        }
        return Math.floor(width) * Math.floor(height) * 4;
    }

    static estimateMaxMessageBytes(width, height, algorithm = 'lsb') {
        const pixelArrayLength = this.estimatePixelArrayLength(width, height);
        return this.getMaxEmbeddableBytes(pixelArrayLength, algorithm);
    }

    static _getCryptoProvider() {
        if (typeof globalThis !== 'undefined' && globalThis.crypto && globalThis.crypto.subtle) {
            return globalThis.crypto;
        }

        if (typeof require !== 'undefined') {
            try {
                const { webcrypto } = require('node:crypto');
                if (webcrypto && webcrypto.subtle) return webcrypto;
            } catch (error) {
                // noop
            }
        }

        throw new Error('当前环境不支持 Web Crypto API');
    }

    static _toBase64(bytes) {
        if (typeof Buffer !== 'undefined') {
            return Buffer.from(bytes).toString('base64');
        }
        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    static _fromBase64(base64) {
        if (typeof Buffer !== 'undefined') {
            return new Uint8Array(Buffer.from(base64, 'base64'));
        }
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    }

    static _base64Length(byteLength) {
        if (!Number.isFinite(byteLength) || byteLength <= 0) return 0;
        return Math.ceil(byteLength / 3) * 4;
    }

    static async _deriveAesGcmKey(password, saltBytes) {
        const cryptoProvider = this._getCryptoProvider();
        const encoder = new TextEncoder();
        const passwordBytes = encoder.encode(password);
        const keyMaterial = await cryptoProvider.subtle.importKey(
            'raw',
            passwordBytes,
            'PBKDF2',
            false,
            ['deriveKey']
        );

        return cryptoProvider.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: saltBytes,
                iterations: this.PBKDF2_ITERATIONS,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: this.AES_KEY_LENGTH },
            false,
            ['encrypt', 'decrypt']
        );
    }

    static async _yieldToMainThread(iteration) {
        if (iteration > 0 && iteration % this.PROCESS_CHUNK_SIZE === 0) {
            await new Promise((resolve) => setTimeout(resolve, 0));
        }
    }

    /**
     * 使用密码加密文本
     * @param {string} text - 要加密的文本
     * @param {string} password - 加密密码
     * @returns {string} - 返回加密后的文本
     */
    static async encryptText(text, password) {
        if (!password || password.trim() === '') {
            return text;
        }

        const cryptoProvider = this._getCryptoProvider();
        const encoder = new TextEncoder();
        const salt = cryptoProvider.getRandomValues(new Uint8Array(this.SALT_BYTES));
        const iv = cryptoProvider.getRandomValues(new Uint8Array(this.IV_BYTES));
        const key = await this._deriveAesGcmKey(password, salt);
        const plainBytes = encoder.encode(`CLOAK3:${text}`);
        const encrypted = await cryptoProvider.subtle.encrypt({ name: 'AES-GCM', iv }, key, plainBytes);
        const encryptedBytes = new Uint8Array(encrypted);

        const payload = {
            v: 3,
            s: this._toBase64(salt),
            i: this._toBase64(iv),
            c: this._toBase64(encryptedBytes)
        };

        return `ENCRYPTED3:${this._toBase64(encoder.encode(JSON.stringify(payload)))}`;
    }

    /**
     * 使用密码解密文本
     * @param {string} encryptedText - 加密的文本
     * @param {string} password - 解密密码
     * @returns {string} - 返回解密后的文本
     */
    static _decryptLegacyText(encryptedText, password) {
        const encodedText = encryptedText.startsWith('ENCRYPTED2:')
            ? encryptedText.substring(11)
            : encryptedText.substring(10);
        const base64Decoded = (typeof atob === 'function')
            ? atob(encodedText)
            : Buffer.from(encodedText, 'base64').toString('binary');

        const encBytes = new Uint8Array(base64Decoded.length);
        for (let i = 0; i < base64Decoded.length; i++) {
            encBytes[i] = base64Decoded.charCodeAt(i);
        }

        const encoder = new TextEncoder();
        const passBytes = encoder.encode(password);
        const resultBytes = new Uint8Array(encBytes.length);
        for (let i = 0; i < encBytes.length; i++) {
            resultBytes[i] = encBytes[i] ^ passBytes[i % passBytes.length];
        }

        const decoder = new TextDecoder('utf-8');
        const decodedText = decoder.decode(resultBytes);
        if (encryptedText.startsWith('ENCRYPTED2:')) {
            if (!decodedText.startsWith('CLOAK:')) {
                throw new Error('解密失败：密码可能不正确');
            }
            return decodedText.substring(6);
        }

        return decodedText;
    }

    static async decryptText(encryptedText, password) {
        if (
            !encryptedText.startsWith('ENCRYPTED3:')
            && !encryptedText.startsWith('ENCRYPTED2:')
            && !encryptedText.startsWith('ENCRYPTED:')
        ) {
            return encryptedText;
        }

        if (!password || password.trim() === '') {
            throw new Error('需要密码才能解密内容');
        }

        try {
            if (encryptedText.startsWith('ENCRYPTED3:')) {
                const encodedPayload = encryptedText.substring(11);
                const decoder = new TextDecoder('utf-8');
                const payloadString = decoder.decode(this._fromBase64(encodedPayload));
                const payload = JSON.parse(payloadString);
                const salt = this._fromBase64(payload.s);
                const iv = this._fromBase64(payload.i);
                const cipherBytes = this._fromBase64(payload.c);

                const cryptoProvider = this._getCryptoProvider();
                const key = await this._deriveAesGcmKey(password, salt);
                const decrypted = await cryptoProvider.subtle.decrypt(
                    { name: 'AES-GCM', iv },
                    key,
                    cipherBytes
                );
                const decryptedText = decoder.decode(new Uint8Array(decrypted));
                if (!decryptedText.startsWith('CLOAK3:')) {
                    throw new Error('解密失败：密码可能不正确');
                }
                return decryptedText.substring(7);
            }

            return this._decryptLegacyText(encryptedText, password);
        } catch (error) {
            throw new Error('解密失败：密码可能不正确');
        }
    }

    static async prepareMessage(message, password = '') {
        let preparedMessage = message;
        if (password && password.trim() !== '') {
            preparedMessage = await this.encryptText(message, password);
        }

        const encoder = new TextEncoder();
        const messageBytes = encoder.encode(preparedMessage);
        return { preparedMessage, messageBytes };
    }

    static async estimateEncodedMessageBytes(message, password = '') {
        const { messageBytes } = await this.prepareMessage(message, password);
        return messageBytes.length;
    }

    static estimateEncryptedPayloadBytesFast(message) {
        const encoder = new TextEncoder();
        const plainBytes = encoder.encode(`CLOAK3:${message || ''}`);
        const cipherBytesLength = plainBytes.length + 16; // AES-GCM auth tag

        const saltBase64Len = this._base64Length(this.SALT_BYTES);
        const ivBase64Len = this._base64Length(this.IV_BYTES);
        const cipherBase64Len = this._base64Length(cipherBytesLength);

        const payloadJsonLength =
            `{"v":3,"s":"${'A'.repeat(saltBase64Len)}","i":"${'B'.repeat(ivBase64Len)}","c":"${'C'.repeat(cipherBase64Len)}"}`.length;
        const wrappedBase64Len = this._base64Length(payloadJsonLength);

        return 'ENCRYPTED3:'.length + wrappedBase64Len;
    }

    static estimateEncodedMessageBytesFast(message, password = '') {
        const encoder = new TextEncoder();
        if (!password || password.trim() === '') {
            return encoder.encode(message || '').length;
        }
        return this.estimateEncryptedPayloadBytesFast(message);
    }

    static _getPixelData(image) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return { canvas, ctx, imageData, pixels: imageData.data };
    }

    /**
     * 在图片中隐藏文字
     * @param {HTMLImageElement} image - 原始图片元素
     * @param {string} message - 要隐藏的文字
     * @param {string} password - 可选的加密密码
     * @param {string} algorithm - 使用的隐写算法 (lsb, dct, patchwork)
     * @param {{mimeType?: string, quality?: number}} outputOptions - 输出格式设置
     * @returns {Promise<string>} - 返回包含隐藏信息的图片的 Data URL
     */
    static async encode(image, message, password = '', algorithm = 'lsb', outputOptions = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const { canvas, ctx, imageData, pixels } = this._getPixelData(image);
                const { messageBytes } = await this.prepareMessage(message, password);

                if (messageBytes.length <= 0) {
                    throw new Error('消息不能为空');
                }
                if (messageBytes.length > this.MAX_MESSAGE_BYTES) {
                    throw new Error(`消息过长，最多支持 ${this.MAX_MESSAGE_BYTES} 字节`);
                }

                const bitsNeeded = messageBytes.length * 8 + 32;
                const maxEmbeddableBits = this.getMaxEmbeddableBits(pixels.length, algorithm);
                if (bitsNeeded > maxEmbeddableBits) {
                    throw new Error('图片太小，无法容纳所有信息');
                }

                const bytesLength = messageBytes.length;
                const lengthBinary = bytesLength.toString(2).padStart(32, '0');

                let messageBinary = '';
                for (let i = 0; i < messageBytes.length; i++) {
                    messageBinary += messageBytes[i].toString(2).padStart(8, '0');
                }

                const algorithmCode = algorithm === 'dct' ? 1 : (algorithm === 'patchwork' ? 2 : 0);
                pixels[3] = (pixels[3] & 0xFC) | (algorithmCode & 0x03);

                switch (algorithm) {
                    case 'dct':
                        for (let i = 0; i < 32; i++) {
                            const pixelIndex = Math.floor(i / 3) * 4 + 32;
                            const channelIndex = i % 3;
                            pixels[pixelIndex + channelIndex] &= 0xFD;
                            pixels[pixelIndex + channelIndex] |= (parseInt(lengthBinary[i], 10) << 1);
                            await this._yieldToMainThread(i);
                        }

                        for (let i = 0; i < messageBinary.length; i++) {
                            const pixelIndex = Math.floor((i + 32) / 3) * 4 + 32;
                            const channelIndex = (i + 32) % 3;
                            pixels[pixelIndex + channelIndex] &= 0xFD;
                            pixels[pixelIndex + channelIndex] |= (parseInt(messageBinary[i], 10) << 1);
                            await this._yieldToMainThread(i);
                        }
                        break;

                    case 'patchwork':
                        for (let i = 0; i < 32; i++) {
                            const pixelIndex = Math.floor(i / 2) * 4 + 32;
                            const channelIndex = i % 2;
                            pixels[pixelIndex + channelIndex] &= 0xFC;
                            pixels[pixelIndex + channelIndex] |= parseInt(lengthBinary[i], 10);
                            if (i + 1 < 32) {
                                pixels[pixelIndex + channelIndex] |= (parseInt(lengthBinary[i + 1], 10) << 1);
                                i++;
                            }
                            await this._yieldToMainThread(i);
                        }

                        for (let i = 0; i < messageBinary.length; i++) {
                            const pixelIndex = Math.floor((i + 32) / 2) * 4 + 32;
                            const channelIndex = (i + 32) % 2;
                            pixels[pixelIndex + channelIndex] &= 0xFC;
                            pixels[pixelIndex + channelIndex] |= parseInt(messageBinary[i], 10);
                            if (i + 1 < messageBinary.length) {
                                pixels[pixelIndex + channelIndex] |= (parseInt(messageBinary[i + 1], 10) << 1);
                                i++;
                            }
                            await this._yieldToMainThread(i);
                        }
                        break;

                    case 'lsb':
                    default:
                        for (let i = 0; i < 32; i++) {
                            const pixelIndex = Math.floor(i / 3) * 4 + 32;
                            const channelIndex = i % 3;
                            pixels[pixelIndex + channelIndex] &= 0xFE;
                            pixels[pixelIndex + channelIndex] |= parseInt(lengthBinary[i], 10);
                            await this._yieldToMainThread(i);
                        }

                        for (let i = 0; i < messageBinary.length; i++) {
                            const pixelIndex = Math.floor((i + 32) / 3) * 4 + 32;
                            const channelIndex = (i + 32) % 3;
                            pixels[pixelIndex + channelIndex] &= 0xFE;
                            pixels[pixelIndex + channelIndex] |= parseInt(messageBinary[i], 10);
                            await this._yieldToMainThread(i);
                        }
                        break;
                }

                ctx.putImageData(imageData, 0, 0);
                const requestedMimeType = (outputOptions.mimeType || 'image/png').toLowerCase();
                const safeMimeType = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(requestedMimeType)
                    ? (requestedMimeType === 'image/jpg' ? 'image/jpeg' : requestedMimeType)
                    : 'image/png';
                const quality = typeof outputOptions.quality === 'number' ? outputOptions.quality : 0.92;

                if (safeMimeType === 'image/jpeg' || safeMimeType === 'image/webp') {
                    resolve(canvas.toDataURL(safeMimeType, quality));
                } else {
                    resolve(canvas.toDataURL(safeMimeType));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * 检测图片是否包含隐写内容
     * @param {HTMLImageElement} image - 要检测的图片元素
     * @returns {Promise<boolean>} - 返回是否包含隐写内容
     */
    static async hasHiddenContent(image) {
        return new Promise(async (resolve) => {
            try {
                const { pixels } = this._getPixelData(image);

                const algorithmCode = pixels[3] & 0x03;
                let detectedAlgorithm = 'lsb';
                switch (algorithmCode) {
                    case 1:
                        detectedAlgorithm = 'dct';
                        break;
                    case 2:
                        detectedAlgorithm = 'patchwork';
                        break;
                }

                let binaryData = '';

                if (detectedAlgorithm === 'dct') {
                    for (let i = 0; i < 32; i++) {
                        const pixelIndex = Math.floor(i / 3) * 4 + 32;
                        const channelIndex = i % 3;
                        binaryData += ((pixels[pixelIndex + channelIndex] & 0x02) >> 1).toString();
                        await this._yieldToMainThread(i);
                    }
                } else if (detectedAlgorithm === 'patchwork') {
                    for (let i = 0; i < 32; i += 2) {
                        const pixelIndex = Math.floor(i / 2) * 4 + 32;
                        const channelIndex = (i / 2) % 2;
                        binaryData += (pixels[pixelIndex + channelIndex] & 0x01).toString();
                        if (i + 1 < 32) {
                            binaryData += ((pixels[pixelIndex + channelIndex] >> 1) & 0x01).toString();
                        }
                        await this._yieldToMainThread(i);
                    }
                } else {
                    for (let i = 0; i < 32; i++) {
                        const pixelIndex = Math.floor(i / 3) * 4 + 32;
                        const channelIndex = i % 3;
                        binaryData += (pixels[pixelIndex + channelIndex] & 0x01).toString();
                        await this._yieldToMainThread(i);
                    }
                }

                const messageLength = parseInt(binaryData.substring(0, 32), 2);
                resolve(messageLength > 0 && messageLength <= this.MAX_MESSAGE_BYTES);
            } catch (error) {
                resolve(false);
            }
        });
    }

    /**
     * 从图片中提取隐藏的文字
     * @param {HTMLImageElement} image - 包含隐藏信息的图片元素
     * @param {string} password - 可选的解密密码
     * @param {string} algorithm - 使用的隐写算法 (lsb, dct, patchwork, auto)
     * @returns {Promise<string>} - 返回提取出的文字
     */
    static async decode(image, password = '', algorithm = 'auto') {
        return new Promise(async (resolve, reject) => {
            try {
                const { pixels } = this._getPixelData(image);

                let detectedAlgorithm = 'lsb';
                if (algorithm === 'auto') {
                    const algorithmCode = pixels[3] & 0x03;
                    detectedAlgorithm = algorithmCode === 1 ? 'dct' : (algorithmCode === 2 ? 'patchwork' : 'lsb');
                } else {
                    detectedAlgorithm = algorithm;
                }

                let binaryData = '';

                switch (detectedAlgorithm) {
                    case 'dct':
                        for (let i = 0; i < 32; i++) {
                            const pixelIndex = Math.floor(i / 3) * 4 + 32;
                            const channelIndex = i % 3;
                            binaryData += ((pixels[pixelIndex + channelIndex] & 0x02) >> 1).toString();
                            await this._yieldToMainThread(i);
                        }

                        {
                            const dctMessageLength = parseInt(binaryData.substring(0, 32), 2);
                            if (dctMessageLength <= 0 || dctMessageLength > this.MAX_MESSAGE_BYTES) {
                                throw new Error('无法解码：未找到有效的隐藏信息');
                            }

                            const dctBitsToRead = dctMessageLength * 8;
                            binaryData = '';
                            for (let i = 0; i < dctBitsToRead; i++) {
                                const pixelIndex = Math.floor((i + 32) / 3) * 4 + 32;
                                const channelIndex = (i + 32) % 3;
                                binaryData += ((pixels[pixelIndex + channelIndex] >> 1) & 0x01).toString();
                                await this._yieldToMainThread(i);
                            }
                        }
                        break;

                    case 'patchwork':
                        for (let i = 0; i < 32; i++) {
                            const pixelIndex = Math.floor(i / 2) * 4 + 32;
                            const channelIndex = i % 2;
                            binaryData += (pixels[pixelIndex + channelIndex] & 0x01).toString();
                            if (i + 1 < 32) {
                                binaryData += ((pixels[pixelIndex + channelIndex] >> 1) & 0x01).toString();
                                i++;
                            }
                            await this._yieldToMainThread(i);
                        }

                        {
                            const patchworkMessageLength = parseInt(binaryData.substring(0, 32), 2);
                            if (patchworkMessageLength <= 0 || patchworkMessageLength > this.MAX_MESSAGE_BYTES) {
                                throw new Error('无法解码：未找到有效的隐藏信息');
                            }

                            const patchworkBitsToRead = patchworkMessageLength * 8;
                            binaryData = '';
                            for (let i = 0; i < patchworkBitsToRead; i++) {
                                const pixelIndex = Math.floor((i + 32) / 2) * 4 + 32;
                                const channelIndex = (i + 32) % 2;
                                binaryData += (pixels[pixelIndex + channelIndex] & 0x01).toString();
                                if (i + 1 < patchworkBitsToRead) {
                                    binaryData += ((pixels[pixelIndex + channelIndex] >> 1) & 0x01).toString();
                                    i++;
                                }
                                await this._yieldToMainThread(i);
                            }
                        }
                        break;

                    case 'lsb':
                    default:
                        for (let i = 0; i < 32; i++) {
                            const pixelIndex = Math.floor(i / 3) * 4 + 32;
                            const channelIndex = i % 3;
                            binaryData += (pixels[pixelIndex + channelIndex] & 0x01).toString();
                            await this._yieldToMainThread(i);
                        }

                        {
                            const lsbMessageLength = parseInt(binaryData.substring(0, 32), 2);
                            if (lsbMessageLength <= 0 || lsbMessageLength > this.MAX_MESSAGE_BYTES) {
                                throw new Error('无法解码：未找到有效的隐藏信息');
                            }

                            const lsbBitsToRead = lsbMessageLength * 8;
                            binaryData = '';
                            for (let i = 0; i < lsbBitsToRead; i++) {
                                const pixelIndex = Math.floor((i + 32) / 3) * 4 + 32;
                                const channelIndex = (i + 32) % 3;
                                if (pixelIndex + channelIndex >= pixels.length) {
                                    break;
                                }
                                binaryData += (pixels[pixelIndex + channelIndex] & 0x01).toString();
                                await this._yieldToMainThread(i);
                            }
                        }
                        break;
                }

                const completeBitLength = binaryData.length - (binaryData.length % 8);
                const completeBinary = completeBitLength > 0 ? binaryData.substring(0, completeBitLength) : '';
                const bytes = new Uint8Array(Math.ceil(completeBinary.length / 8));
                for (let i = 0; i < completeBinary.length; i += 8) {
                    const byte = completeBinary.substring(i, i + 8);
                    const byteIndex = Math.floor(i / 8);
                    bytes[byteIndex] = parseInt(byte, 2);
                }

                const decoder = new TextDecoder('utf-8');
                let message = decoder.decode(bytes);

                if (message.startsWith('ENCRYPTED3:') || message.startsWith('ENCRYPTED2:') || message.startsWith('ENCRYPTED:')) {
                    if (!password || password.trim() === '') {
                        resolve('PASSWORD_REQUIRED:' + message);
                        return;
                    }
                    message = await this.decryptText(message, password);
                }

                resolve(message);
            } catch (error) {
                reject(error);
            }
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Steganography;
}
