/**
 * 隐写术工具类
 * 用于在图片中隐藏文字信息和从图片中提取隐藏的文字
 * 支持密码保护功能
 * 支持多种隐写算法：LSB、DCT、Patchwork
 */
class Steganography {
    static HEADER_OFFSET_BYTES = 32;
    static MAX_MESSAGE_BYTES = 10000;

    static getMaxEmbeddableBits(pixelArrayLength, algorithm = 'lsb') {
        const dataBytes = pixelArrayLength - this.HEADER_OFFSET_BYTES;
        if (dataBytes <= 0) return 0;

        const usablePixels = Math.floor(dataBytes / 4);
        if (algorithm === 'patchwork') {
            return usablePixels * 2;
        }
        return usablePixels * 3;
    }

    /**
     * 使用密码加密文本
     * @param {string} text - 要加密的文本
     * @param {string} password - 加密密码
     * @returns {string} - 返回加密后的文本
     */
    static encryptText(text, password) {
        if (!password || password.trim() === '') {
            return text;
        }

        const encoder = new TextEncoder();
        const textBytes = encoder.encode(`CLOAK:${text}`);
        const passBytes = encoder.encode(password);

        const resultBytes = new Uint8Array(textBytes.length);
        for (let i = 0; i < textBytes.length; i++) {
            resultBytes[i] = textBytes[i] ^ passBytes[i % passBytes.length];
        }

        let binaryString = '';
        for (let i = 0; i < resultBytes.length; i++) {
            binaryString += String.fromCharCode(resultBytes[i]);
        }

        return 'ENCRYPTED2:' + btoa(binaryString);
    }

    /**
     * 使用密码解密文本
     * @param {string} encryptedText - 加密的文本
     * @param {string} password - 解密密码
     * @returns {string} - 返回解密后的文本
     */
    static decryptText(encryptedText, password) {
        if (!encryptedText.startsWith('ENCRYPTED2:') && !encryptedText.startsWith('ENCRYPTED:')) {
            return encryptedText;
        }

        if (!password || password.trim() === '') {
            throw new Error('需要密码才能解密内容');
        }

        try {
            const encodedText = encryptedText.startsWith('ENCRYPTED2:')
                ? encryptedText.substring(11)
                : encryptedText.substring(10);
            const base64Decoded = atob(encodedText);

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
        } catch (error) {
            throw new Error('解密失败：密码可能不正确');
        }
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
        return new Promise((resolve, reject) => {
            try {
                const { canvas, ctx, imageData, pixels } = this._getPixelData(image);

                let preparedMessage = message;
                if (password && password.trim() !== '') {
                    preparedMessage = this.encryptText(message, password);
                }

                const encoder = new TextEncoder();
                const messageBytes = encoder.encode(preparedMessage);

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
                        }

                        for (let i = 0; i < messageBinary.length; i++) {
                            const pixelIndex = Math.floor((i + 32) / 3) * 4 + 32;
                            const channelIndex = (i + 32) % 3;
                            pixels[pixelIndex + channelIndex] &= 0xFD;
                            pixels[pixelIndex + channelIndex] |= (parseInt(messageBinary[i], 10) << 1);
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
                        }
                        break;

                    case 'lsb':
                    default:
                        for (let i = 0; i < 32; i++) {
                            const pixelIndex = Math.floor(i / 3) * 4 + 32;
                            const channelIndex = i % 3;
                            pixels[pixelIndex + channelIndex] &= 0xFE;
                            pixels[pixelIndex + channelIndex] |= parseInt(lengthBinary[i], 10);
                        }

                        for (let i = 0; i < messageBinary.length; i++) {
                            const pixelIndex = Math.floor((i + 32) / 3) * 4 + 32;
                            const channelIndex = (i + 32) % 3;
                            pixels[pixelIndex + channelIndex] &= 0xFE;
                            pixels[pixelIndex + channelIndex] |= parseInt(messageBinary[i], 10);
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
        return new Promise((resolve) => {
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
                    }
                } else if (detectedAlgorithm === 'patchwork') {
                    for (let i = 0; i < 32; i += 2) {
                        const pixelIndex = Math.floor(i / 2) * 4 + 32;
                        const channelIndex = (i / 2) % 2;
                        binaryData += (pixels[pixelIndex + channelIndex] & 0x01).toString();
                        if (i + 1 < 32) {
                            binaryData += ((pixels[pixelIndex + channelIndex] >> 1) & 0x01).toString();
                        }
                    }
                } else {
                    for (let i = 0; i < 32; i++) {
                        const pixelIndex = Math.floor(i / 3) * 4 + 32;
                        const channelIndex = i % 3;
                        binaryData += (pixels[pixelIndex + channelIndex] & 0x01).toString();
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
        return new Promise((resolve, reject) => {
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
                            }
                        }
                        break;

                    case 'lsb':
                    default:
                        for (let i = 0; i < 32; i++) {
                            const pixelIndex = Math.floor(i / 3) * 4 + 32;
                            const channelIndex = i % 3;
                            binaryData += (pixels[pixelIndex + channelIndex] & 0x01).toString();
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

                if (message.startsWith('ENCRYPTED2:') || message.startsWith('ENCRYPTED:')) {
                    if (!password || password.trim() === '') {
                        resolve('PASSWORD_REQUIRED:' + message);
                        return;
                    }
                    message = this.decryptText(message, password);
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
