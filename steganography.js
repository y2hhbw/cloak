/**
 * 隐写术工具类
 * 用于在图片中隐藏文字信息和从图片中提取隐藏的文字
 * 支持密码保护功能
 * 支持多种隐写算法：LSB、DCT、Patchwork
 */
class Steganography {
    /**
     * 使用密码加密文本
     * @param {string} text - 要加密的文本
     * @param {string} password - 加密密码
     * @returns {string} - 返回加密后的文本
     */
    static encryptText(text, password) {
        if (!password || password.trim() === '') {
            return text; // 如果没有密码，直接返回原文本
        }
        
        // 将文本转换为UTF-8编码的字节数组
        const encoder = new TextEncoder();
        const textBytes = encoder.encode(text);
        
        // 将密码也转换为UTF-8编码的字节数组
        const passBytes = encoder.encode(password);
        
        // 简单的XOR加密
        const resultBytes = new Uint8Array(textBytes.length);
        for (let i = 0; i < textBytes.length; i++) {
            resultBytes[i] = textBytes[i] ^ passBytes[i % passBytes.length];
        }
        
        // 将加密后的字节数组转换为Base64字符串
        // 首先将Uint8Array转换为二进制字符串
        let binaryString = '';
        for (let i = 0; i < resultBytes.length; i++) {
            binaryString += String.fromCharCode(resultBytes[i]);
        }
        
        // 然后将二进制字符串转换为Base64
        const base64 = btoa(binaryString);
        
        // 添加标记表示这是加密的内容
        return 'ENCRYPTED:' + base64;
    }
    
    /**
     * 使用密码解密文本
     * @param {string} encryptedText - 加密的文本
     * @param {string} password - 解密密码
     * @returns {string} - 返回解密后的文本
     */
    static decryptText(encryptedText, password) {
        if (!encryptedText.startsWith('ENCRYPTED:')) {
            return encryptedText; // 如果不是加密的内容，直接返回
        }
        
        if (!password || password.trim() === '') {
            throw new Error('需要密码才能解密内容');
        }
        
        try {
            // 移除标记并解码Base64
            const encodedText = encryptedText.substring(10);
            const base64Decoded = atob(encodedText);
            
            // 将Base64解码后的字符串转换为字节数组
            const encBytes = new Uint8Array(base64Decoded.length);
            for (let i = 0; i < base64Decoded.length; i++) {
                encBytes[i] = base64Decoded.charCodeAt(i);
            }
            
            // 将密码转换为UTF-8编码的字节数组
            const encoder = new TextEncoder();
            const passBytes = encoder.encode(password);
            
            // XOR解密
            const resultBytes = new Uint8Array(encBytes.length);
            for (let i = 0; i < encBytes.length; i++) {
                resultBytes[i] = encBytes[i] ^ passBytes[i % passBytes.length];
            }
            
            // 将解密后的字节数组转换为UTF-8字符串
            const decoder = new TextDecoder('utf-8');
            return decoder.decode(resultBytes);
        } catch (error) {
            throw new Error('解密失败：密码可能不正确');
        }
    }
    
    /**
     * 在图片中隐藏文字
     * @param {HTMLImageElement} image - 原始图片元素
     * @param {string} message - 要隐藏的文字
     * @param {string} password - 可选的加密密码
     * @param {string} algorithm - 使用的隐写算法 (lsb, dct, patchwork)
     * @returns {Promise<string>} - 返回包含隐藏信息的图片的 Data URL
     */
    static async encode(image, message, password = '', algorithm = 'lsb') {
        return new Promise((resolve, reject) => {
            try {
                // 创建画布
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // 设置画布尺寸与图片相同
                canvas.width = image.width;
                canvas.height = image.height;
                
                // 在画布上绘制图片
                ctx.drawImage(image, 0, 0);
                
                // 获取图片数据
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
                
                // 检查图片是否足够大以容纳消息
                // 每个字符需要8个像素（每个像素的RGB通道可以存储1位信息）
                // 额外需要32位（4个像素）来存储消息长度
                const messageLength = message.length;
                const bitsNeeded = messageLength * 8 + 32;
                const pixelsNeeded = Math.ceil(bitsNeeded / 3);
                
                if (pixelsNeeded > pixels.length / 4) {
                    throw new Error('图片太小，无法容纳所有信息');
                }
                
                // 如果提供了密码，先加密消息
                if (password && password.trim() !== '') {
                    message = this.encryptText(message, password);
                }
                
                // 使用TextEncoder将消息转换为UTF-8编码的字节数组
                const encoder = new TextEncoder();
                const messageBytes = encoder.encode(message);
                
                // 将消息长度（字节数）转换为32位二进制
                const bytesLength = messageBytes.length;
                const lengthBinary = bytesLength.toString(2).padStart(32, '0');
                
                // 将消息转换为二进制
                let messageBinary = '';
                // 将字节数组转换为二进制字符串
                for (let i = 0; i < messageBytes.length; i++) {
                    const binary = messageBytes[i].toString(2).padStart(8, '0');
                    messageBinary += binary;
                }
                
                // 调试信息
                console.log('Original message:', message);
                console.log('Message bytes:', messageBytes);
                console.log('Message binary:', messageBinary);
                
                // 合并长度和消息的二进制
                const fullBinary = lengthBinary + messageBinary;
                
                // 添加算法标识到图片数据中
                // 在前8个像素的Alpha通道中存储算法类型
                const algorithmCode = algorithm === 'dct' ? 1 : (algorithm === 'patchwork' ? 2 : 0); // 0=lsb, 1=dct, 2=patchwork
                pixels[3] = (pixels[3] & 0xFC) | (algorithmCode & 0x03);
                
                // 根据选择的算法执行不同的隐写方法
                switch (algorithm) {
                    case 'dct':
                        // DCT算法实现（简化版）
                        // 在实际应用中，DCT算法需要更复杂的实现
                        // 这里使用修改后的LSB作为示例
                        // 存储长度信息 (32 bits)
                        for (let i = 0; i < 32; i++) {
                            const pixelIndex = Math.floor(i / 3) * 4 + 32; // 从第8个像素后开始 (8 * 4 = 32)
                            const channelIndex = i % 3;
                            
                            // 修改第二低位而不是最低位
                            pixels[pixelIndex + channelIndex] &= 0xFD; // 清除第二低位
                            pixels[pixelIndex + channelIndex] |= (parseInt(lengthBinary[i]) << 1); // 设置第二低位
                        }
                        
                        // 存储消息内容
                        for (let i = 0; i < messageBinary.length; i++) {
                            const pixelIndex = Math.floor((i + 32) / 3) * 4 + 32; // 从长度信息后开始，从第8个像素后开始 (8 * 4 = 32)
                            const channelIndex = (i + 32) % 3;
                            
                            // 修改第二低位而不是最低位
                            pixels[pixelIndex + channelIndex] &= 0xFD; // 清除第二低位
                            pixels[pixelIndex + channelIndex] |= (parseInt(messageBinary[i]) << 1); // 设置第二低位
                        }
                        break;
                        
                    case 'patchwork':
                        // Patchwork算法实现（简化版）
                        // 在实际应用中，Patchwork算法需要更复杂的实现
                        // 这里使用修改后的LSB作为示例
                        // 存储长度信息 (32 bits)
                        for (let i = 0; i < 32; i++) {
                            const pixelIndex = Math.floor(i / 2) * 4 + 32; // 从第8个像素后开始 (8 * 4 = 32)，每个像素只用2个通道
                            const channelIndex = i % 2;
                            
                            // 清除最低位和第二低位
                            pixels[pixelIndex + channelIndex] &= 0xFC;
                            // 设置最低位
                            pixels[pixelIndex + channelIndex] |= parseInt(lengthBinary[i]);
                            // 如果还有下一个位，设置第二低位
                            if (i + 1 < 32) {
                                pixels[pixelIndex + channelIndex] |= (parseInt(lengthBinary[i + 1]) << 1);
                                i++; // 处理下一个位
                            }
                        }
                        
                        // 存储消息内容
                        for (let i = 0; i < messageBinary.length; i++) {
                            const pixelIndex = Math.floor((i + 32) / 2) * 4 + 32; // 从长度信息后开始，从第8个像素后开始 (8 * 4 = 32)
                            const channelIndex = (i + 32) % 2;
                            
                            // 清除最低位和第二低位
                            pixels[pixelIndex + channelIndex] &= 0xFC;
                            // 设置最低位
                            pixels[pixelIndex + channelIndex] |= parseInt(messageBinary[i]);
                            // 如果还有下一个位，设置第二低位
                            if (i + 1 < messageBinary.length) {
                                pixels[pixelIndex + channelIndex] |= (parseInt(messageBinary[i + 1]) << 1);
                                i++; // 处理下一个位
                            }
                        }
                        break;
                        
                    case 'lsb':
                    default:
                        // 默认LSB算法
                        // 存储长度信息 (32 bits)
                        for (let i = 0; i < 32; i++) {
                            const pixelIndex = Math.floor(i / 3) * 4 + 32; // 从第8个像素后开始 (8 * 4 = 32)
                            const channelIndex = i % 3;
                            
                            // 清除最低位
                            pixels[pixelIndex + channelIndex] &= 0xFE;
                            // 设置最低位为消息位
                            pixels[pixelIndex + channelIndex] |= parseInt(lengthBinary[i]);
                            console.log(`Storing length bit ${i}: ${lengthBinary[i]} at pixel ${pixelIndex/4}, channel ${channelIndex}`);
                        }
                        
                        // 存储消息内容
                        for (let i = 0; i < messageBinary.length; i++) {
                            const pixelIndex = Math.floor((i + 32) / 3) * 4 + 32; // 从长度信息后开始，从第8个像素后开始 (8 * 4 = 32)
                            const channelIndex = (i + 32) % 3;
                            
                            // 清除最低位
                            pixels[pixelIndex + channelIndex] &= 0xFE;
                            // 设置最低位为消息位
                            pixels[pixelIndex + channelIndex] |= parseInt(messageBinary[i]);
                            console.log(`Storing message bit ${i}: ${messageBinary[i]} at pixel ${pixelIndex/4}, channel ${channelIndex}`);
                        }
                        break;
                }
                
                // 将修改后的像素数据放回画布
                ctx.putImageData(imageData, 0, 0);
                
                // 将画布转换为 Data URL
                const dataURL = canvas.toDataURL('image/png');
                resolve(dataURL);
            } catch (error) {
                reject(error);
            }
            
            // Export the class for Node.js
            if (typeof module !== 'undefined' && module.exports) {
              module.exports = Steganography;
            }
            
            // Test code
            if (typeof window === 'undefined' && typeof module !== 'undefined' && module.exports) {
              // This is Node.js environment
              console.log('Running in Node.js environment');
              
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
            
              // Test function
              async function testSteganography() {
                console.log('=== Testing Steganography Class ===');
            
                // Create a mock image
                const mockImage = {
                  width: 100,
                  height: 100
                };
            
                // Test message
                const message = '123';
                console.log('Original message:', message);
            
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
            
              // Run the test if this file is executed directly
              if (require.main === module) {
                testSteganography();
              }
            }
        });
    }
    
    /**
     * 检测图片是否包含隐写内容
     * @param {HTMLImageElement} image - 要检测的图片元素
     * @returns {Promise<boolean>} - 返回是否包含隐写内容
     */
    static async hasHiddenContent(image) {
        return new Promise((resolve, reject) => {
            try {
                // 创建画布
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // 设置画布尺寸与图片相同
                canvas.width = image.width;
                canvas.height = image.height;
                
                // 在画布上绘制图片
                ctx.drawImage(image, 0, 0);
                
                // 获取图片数据
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
                
                // 从第一个像素的Alpha通道读取算法类型
                const algorithmCode = pixels[3] & 0x03;
                let detectedAlgorithm = 'lsb'; // 默认使用LSB算法
                switch (algorithmCode) {
                    case 1:
                        detectedAlgorithm = 'dct';
                        break;
                    case 2:
                        detectedAlgorithm = 'patchwork';
                        break;
                }
                
                // 从像素中提取32位的长度信息
                let binaryData = '';
                
                // 根据算法类型选择不同的解码方法
                if (detectedAlgorithm === 'dct') {
                    // DCT算法从第二低位读取
                    for (let i = 0; i < 32; i++) {
                        const pixelIndex = Math.floor((i + 32) / 3) * 4 + 32; // 从第8个像素后开始 (8 * 4 = 32)
                        const channelIndex = (i + 32) % 3;
                        binaryData += ((pixels[pixelIndex + channelIndex] & 0x02) >> 1).toString();
                    }
                } else if (detectedAlgorithm === 'patchwork') {
                    // Patchwork算法从最低位和第二低位读取
                    for (let i = 0; i < 32; i += 2) {
                        const pixelIndex = Math.floor(i / 2) * 4 + 32; // 从第8个像素后开始 (8 * 4 = 32)
                        const channelIndex = (i / 2) % 2;
                        // 读取最低位
                        binaryData += (pixels[pixelIndex + channelIndex] & 0x01).toString();
                        // 如果还有下一个位，读取第二低位
                        if (i + 1 < 32) {
                            binaryData += ((pixels[pixelIndex + channelIndex] >> 1) & 0x01).toString();
                        }
                    }
                } else {
                    // LSB算法从最低位读取
                    for (let i = 0; i < 32; i++) {
                        const pixelIndex = Math.floor(i / 3) * 4 + 32; // 从第8个像素后开始 (8 * 4 = 32)
                        const channelIndex = (i + 32) % 3;
                        binaryData += (pixels[pixelIndex + channelIndex] & 0x01).toString();
                    }
                }
                
                // 解析消息长度
                const messageLength = parseInt(binaryData.substring(0, 32), 2);
                
                // 检查长度是否合理
                resolve(messageLength > 0 && messageLength <= 10000);
            } catch (error) {
                resolve(false); // 出错时假定没有隐写内容
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
                // 创建画布
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // 设置画布尺寸与图片相同
                canvas.width = image.width;
                canvas.height = image.height;
                
                // 在画布上绘制图片
                ctx.drawImage(image, 0, 0);
                
                // 获取图片数据
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
                
                // 如果设置为自动检测，从图片中读取算法类型
                let detectedAlgorithm = 'lsb';
                if (algorithm === 'auto') {
                    // 从第一个像素的Alpha通道读取算法类型
                    const algorithmCode = pixels[3] & 0x03;
                    detectedAlgorithm = algorithmCode === 1 ? 'dct' : (algorithmCode === 2 ? 'patchwork' : 'lsb');
                } else {
                    detectedAlgorithm = algorithm;
                }
                
                // 从像素中提取二进制数据
                let binaryData = '';
                
                // 根据算法类型选择不同的解码方法
                switch (detectedAlgorithm) {
                    case 'dct':
                        // DCT算法解码（简化版）
                        // 首先提取32位的长度信息
                        for (let i = 0; i < 32; i++) {
                            const pixelIndex = Math.floor(i / 3) * 4 + 32; // 从第8个像素后开始 (8 * 4 = 32)
                            const channelIndex = i % 3;
                            binaryData += ((pixels[pixelIndex + channelIndex] & 0x02) >> 1).toString(); // 读取第二低位
                        }
                        
                        // 解析消息长度
                        const dctMessageLength = parseInt(binaryData.substring(0, 32), 2);
                        
                        if (dctMessageLength <= 0 || dctMessageLength > 10000) {
                            throw new Error('无法解码：未找到有效的隐藏信息');
                        }
                        
                        // 计算需要读取的位数
                        const dctBitsToRead = dctMessageLength * 8;
                        binaryData = '';
                        
                        // 读取消息内容
                        for (let i = 0; i < dctBitsToRead; i++) {
                            const pixelIndex = Math.floor((i + 32) / 3) * 4 + 32; // 从长度信息后开始，从第8个像素后开始 (8 * 4 = 32)
                            const channelIndex = (i + 32) % 3;
                            binaryData += ((pixels[pixelIndex + channelIndex] >> 1) & 0x01).toString(); // 读取第二低位
                        }
                        break;
                        
                    case 'patchwork':
                        // Patchwork算法解码（简化版）
                        // 首先提取32位的长度信息
                        for (let i = 0; i < 32; i++) {
                            const pixelIndex = Math.floor(i / 2) * 4 + 32; // 从第8个像素后开始 (8 * 4 = 32)，与encode方法保持一致
                            const channelIndex = i % 2;
                            binaryData += (pixels[pixelIndex + channelIndex] & 0x01).toString(); // 读取最低位
                            if (i + 1 < 32) {
                                binaryData += ((pixels[pixelIndex + channelIndex] >> 1) & 0x01).toString(); // 读取第二低位
                                i++; // 处理下一个位
                            }
                        }
                        
                        // 解析消息长度
                        const patchworkMessageLength = parseInt(binaryData.substring(0, 32), 2);
                        
                        if (patchworkMessageLength <= 0 || patchworkMessageLength > 10000) {
                            throw new Error('无法解码：未找到有效的隐藏信息');
                        }
                        
                        // 计算需要读取的位数
                        const patchworkBitsToRead = patchworkMessageLength * 8;
                        binaryData = '';
                        
                        // 读取消息内容
                        for (let i = 0; i < patchworkBitsToRead; i++) {
                            const pixelIndex = Math.floor((i + 32) / 2) * 4 + 32; // 从长度信息后开始，从第8个像素后开始 (8 * 4 = 32)
                            const channelIndex = (i + 32) % 2;
                            binaryData += (pixels[pixelIndex + channelIndex] & 0x01).toString(); // 读取最低位
                            if (i + 1 < patchworkBitsToRead) {
                                binaryData += ((pixels[pixelIndex + channelIndex] >> 1) & 0x01).toString(); // 读取第二低位
                                i++; // 处理下一个位
                            }
                        }
                        break;
                        
                    case 'lsb':
                    default:
                        // LSB算法解码
                        // 首先提取32位的长度信息
                        for (let i = 0; i < 32; i++) {
                            const pixelIndex = Math.floor(i / 3) * 4 + 32; // 从第8个像素后开始 (8 * 4 = 32)
                            const channelIndex = i % 3;
                            const bit = (pixels[pixelIndex + channelIndex] & 0x01).toString(); // 读取最低位
                            binaryData += bit;
                            console.log(`Extracting length bit ${i}: ${bit} from pixel ${pixelIndex/4}, channel ${channelIndex}`);
                        }
                        
                        // 解析消息长度
                        const lsbMessageLength = parseInt(binaryData.substring(0, 32), 2);
                        
                        if (lsbMessageLength <= 0 || lsbMessageLength > 10000) {
                            throw new Error('无法解码：未找到有效的隐藏信息');
                        }
                        
                        // 计算需要读取的位数
                        const lsbBitsToRead = lsbMessageLength * 8;
                        console.log(`LSB bits to read: ${lsbBitsToRead}`);
                        binaryData = '';
                        
                        // 读取消息内容
                        console.log(`Starting to extract ${lsbBitsToRead} bits`);
                        let extractedBits = 0;
                        for (let i = 0; i < lsbBitsToRead; i++) {
                            const pixelIndex = Math.floor((i + 32) / 3) * 4 + 32; // 从长度信息后开始，从第8个像素后开始 (8 * 4 = 32)
                            const channelIndex = (i + 32) % 3;
                            console.log(`Iteration ${i}: pixelIndex=${pixelIndex}, channelIndex=${channelIndex}`);
                            // 检查索引是否越界
                            if (pixelIndex + channelIndex >= pixels.length) {
                                console.error(`Index out of bounds: pixelIndex=${pixelIndex}, channelIndex=${channelIndex}, pixels.length=${pixels.length}`);
                                break;
                            }
                            const bit = (pixels[pixelIndex + channelIndex] & 0x01).toString(); // 读取最低位
                            binaryData += bit;
                            extractedBits++;
                            console.log(`Extracting message bit ${i}: ${bit} from pixel ${pixelIndex/4}, channel ${channelIndex}`);
                        }
                        console.log(`Total message bits extracted: ${binaryData.length}, loop iterations: ${extractedBits}`);
                        
                        // 如果提取的位数不等于预期的位数，记录错误信息
                        if (binaryData.length !== lsbBitsToRead) {
                            console.error(`Mismatch in extracted bits: expected ${lsbBitsToRead}, got ${binaryData.length}`);
                        }
                        break;
                }
                
                // 将二进制数据转换回字符
                // 首先将二进制字符串转换为Uint8Array
                const bytes = new Uint8Array(Math.ceil(binaryData.length / 8));
                for (let i = 0; i < binaryData.length; i += 8) {
                    const byte = binaryData.substring(i, i + 8);
                    const byteIndex = Math.floor(i / 8);
                    bytes[byteIndex] = parseInt(byte, 2);
                }
                
                // 调试信息
                console.log('Decoded binary data:', binaryData);
                console.log('Decoded bytes:', bytes);
                
                // 使用TextDecoder将Uint8Array转换为字符串，确保正确处理UTF-8编码
                const decoder = new TextDecoder('utf-8');
                let message = decoder.decode(bytes);
                
                // 如果消息是加密的，尝试解密
                if (message.startsWith('ENCRYPTED:')) {
                    try {
                        if (!password || password.trim() === '') {
                            // 如果没有提供密码，但内容是加密的，返回特殊标记
                            resolve('PASSWORD_REQUIRED:' + message);
                            return;
                        }
                        message = this.decryptText(message, password);
                    } catch (error) {
                        reject(error);
                        return;
                    }
                }
                
                resolve(message);
            } catch (error) {
                reject(error);
            }
        });
    }
}