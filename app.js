// 更新拖放区域显示已选择的文件名
function updateDropAreaWithFileName(dropArea, fileName) {
    // 查找拖放消息元素
    const dropMessage = dropArea.querySelector('.drop-message');
    if (dropMessage) {
        // 保存原始图标
        const icon = dropMessage.querySelector('i');
        
        // 清空当前内容并保留图标
        dropMessage.innerHTML = '';
        if (icon) {
            dropMessage.appendChild(icon);
        }
        
        // 添加文件名显示
        const fileNameElement = document.createElement('p');
        fileNameElement.className = 'selected-file-name';
        fileNameElement.textContent = `Selected: ${fileName}`;
        dropMessage.appendChild(fileNameElement);
        
        // 添加样式表示已选择文件
        dropArea.classList.add('file-selected');
    }
}

// 重置拖放区域到初始状态
function resetDropArea(dropAreaId) {
    const dropArea = document.getElementById(dropAreaId);
    if (!dropArea) return;
    
    // 移除文件选择状态
    dropArea.classList.remove('file-selected');
    
    // 恢复原始提示文本
    const dropMessage = dropArea.querySelector('.drop-message');
    if (dropMessage) {
        const icon = dropMessage.querySelector('i');
        const messageId = dropAreaId === 'encode-drop-area' ? 'drop-message-text' : 
                         (dropAreaId === 'decode-drop-area' ? 'decode-drop-message' : null);
        
        // 清空并重建内容
        dropMessage.innerHTML = '';
        
        // 添加图标
        if (icon) {
            dropMessage.appendChild(icon);
        } else {
            const newIcon = document.createElement('i');
            newIcon.className = 'fas fa-cloud-upload-alt';
            dropMessage.appendChild(newIcon);
        }
        
        // 添加提示文本
        const textElement = document.createElement('p');
        if (messageId) {
            textElement.id = messageId;
        }
        textElement.textContent = i18n.t('drop_message');
        dropMessage.appendChild(textElement);
    }
}

// 设置拖放功能
function setupDropArea(dropAreaId, fileInputId) {
    const dropArea = document.getElementById(dropAreaId);
    const fileInput = document.getElementById(fileInputId);
    
    if (!dropArea || !fileInput) return;
    
    // 点击拖放区域时触发文件选择
    dropArea.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.click();
    });
    
    // 阻止默认拖放行为
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // 高亮显示拖放区域
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.add('active');
        }, false);
    });
    
    // 取消高亮显示
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.remove('active');
        }, false);
    });
    
    // 处理拖放的文件
    dropArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            fileInput.files = files;
            // 触发change事件，以便其他监听器能够响应
            const event = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(event);
            
            // 显示已选择的文件名
            updateDropAreaWithFileName(dropArea, files[0].name);
        }
    }, false);
    
    // 监听文件输入变化
    fileInput.addEventListener('change', (e) => {
        if (fileInput.files && fileInput.files.length > 0) {
            // 显示已选择的文件名
            updateDropAreaWithFileName(dropArea, fileInput.files[0].name);
        }
    });
}

// 生成QR码功能
function generateQRCode(text, canvasId, downloadBtnId, containerId) {
    const qrcodeContainer = document.getElementById(containerId);
    const qrcodeCanvas = document.getElementById(canvasId);
    const downloadBtn = document.getElementById(downloadBtnId);
    
    if (!text || !qrcodeContainer || !qrcodeCanvas || !downloadBtn) return;
    
    // 显示QR码容器
    qrcodeContainer.classList.remove('hidden');
    
    // 清除之前的QR码
    while (qrcodeCanvas.firstChild) {
        qrcodeCanvas.removeChild(qrcodeCanvas.firstChild);
    }
    
    // 生成QR码
    QRCode.toCanvas(qrcodeCanvas, text, {
        width: 200,
        margin: 1,
        color: {
            dark: '#000000',
            light: '#ffffff'
        }
    }, function(error) {
        if (error) {
            console.error('QR码生成失败:', error);
            return;
        }
        
        // 设置下载按钮事件
        downloadBtn.addEventListener('click', () => {
            // 创建临时链接下载QR码图片
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = qrcodeCanvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // 设置语言选择器
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        // 从本地存储中获取保存的语言设置
        const savedLanguage = localStorage.getItem('preferred_language');
        if (savedLanguage) {
            languageSelect.value = savedLanguage;
            I18N.changeLanguage(savedLanguage);
        }
        
        // 监听语言选择变化
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            I18N.changeLanguage(selectedLanguage);
            localStorage.setItem('preferred_language', selectedLanguage);
        });
    }
    
    // Encode/Decode elements
    const encodeImageInput = document.getElementById('encode-image');
    const secretMessageInput = document.getElementById('secret-message');
    const encodePasswordInput = document.getElementById('encode-password');
    const toggleEncodePasswordBtn = document.getElementById('toggle-encode-password');
    const autoClearEncodeCheckbox = document.getElementById('auto-clear-encode');
    const encodeBtn = document.getElementById('encode-btn');
    const encodeResult = document.getElementById('encode-result');
    const encodedImage = document.getElementById('encoded-image');
    const downloadBtn = document.getElementById('download-btn');
    const decodeImageInput = document.getElementById('decode-image');
    const decodePasswordInput = document.getElementById('decode-password');
    const toggleDecodePasswordBtn = document.getElementById('toggle-decode-password');
    const decodeBtn = document.getElementById('decode-btn');
    const checkWatermarkBtn = document.getElementById('check-watermark-btn');
    const decodeResult = document.getElementById('decode-result');
    const decodedMessage = document.getElementById('decoded-message');
    const copyBtn = document.getElementById('copy-btn');
    
    // Crypto wallet elements
    const cryptoTypeSelect = document.getElementById('crypto-type');
    const privateKeyInput = document.getElementById('private-key-input');
    const recoveryPhraseInput = document.getElementById('recovery-phrase-input');
    const privateKeyField = document.getElementById('private-key');
    const phraseGrid = document.getElementById('phrase-grid');
    const phraseLengthSelect = document.getElementById('phrase-length');
    const toggleKeyBtn = document.getElementById('toggle-key-visibility');
    const togglePhraseBtn = document.getElementById('toggle-phrase-visibility');
    const cryptoPasswordInput = document.getElementById('crypto-password');
    const toggleCryptoPasswordBtn = document.getElementById('toggle-crypto-password');
    const autoClearCryptoCheckbox = document.getElementById('auto-clear-crypto');
    const cryptoImageInput = document.getElementById('crypto-image');
    const watermarkWarning = document.getElementById('watermark-warning');
    const cryptoEncodeBtn = document.getElementById('crypto-encode-btn');
    const cryptoEncodeResult = document.getElementById('crypto-encode-result');
    const cryptoEncodedImage = document.getElementById('crypto-encoded-image');
    const cryptoDownloadBtn = document.getElementById('crypto-download-btn');
    const cryptoDecodeImageInput = document.getElementById('crypto-decode-image');
    const cryptoDecodePasswordInput = document.getElementById('crypto-decode-password');
    const toggleCryptoDecodePasswordBtn = document.getElementById('toggle-crypto-decode-password');
    const cryptoDecodeBtn = document.getElementById('crypto-decode-btn');
    const cryptoDecodeResult = document.getElementById('crypto-decode-result');
    const cryptoDecodedMessage = document.getElementById('crypto-decoded-message');
    const cryptoCopyBtn = document.getElementById('crypto-copy-btn');
    const validatePhraseBtn = document.getElementById('validate-phrase-btn');
    const phraseValidationMessage = document.getElementById('phrase-validation-message');
    
    // Generate phrase input fields
    function generatePhraseInputs(count) {
        phraseGrid.innerHTML = '';
        for (let i = 1; i <= count; i++) {
            const inputContainer = document.createElement('div');
            inputContainer.className = 'phrase-input-container';
            
            const label = document.createElement('label');
            label.textContent = i;
            
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'phrase-word';
            input.placeholder = `Word ${i}`;
            input.dataset.index = i;
            input.autocomplete = 'off'; // 禁用浏览器默认自动完成
            
            // 创建自动补全下拉菜单容器
            const autocompleteContainer = document.createElement('div');
            autocompleteContainer.className = 'autocomplete-container hidden';
            
            inputContainer.appendChild(label);
            inputContainer.appendChild(input);
            inputContainer.appendChild(autocompleteContainer);
            phraseGrid.appendChild(inputContainer);
            
            // 添加输入事件监听器
            setupWordAutocomplete(input, autocompleteContainer);
            
            // 添加助记词验证功能
            setupWordValidation(input);
        }
    }
    
    // 设置助记词验证功能
function setupWordValidation(input) {
    input.addEventListener('blur', function() {
        const word = this.value.trim().toLowerCase();
        if (word && !BIP39_WORDLIST.includes(word)) {
            this.classList.add('invalid');
            this.classList.remove('valid');
            // 显示错误提示
            const errorTip = document.createElement('div');
            errorTip.className = 'error-tip';
            // 使用i18n翻译系统获取当前语言的错误提示
            errorTip.textContent = i18n.t('invalid_bip39_word');
            this.parentNode.appendChild(errorTip);
            
            // 3秒后移除错误提示
            setTimeout(() => {
                const existingTip = this.parentNode.querySelector('.error-tip');
                if (existingTip) existingTip.remove();
            }, 3000);
        } else if (word) {
            this.classList.add('valid');
            this.classList.remove('invalid');
            // 移除可能存在的错误提示
            const existingTip = this.parentNode.querySelector('.error-tip');
            if (existingTip) existingTip.remove();
        } else {
            this.classList.remove('valid');
            this.classList.remove('invalid');
            // 移除可能存在的错误提示
            const existingTip = this.parentNode.querySelector('.error-tip');
            if (existingTip) existingTip.remove();
        }
    });
}
    
    // 验证助记词是否有效
    function validateMnemonicPhrase() {
        const phraseInputs = document.querySelectorAll('.phrase-word');
        const words = [];
        let isValid = true;
        
        // 收集所有输入的词
        for (const input of phraseInputs) {
            const word = input.value.trim().toLowerCase();
            if (!word) {
                isValid = false;
                break;
            }
            words.push(word);
        }
        
        // 检查每个词是否在BIP39词汇表中
        const allWordsValid = words.every(word => BIP39_WORDLIST.includes(word));
        
        // 检查词数是否正确
        const expectedCount = parseInt(phraseLengthSelect.value);
        const countCorrect = words.length === expectedCount;
        
        // 显示验证结果
        phraseValidationMessage.classList.remove('hidden');
        
        if (isValid && allWordsValid && countCorrect) {
            phraseValidationMessage.textContent = `✓ ${i18n.t('valid_mnemonic', {count: expectedCount})}`;
            phraseValidationMessage.className = 'phrase-validation-message valid';
        } else {
            let errorMessage = '';
            
            if (!isValid) {
                errorMessage = i18n.t('fill_all_mnemonic_inputs');
            } else if (!allWordsValid) {
                errorMessage = i18n.t('contains_invalid_bip39_words');
            } else if (!countCorrect) {
                errorMessage = i18n.t('mnemonic_must_contain', {count: expectedCount});
            }
            
            phraseValidationMessage.textContent = `✗ ${errorMessage}`;
            phraseValidationMessage.className = 'phrase-validation-message invalid';
        }
    }
    
    // 设置助记词自动补全功能
    function setupWordAutocomplete(inputElement, autocompleteContainer) {
        // 输入事件监听
        inputElement.addEventListener('input', function() {
            const inputValue = this.value.toLowerCase().trim();
            
            // 清空自动补全容器
            autocompleteContainer.innerHTML = '';
            
            // 如果输入为空，隐藏自动补全
            if (!inputValue) {
                autocompleteContainer.classList.add('hidden');
                return;
            }
            
            // 查找匹配的词汇
            const matchingWords = BIP39_WORDLIST.filter(word => 
                word.startsWith(inputValue)
            ).slice(0, 5); // 最多显示5个匹配项
            
            if (matchingWords.length > 0) {
                // 显示匹配的词汇
                matchingWords.forEach(word => {
                    const wordElement = document.createElement('div');
                    wordElement.className = 'autocomplete-item';
                    wordElement.textContent = word;
                    
                    // 点击词汇时填充输入框
                    wordElement.addEventListener('click', () => {
                        inputElement.value = word;
                        autocompleteContainer.classList.add('hidden');
                        
                        // 自动跳转到下一个输入框
                        const allInputs = Array.from(document.querySelectorAll('.phrase-word'));
                        const currentIndex = allInputs.indexOf(inputElement);
                        if (currentIndex < allInputs.length - 1) {
                            allInputs[currentIndex + 1].focus();
                        }
                    });
                    
                    autocompleteContainer.appendChild(wordElement);
                });
                
                autocompleteContainer.classList.remove('hidden');
            } else {
                autocompleteContainer.classList.add('hidden');
            }
        });
        
        // 失去焦点时隐藏自动补全
        inputElement.addEventListener('blur', function() {
            // 延迟隐藏，以便可以点击选项
            setTimeout(() => {
                autocompleteContainer.classList.add('hidden');
            }, 200);
        });
        
        // 键盘导航
        inputElement.addEventListener('keydown', function(e) {
            const items = autocompleteContainer.querySelectorAll('.autocomplete-item');
            if (items.length === 0) return;
            
            // 当前选中项的索引
            let selectedIndex = Array.from(items).findIndex(item => 
                item.classList.contains('selected')
            );
            
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    // 选择下一项
                    selectedIndex = (selectedIndex + 1) % items.length;
                    break;
                    
                case 'ArrowUp':
                    e.preventDefault();
                    // 选择上一项
                    selectedIndex = (selectedIndex - 1 + items.length) % items.length;
                    break;
                    
                case 'Enter':
                    e.preventDefault();
                    // 如果有选中项，则使用它
                    if (selectedIndex >= 0) {
                        inputElement.value = items[selectedIndex].textContent;
                        autocompleteContainer.classList.add('hidden');
                        
                        // 自动跳转到下一个输入框
                        const allInputs = Array.from(document.querySelectorAll('.phrase-word'));
                        const currentIndex = allInputs.indexOf(inputElement);
                        if (currentIndex < allInputs.length - 1) {
                            allInputs[currentIndex + 1].focus();
                        }
                    }
                    return;
                    
                case 'Escape':
                    // 关闭自动补全
                    autocompleteContainer.classList.add('hidden');
                    return;
                    
                default:
                    return;
            }
            
            // 更新选中项
            items.forEach((item, index) => {
                if (index === selectedIndex) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
        });
    }
    
    // Initialize with 12 word inputs
    generatePhraseInputs(12);
    
    // 助记词验证按钮点击事件
    validatePhraseBtn.addEventListener('click', () => {
        validateMnemonicPhrase();
    });
    
    // 初始化拖放区域
    setupDropArea('encode-drop-area', 'encode-image');
    setupDropArea('decode-drop-area', 'decode-image');
    setupDropArea('crypto-encode-drop-area', 'crypto-image');
    setupDropArea('crypto-decode-drop-area', 'crypto-decode-image');
    
    // Tab switching functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active state to current tab
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Reset result areas
            encodeResult.classList.add('hidden');
            decodeResult.classList.add('hidden');
            cryptoEncodeResult.classList.add('hidden');
            cryptoDecodeResult.classList.add('hidden');
            
            // 重置所有拖放区域
            resetDropArea('encode-drop-area');
            resetDropArea('decode-drop-area');
            resetDropArea('crypto-encode-drop-area');
            resetDropArea('crypto-decode-drop-area');
        });
    });

    // Crypto wallet type switching
    cryptoTypeSelect.addEventListener('change', () => {
        if (cryptoTypeSelect.value === 'private-key') {
            privateKeyInput.classList.remove('hidden');
            recoveryPhraseInput.classList.add('hidden');
        } else {
            privateKeyInput.classList.add('hidden');
            recoveryPhraseInput.classList.remove('hidden');
        }
    });
    
    // Phrase length switching
    phraseLengthSelect.addEventListener('change', () => {
        const wordCount = parseInt(phraseLengthSelect.value);
        generatePhraseInputs(wordCount);
    });
    
    // Toggle password visibility functions
    function setupPasswordToggle(passwordInput, toggleButton) {
        toggleButton.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleButton.textContent = 'Hide';
            } else {
                passwordInput.type = 'password';
                toggleButton.textContent = 'Show';
            }
        });
    }
    
    // Setup all password toggles
    setupPasswordToggle(privateKeyField, toggleKeyBtn);
    setupPasswordToggle(encodePasswordInput, toggleEncodePasswordBtn);
    setupPasswordToggle(decodePasswordInput, toggleDecodePasswordBtn);
    setupPasswordToggle(cryptoPasswordInput, toggleCryptoPasswordBtn);
    setupPasswordToggle(cryptoDecodePasswordInput, toggleCryptoDecodePasswordBtn);
    
    togglePhraseBtn.addEventListener('click', () => {
        const phraseInputs = document.querySelectorAll('.phrase-word');
        const isVisible = phraseInputs[0].type === 'text';
        
        phraseInputs.forEach(input => {
            input.type = isVisible ? 'password' : 'text';
        });
        
        togglePhraseBtn.textContent = isVisible ? 'Show' : 'Hide';
    });
    
    // 自动清除功能
    function clearSensitiveData(type) {
        if (type === 'encode' && autoClearEncodeCheckbox.checked) {
            secretMessageInput.value = '';
            encodePasswordInput.value = '';
            // 重置编码拖放区域
            resetDropArea('encode-drop-area');
            // 清除文件输入
            if (encodeImageInput) encodeImageInput.value = '';
        } else if (type === 'crypto' && autoClearCryptoCheckbox.checked) {
            privateKeyField.value = '';
            const phraseInputs = document.querySelectorAll('.phrase-word');
            phraseInputs.forEach(input => input.value = '');
            cryptoPasswordInput.value = '';
            // 重置加密钱包拖放区域
            resetDropArea('crypto-encode-drop-area');
            // 清除文件输入
            if (cryptoImageInput) cryptoImageInput.value = '';
        }
    }
    
    // 水印检测功能
    async function checkForWatermark(imageInput, warningElement) {
        if (!imageInput.files || imageInput.files.length === 0) {
            if (warningElement) warningElement.classList.add('hidden');
            return false;
        }
        
        try {
            const file = imageInput.files[0];
            const image = await loadImage(file);
            const hasWatermark = await Steganography.hasHiddenContent(image);
            
            if (warningElement) {
                if (hasWatermark) {
                    warningElement.classList.remove('hidden');
                } else {
                    warningElement.classList.add('hidden');
                }
            }
            
            return hasWatermark;
        } catch (error) {
            console.error('Error checking watermark:', error);
            if (warningElement) warningElement.classList.add('hidden');
            return false;
        }
    }
    
    // 监听图片选择，检测水印
    cryptoImageInput.addEventListener('change', () => {
        checkForWatermark(cryptoImageInput, watermarkWarning);
    });
    
    // 检查水印按钮
    checkWatermarkBtn.addEventListener('click', async () => {
        if (!decodeImageInput.files || decodeImageInput.files.length === 0) {
            alert('Please select an image first');
            return;
        }
        
        try {
            checkWatermarkBtn.disabled = true;
            checkWatermarkBtn.textContent = 'Checking...';
            
            const hasWatermark = await checkForWatermark(decodeImageInput);
            
            if (hasWatermark) {
                alert('This image contains hidden data that can be decoded.');
            } else {
                alert('No hidden data detected in this image.');
            }
        } catch (error) {
            alert('Error checking image: ' + error.message);
        } finally {
            checkWatermarkBtn.disabled = false;
            checkWatermarkBtn.textContent = 'Check for Hidden Content';
        }
    });
    
    // Crypto wallet encoding
    cryptoEncodeBtn.addEventListener('click', async () => {
        // Get wallet info based on selected type
        let walletInfo = '';
        
        if (cryptoTypeSelect.value === 'private-key') {
            walletInfo = privateKeyField.value.trim();
            if (!walletInfo) {
                alert('Please enter your private key');
                return;
            }
        } else {
            // Get all phrase words from input fields
            const phraseInputs = document.querySelectorAll('.phrase-word');
            const phraseWords = [];
            
            // Collect and validate each word
            for (const input of phraseInputs) {
                const word = input.value.trim();
                if (!word) {
                    alert(`Please enter word ${input.dataset.index}`);
                    input.focus();
                    return;
                }
                phraseWords.push(word);
            }
            
            // Join all words with spaces
            walletInfo = phraseWords.join(' ');
            
            // Validate word count
            const expectedCount = parseInt(phraseLengthSelect.value);
            if (phraseWords.length !== expectedCount) {
                alert(`Recovery phrase must contain exactly ${expectedCount} words`);
                return;
            }
        }
        
        // Check if an image is selected
        if (!cryptoImageInput.files || cryptoImageInput.files.length === 0) {
            alert('Please select an image first');
            return;
        }
        
        try {
            // Show loading state
            cryptoEncodeBtn.disabled = true;
            cryptoEncodeBtn.textContent = 'Processing...';
            
            // Load the selected image
            const file = cryptoImageInput.files[0];
            const image = await loadImage(file);
            
            // 检查图片是否已包含隐写内容
            const hasWatermark = await Steganography.hasHiddenContent(image);
            if (hasWatermark && !confirm('This image already contains hidden data. Proceeding will overwrite it. Continue?')) {
                cryptoEncodeBtn.disabled = false;
                cryptoEncodeBtn.textContent = 'Encode Wallet Info';
                return;
            }
            
            // Add a prefix to identify the type of wallet info
            const prefix = cryptoTypeSelect.value === 'private-key' ? 'PRIVATE_KEY:' : 'RECOVERY_PHRASE:';
            const messageToEncode = prefix + walletInfo;
            
            // Get password if provided
            const password = cryptoPasswordInput.value.trim();
            
            // 获取选择的隐写算法
            const algorithm = document.getElementById('crypto-encode-algorithm').value;
            
            // Use steganography tool to encode the message with password and algorithm
            const encodedDataURL = await Steganography.encode(image, messageToEncode, password, algorithm);
            
            // Display the result
            cryptoEncodedImage.src = encodedDataURL;
            cryptoEncodeResult.classList.remove('hidden');
            
            // Set up download button
            cryptoDownloadBtn.onclick = () => {
                const link = document.createElement('a');
                link.href = encodedDataURL;
                link.download = 'wallet_' + file.name.split('.')[0] + '.png';
                link.click();
            };
            
            // 自动清除敏感数据
            clearSensitiveData('crypto');
        } catch (error) {
            alert('Encoding failed: ' + error.message);
        } finally {
            // Restore button state
            cryptoEncodeBtn.disabled = false;
            cryptoEncodeBtn.textContent = 'Encode Wallet Info';
        }
    });
    
    // Crypto wallet decoding
    cryptoDecodeBtn.addEventListener('click', async () => {
        // Check if an image is selected
        if (!cryptoDecodeImageInput.files || cryptoDecodeImageInput.files.length === 0) {
            alert('Please select an image first');
            return;
        }
        
        try {
            // Show loading state
            cryptoDecodeBtn.disabled = true;
            cryptoDecodeBtn.textContent = 'Processing...';
            
            // Load the selected image
            const file = cryptoDecodeImageInput.files[0];
            const image = await loadImage(file);
            
            // Get password if provided
            const password = cryptoDecodePasswordInput.value.trim();
            
            // 获取选择的隐写算法
            const algorithm = document.getElementById('crypto-decode-algorithm').value;
            
            // Use steganography tool to decode the message with password and algorithm
            let message = await Steganography.decode(image, password, algorithm);
            
            // Check if password is required
            if (message.startsWith('PASSWORD_REQUIRED:')) {
                alert('This content is password-protected. Please enter the password to decrypt.');
                cryptoDecodePasswordInput.focus();
                cryptoDecodeBtn.disabled = false;
                cryptoDecodeBtn.textContent = 'Decode Wallet Info';
                return;
            }
            
            // Display the result
            cryptoDecodedMessage.value = message;
            cryptoDecodeResult.classList.remove('hidden');
            
            // If it's a recovery phrase, try to fill the input fields
            if (message.startsWith('RECOVERY_PHRASE:')) {
                const phrase = message.replace('RECOVERY_PHRASE:', '').trim();
                const words = phrase.split(/\s+/).filter(word => word.length > 0);
                
                // Switch to recovery phrase tab
                if (cryptoTypeSelect.value !== 'recovery-phrase') {
                    cryptoTypeSelect.value = 'recovery-phrase';
                    privateKeyInput.classList.add('hidden');
                    recoveryPhraseInput.classList.remove('hidden');
                }
                
                // Set the correct phrase length
                if (words.length === 24) {
                    phraseLengthSelect.value = '24';
                    generatePhraseInputs(24);
                } else {
                    phraseLengthSelect.value = '12';
                    generatePhraseInputs(12);
                }
                
                // Fill in the words
                const phraseInputs = document.querySelectorAll('.phrase-word');
                words.forEach((word, index) => {
                    if (index < phraseInputs.length) {
                        phraseInputs[index].value = word;
                    }
                });
            } else if (message.startsWith('PRIVATE_KEY:')) {
                // If it's a private key, fill the private key field
                const privateKey = message.replace('PRIVATE_KEY:', '').trim();
                
                // Switch to private key tab
                if (cryptoTypeSelect.value !== 'private-key') {
                    cryptoTypeSelect.value = 'private-key';
                    recoveryPhraseInput.classList.add('hidden');
                    privateKeyInput.classList.remove('hidden');
                }
                
                privateKeyField.value = privateKey;
            }
        } catch (error) {
            alert('Decoding failed: ' + error.message);
        } finally {
            // Restore button state
            cryptoDecodeBtn.disabled = false;
            cryptoDecodeBtn.textContent = 'Decode Wallet Info';
        }
    });
    
    // Copy crypto decoded result
    cryptoCopyBtn.addEventListener('click', () => {
        cryptoDecodedMessage.select();
        document.execCommand('copy');
        alert('Text copied to clipboard');
    });
    
    // Generate QR code for crypto wallet decoded message
    const cryptoGenerateQrBtn = document.getElementById('crypto-generate-qr-btn');
    const cryptoQrcodeContainer = document.getElementById('crypto-qrcode-container');
    if (cryptoGenerateQrBtn && cryptoQrcodeContainer) {
        cryptoGenerateQrBtn.addEventListener('click', () => {
            const cryptoDecodedMessage = document.getElementById('crypto-decoded-message');
            if (cryptoDecodedMessage && cryptoDecodedMessage.value) {
                generateQRCode(cryptoDecodedMessage.value, 'crypto-qrcode-canvas', 'crypto-download-qr-btn', 'crypto-qrcode-container');
            } else {
                alert('No decoded message available to generate QR code');
            }
        });
    }
    
    // Encoding functionality
    encodeBtn.addEventListener('click', async () => {
        // Check if an image is selected
        if (!encodeImageInput.files || encodeImageInput.files.length === 0) {
            alert('Please select an image first');
            return;
        }
        
        // Check if a message is entered
        const message = secretMessageInput.value.trim();
        if (!message) {
            alert('Please enter text to hide');
            return;
        }
        
        try {
            // Show loading state
            encodeBtn.disabled = true;
            encodeBtn.textContent = 'Processing...';
            
            // Load the selected image
            const file = encodeImageInput.files[0];
            const image = await loadImage(file);
            
            // 检查图片是否已包含隐写内容
            const hasWatermark = await Steganography.hasHiddenContent(image);
            if (hasWatermark && !confirm('This image already contains hidden data. Proceeding will overwrite it. Continue?')) {
                encodeBtn.disabled = false;
                encodeBtn.textContent = 'Encode Message';
                return;
            }
            
            // Get password if provided
            const password = encodePasswordInput.value.trim();
            
            // 获取选择的隐写算法
            const algorithm = document.getElementById('encode-algorithm').value;
            
            // Use steganography tool to encode the message with password and algorithm
            const encodedDataURL = await Steganography.encode(image, message, password, algorithm);
            
            // Display the result
            encodedImage.src = encodedDataURL;
            encodeResult.classList.remove('hidden');
            
            // Set up download button
            downloadBtn.onclick = () => {
                const link = document.createElement('a');
                link.href = encodedDataURL;
                link.download = 'encoded_' + file.name.split('.')[0] + '.png';
                link.click();
            };
            
            // 自动清除敏感数据
            clearSensitiveData('encode');
        } catch (error) {
            alert('Encoding failed: ' + error.message);
        } finally {
            // Restore button state
            encodeBtn.disabled = false;
            encodeBtn.textContent = 'Encode Message';
        }
    });
    
    // Decoding functionality
    decodeBtn.addEventListener('click', async () => {
        // Check if an image is selected
        if (!decodeImageInput.files || decodeImageInput.files.length === 0) {
            alert('Please select an image first');
            return;
        }
        
        try {
            // Show loading state
            decodeBtn.disabled = true;
            decodeBtn.textContent = 'Processing...';
            
            // Load the selected image
            const file = decodeImageInput.files[0];
            const image = await loadImage(file);
            
            // Get password if provided
            const password = decodePasswordInput.value.trim();
            
            // 获取选择的隐写算法
            const algorithm = document.getElementById('decode-algorithm').value;
            
            // Use steganography tool to decode the message with password and algorithm
            let message = await Steganography.decode(image, password, algorithm);
            
            // Check if password is required
            if (message.startsWith('PASSWORD_REQUIRED:')) {
                alert('This content is password-protected. Please enter the password to decrypt.');
                decodePasswordInput.focus();
                decodeBtn.disabled = false;
                decodeBtn.textContent = 'Decode Message';
                return;
            }
            
            // Display the result
            decodedMessage.value = message;
            decodeResult.classList.remove('hidden');
        } catch (error) {
            alert('Decoding failed: ' + error.message);
        } finally {
            // Restore button state
            decodeBtn.disabled = false;
            decodeBtn.textContent = 'Decode Message';
        }
    });
    
    // Copy decoded result
    copyBtn.addEventListener('click', () => {
        decodedMessage.select();
        document.execCommand('copy');
        alert('Text copied to clipboard');
    });
    
    // Generate QR code button click event
    const generateQrBtn = document.getElementById('generate-qr-btn');
    const qrcodeContainer = document.getElementById('qrcode-container');
    if (generateQrBtn && qrcodeContainer) {
        generateQrBtn.addEventListener('click', () => {
            const decodedMessage = document.getElementById('decoded-message');
            if (decodedMessage && decodedMessage.value) {
                generateQRCode(decodedMessage.value, 'qrcode-canvas', 'download-qr-btn', 'qrcode-container');
            } else {
                alert('No decoded message available to generate QR code');
            }
        });
    }
    
    // Helper function to load an image from a file
    function loadImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = () => reject(new Error('Image loading failed'));
                image.src = event.target.result;
            };
            reader.onerror = () => reject(new Error('File reading failed'));
            reader.readAsDataURL(file);
        });
    }
});
