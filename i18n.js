/**
 * i18n.js - 多语言支持模块
 * 提供界面文本的多语言翻译功能
 */

const I18N = {
    // 支持的语言列表
    supportedLanguages: {
        'en': 'English',
        'zh': '简体中文',
        'zh-tw': '繁體中文',
        'fr': 'Français',
        'ja': '日本語',
        'es': 'Español',
        'de': 'Deutsch',
        'ru': 'Русский'
    },
    
    // 当前语言
    currentLanguage: 'en',
    
    // 翻译字典
    translations: {},
    loadedLanguagePacks: {},
    loadingLanguagePromises: {},
    languagePackManifest: null,
    manifestPromise: null,
    
    /**
     * 初始化多语言支持
     */
    init: async function() {
        // 从本地存储中获取保存的语言设置
        const savedLanguage = localStorage.getItem('preferred_language');
        if (savedLanguage && this.supportedLanguages[savedLanguage]) {
            this.currentLanguage = savedLanguage;
        } else {
            // 尝试从浏览器语言设置中检测语言
            this.currentLanguage = this.getBestLanguageFromNavigator();
        }

        await this.ensureLanguagePackLoaded('en');
        await this.ensureLanguagePackLoaded(this.currentLanguage);

        // 添加语言选择器到页面
        this.addLanguageSelector();

        // 应用当前语言翻译
        this.applyTranslations();
    },

    getBestLanguageFromNavigator: function() {
        const browserLanguage = (navigator.language || '').toLowerCase();
        if (browserLanguage === 'zh-tw' || browserLanguage === 'zh-hk') {
            return 'zh-tw';
        }
        const browserLang = browserLanguage.split('-')[0];
        if (this.supportedLanguages[browserLang]) {
            return browserLang;
        }
        return 'en';
    },

    loadLanguageManifest: function() {
        if (this.languagePackManifest) {
            return Promise.resolve(this.languagePackManifest);
        }
        if (this.manifestPromise) {
            return this.manifestPromise;
        }

        this.manifestPromise = fetch('i18n/manifest.json', { cache: 'no-cache' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load i18n manifest: HTTP ${response.status}`);
                }
                return response.json();
            })
            .then((manifest) => {
                if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
                    throw new Error('Invalid i18n manifest format');
                }
                this.languagePackManifest = manifest;
                return manifest;
            })
            .finally(() => {
                this.manifestPromise = null;
            });

        return this.manifestPromise;
    },

    loadLanguagePack: function(langCode) {
        if (!this.supportedLanguages[langCode]) {
            return Promise.resolve(false);
        }
        if (this.loadingLanguagePromises[langCode]) {
            return this.loadingLanguagePromises[langCode];
        }

        this.loadingLanguagePromises[langCode] = (async () => {
            const manifest = await this.loadLanguageManifest();
            const packVersion = manifest[langCode];
            if (!packVersion) {
                throw new Error(`Language pack version not found for ${langCode}`);
            }

            const response = await fetch(`i18n/${langCode}.json?v=${encodeURIComponent(packVersion)}`, {
                cache: 'force-cache'
            });
            if (!response.ok) {
                throw new Error(`Failed to load language pack: ${langCode} (HTTP ${response.status})`);
            }

            const pack = await response.json();
            if (!pack || typeof pack !== 'object' || Array.isArray(pack)) {
                throw new Error(`Invalid language pack content for ${langCode}`);
            }

            this.translations[langCode] = pack;
            this.loadedLanguagePacks[langCode] = true;
            return true;
        }).finally(() => {
            delete this.loadingLanguagePromises[langCode];
        });

        return this.loadingLanguagePromises[langCode];
    },

    ensureLanguagePackLoaded: async function(langCode) {
        if (!this.supportedLanguages[langCode]) return false;
        if (this.loadedLanguagePacks[langCode] && this.translations[langCode]) return true;

        try {
            return await this.loadLanguagePack(langCode);
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    
    /**
     * 添加语言选择器到页面
     */
    addLanguageSelector: function() {
        // 检查是否已存在语言选择器
        const existingSelector = document.getElementById('language-select');
        if (existingSelector) {
            // 已存在语言选择器，只需更新选项
            for (const [langCode, langName] of Object.entries(this.supportedLanguages)) {
                // 检查选项是否已存在
                let option = Array.from(existingSelector.options).find(opt => opt.value === langCode);
                if (!option) {
                    option = document.createElement('option');
                    option.value = langCode;
                    option.textContent = langName;
                    existingSelector.appendChild(option);
                }
                
                // 设置当前语言
                if (langCode === this.currentLanguage) {
                    existingSelector.value = langCode;
                }
            }

            return;
        }
        
        // 如果不存在，则创建新的语言选择器（这部分代码通常不会执行，因为HTML已包含选择器）
        const container = document.querySelector('.header-container');
        
        // 创建语言选择器容器
        const langSelector = document.createElement('div');
        langSelector.className = 'language-selector';
        
        // 创建语言标签
        const langLabel = document.createElement('span');
        langLabel.textContent = this.t('language_selector');
        langLabel.className = 'lang-label';
        langSelector.appendChild(langLabel);
        
        // 创建语言选择下拉菜单
        const langSelect = document.createElement('select');
        langSelect.id = 'language-select';
        
        // 添加支持的语言选项
        for (const [langCode, langName] of Object.entries(this.supportedLanguages)) {
            const option = document.createElement('option');
            option.value = langCode;
            option.textContent = langName;
            if (langCode === this.currentLanguage) {
                option.selected = true;
            }
            langSelect.appendChild(option);
        }
        
        // 添加语言切换事件监听器
        langSelect.addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });
        
        langSelector.appendChild(langSelect);
        
        // 将语言选择器添加到页面
        if (container) {
            container.appendChild(langSelector);
        }
    },
    
    /**
     * 切换语言
     * @param {string} langCode - 语言代码
     */
    changeLanguage: async function(langCode) {
        if (this.supportedLanguages[langCode]) {
            // 保存新的语言选择到本地存储
            this.currentLanguage = langCode;
            localStorage.setItem('preferred_language', langCode);

            // 保持顶部语言下拉状态与当前语言一致
            const languageSelect = document.getElementById('language-select');
            if (languageSelect && languageSelect.value !== langCode) {
                languageSelect.value = langCode;
            }

            await this.ensureLanguagePackLoaded(langCode);
            await this.ensureLanguagePackLoaded('en');

            // 直接更新文案，避免整页刷新导致闪烁
            this.applyTranslations();
        }
    },
    
    /**
     * 获取翻译文本
     * @param {string} key - 翻译键
     * @returns {string} - 翻译后的文本
     */
    t: function(key) {
        const currentTranslations = this.translations[this.currentLanguage];
        if (currentTranslations && currentTranslations[key]) return currentTranslations[key];

        const fallbackTranslations = this.translations.en;
        if (fallbackTranslations && fallbackTranslations[key]) return fallbackTranslations[key];

        return key;
    },

    /**
     * 获取当前语言对应的 HTML lang 标记
     * @returns {string}
     */
    getHtmlLang: function() {
        const languageMap = {
            'en': 'en',
            'zh': 'zh-CN',
            'zh-tw': 'zh-TW',
            'fr': 'fr',
            'ja': 'ja',
            'es': 'es',
            'de': 'de',
            'ru': 'ru'
        };

        return languageMap[this.currentLanguage] || 'en';
    },

    /**
     * 获取当前语言对应的 Open Graph locale
     * @returns {string}
     */
    getOgLocale: function() {
        const localeMap = {
            'en': 'en_US',
            'zh': 'zh_CN',
            'zh-tw': 'zh_TW',
            'fr': 'fr_FR',
            'ja': 'ja_JP',
            'es': 'es_ES',
            'de': 'de_DE',
            'ru': 'ru_RU'
        };

        return localeMap[this.currentLanguage] || 'en_US';
    },

    /**
     * 获取 SEO 描述文本，没有专门翻译时回退到 app_description
     * @returns {string}
     */
    getSeoDescription: function() {
        const translations = this.translations[this.currentLanguage] || {};
        return translations.seo_description || this.t('app_description');
    },
    
    /**
     * 应用翻译到页面元素
     */
    applyTranslations: function() {
        // 更新页面标题
        document.title = this.t('app_title');

        // 同步语言与关键 SEO 元信息
        document.documentElement.lang = this.getHtmlLang();
        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta) {
            descriptionMeta.setAttribute('content', this.getSeoDescription());
        }
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', this.getSeoDescription());
        }
        const ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale) {
            ogLocale.setAttribute('content', this.getOgLocale());
        }
        
        // 更新主标题和描述
        document.querySelector('h1').textContent = this.t('app_title');
        document.querySelector('.description').textContent = this.t('app_description');
        
        // 更新标签页按钮
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            const tabId = btn.getAttribute('data-tab');
            if (tabId === 'about') btn.textContent = this.t('tab_about');
            else if (tabId === 'encode') btn.textContent = this.t('tab_encode');
            else if (tabId === 'decode') btn.textContent = this.t('tab_decode');
            else if (tabId === 'crypto') btn.textContent = this.t('tab_crypto');
            else if (tabId === 'tutorial') btn.textContent = this.t('tab_tutorial');
            else if (tabId === 'faq') btn.textContent = this.t('tab_faq');
        });
        
        // 更新About页面
        this.updateAboutTab();
        
        // 更新编码部分
        this.updateEncodeTab();
        
        // 更新解码部分
        this.updateDecodeTab();
        
        // 更新加密钱包部分
        this.updateCryptoTab();
        
        // 更新教程部分
        this.updateTutorialTab();
        
        // 更新FAQ部分
        this.updateFAQTab();
        
        // 更新页脚
        document.getElementById('footer-text').textContent = this.t('footer_text');
        
        // 更新版权信息
        const copyrightElement = document.getElementById('copyright-text');
        if (copyrightElement) {
            // 保留链接部分，只更新版权文本
            const linkElement = copyrightElement.querySelector('a');
            copyrightElement.textContent = this.t('copyright_text') + ' ';
            if (linkElement) {
                copyrightElement.appendChild(linkElement);
            }
        }
        
        // 更新Buy Me a Coffee链接
        const buymeacoffeeElement = document.getElementById('buymeacoffee');
        if (buymeacoffeeElement) {
            const linkElement = buymeacoffeeElement.querySelector('a');
            if (linkElement) {
                linkElement.textContent = this.t('buymeacoffee_text');
            }
        }
    },
    
    /**
     * 更新About页面的翻译
     */
    updateAboutTab: function() {
        // 更新About页面标题
        const aboutTitle = document.querySelector('#about .about-title');
        if (aboutTitle) {
            aboutTitle.textContent = this.t('about_title');
        }
        
        // 更新About页面副标题
        const aboutSubtitle = document.querySelector('#about .about-subtitle');
        if (aboutSubtitle) {
            aboutSubtitle.textContent = this.t('about_subtitle');
        }
        
        // 更新功能特性标题和描述
        const featureCards = document.querySelectorAll('#about .feature-card');
        featureCards.forEach((card, index) => {
            const title = card.querySelector('h3');
            const desc = card.querySelector('p');
            
            switch(index) {
                case 0: // Maximum Security
                    if (title) title.textContent = this.t('feature_security_title');
                    if (desc) desc.textContent = this.t('feature_security_desc');
                    break;
                case 1: // Multi-Language Support
                    if (title) title.textContent = this.t('feature_multilang_title');
                    if (desc) desc.textContent = this.t('feature_multilang_desc');
                    break;
                case 2: // Multiple Algorithms
                    if (title) title.textContent = this.t('feature_algorithms_title');
                    if (desc) desc.textContent = this.t('feature_algorithms_desc');
                    break;
                case 3: // Password Protection
                    if (title) title.textContent = this.t('feature_password_title');
                    if (desc) desc.textContent = this.t('feature_password_desc');
                    break;
                case 4: // Crypto Wallet Support
                    if (title) title.textContent = this.t('feature_crypto_title');
                    if (desc) desc.textContent = this.t('feature_crypto_desc');
                    break;
                case 5: // Easy to Use
                    if (title) title.textContent = this.t('feature_usability_title');
                    if (desc) desc.textContent = this.t('feature_usability_desc');
                    break;
            }
        });
        
        // 更新对比部分标题
        const comparisonTitle = document.querySelector('#about .comparison-title');
        if (comparisonTitle) {
            comparisonTitle.textContent = this.t('comparison_title');
        }
        
        // 更新对比表格头部
        const featureHeader = document.querySelector('#about .comparison-feature-header');
        if (featureHeader) featureHeader.textContent = this.t('comparison_feature_header');
        
        const cloakHeader = document.querySelector('#about .comparison-cloak-header');
        if (cloakHeader) cloakHeader.textContent = this.t('comparison_cloak_header');
        
        const othersHeader = document.querySelector('#about .comparison-others-header');
        if (othersHeader) othersHeader.textContent = this.t('comparison_others_header');
        
        // 更新对比表格内容
        const browserBased = document.querySelector('#about .comparison-browser-based');
        if (browserBased) browserBased.textContent = this.t('comparison_browser_based');
        
        const noUpload = document.querySelector('#about .comparison-no-upload');
        if (noUpload) noUpload.textContent = this.t('comparison_no_upload');
        
        const multiAlgo = document.querySelector('#about .comparison-multi-algo');
        if (multiAlgo) multiAlgo.textContent = this.t('comparison_multi_algo');
        
        const cryptoSupport = document.querySelector('#about .comparison-crypto-support');
        if (cryptoSupport) cryptoSupport.textContent = this.t('comparison_crypto_support');
        
        const multilang = document.querySelector('#about .comparison-multilang');
        if (multilang) multilang.textContent = this.t('comparison_multilang');
        
        const free = document.querySelector('#about .comparison-free');
        if (free) free.textContent = this.t('comparison_free');
        
        // 更新CTA部分
        const ctaTitle = document.querySelector('#about .cta-title');
        if (ctaTitle) {
            ctaTitle.textContent = this.t('cta_title');
        }
        
        const ctaDescription = document.querySelector('#about .cta-description');
        if (ctaDescription) {
            ctaDescription.textContent = this.t('cta_description');
        }
        
        // 更新CTA按钮
        const ctaEncodeBtn = document.querySelector('#about .cta-encode');
        if (ctaEncodeBtn) {
            ctaEncodeBtn.textContent = this.t('cta_encode');
        }
        
        const ctaTutorialBtn = document.querySelector('#about .cta-tutorial');
        if (ctaTutorialBtn) {
            ctaTutorialBtn.textContent = this.t('cta_tutorial');
        }
    },
    
    /**
     * 更新编码标签页的翻译
     */
    updateEncodeTab: function() {
        const encodeTab = document.getElementById('encode');
        if (!encodeTab) return;
        
        // 更新标题和描述
        document.getElementById('encode-title').textContent = this.t('encode_title');
        document.getElementById('encode-description').textContent = this.t('encode_description');
        
        // 更新表单标签
        document.getElementById('label-encode-image').textContent = this.t('select_image');
        document.getElementById('label-secret-message').textContent = this.t('secret_message');
        document.getElementById('label-encode-password').textContent = this.t('password_protection');
        document.getElementById('label-encode-algorithm').textContent = this.t('steg_algorithm');
        
        // 更新拖放区域文本
        document.getElementById('drop-message-text').textContent = this.t('drop_message');
        
        // 更新文本区域占位符
        const secretMessage = encodeTab.querySelector('#secret-message');
        if (secretMessage) secretMessage.placeholder = this.t('secret_message_placeholder');
        
        // 更新密码输入框
        const encodePassword = encodeTab.querySelector('#encode-password');
        if (encodePassword) encodePassword.placeholder = this.t('password_placeholder');
        
        // 更新密码帮助文本
        document.getElementById('encode-password-help').textContent = this.t('password_help');
        
        // 更新显示密码按钮
        const togglePassword = encodeTab.querySelector('#toggle-encode-password');
        if (togglePassword) togglePassword.textContent = this.t('show_password');
        
        // 更新算法选择下拉菜单
        const algorithmSelect = encodeTab.querySelector('#encode-algorithm');
        if (algorithmSelect) {
            const options = algorithmSelect.querySelectorAll('option');
            options.forEach(option => {
                if (option.value === 'lsb') option.textContent = this.t('algo_lsb');
                else if (option.value === 'dct') option.textContent = this.t('algo_dct');
                else if (option.value === 'patchwork') option.textContent = this.t('algo_patchwork');
            });
        }
        
        // 更新自动清除复选框
        document.getElementById('auto-clear-text').textContent = this.t('auto_clear');
        
        // 更新编码按钮
        const encodeBtn = encodeTab.querySelector('#encode-btn');
        if (encodeBtn) encodeBtn.textContent = this.t('encode_btn');
        
        // 更新结果标题
        document.getElementById('encoding-result-title').textContent = this.t('encoding_result');
        
        // 更新下载按钮
        const downloadBtn = encodeTab.querySelector('#download-btn');
        if (downloadBtn) downloadBtn.textContent = this.t('download_btn');
    },
    
    /**
     * 更新解码标签页的翻译
     */
    updateDecodeTab: function() {
        const decodeTab = document.getElementById('decode');
        if (!decodeTab) return;
        
        // 更新标题和描述
        document.getElementById('decode-title').textContent = this.t('decode_title');
        document.getElementById('decode-description').textContent = this.t('decode_description');
        
        // 更新表单标签
        document.getElementById('label-decode-image').textContent = this.t('select_image');
        document.getElementById('label-decode-password').textContent = this.t('decode_password');
        document.getElementById('label-decode-algorithm').textContent = this.t('steg_algorithm');
        
        // 更新拖放区域文本
        document.getElementById('decode-drop-message').textContent = this.t('drop_message');
        
        // 更新密码输入框
        const decodePassword = decodeTab.querySelector('#decode-password');
        if (decodePassword) decodePassword.placeholder = this.t('decode_password_placeholder');
        
        // 更新显示密码按钮
        const togglePassword = decodeTab.querySelector('#toggle-decode-password');
        if (togglePassword) togglePassword.textContent = this.t('show_password');
        
        // 更新算法选择下拉菜单
        const algorithmSelect = decodeTab.querySelector('#decode-algorithm');
        if (algorithmSelect) {
            const options = algorithmSelect.querySelectorAll('option');
            options.forEach(option => {
                if (option.value === 'lsb') option.textContent = this.t('algo_lsb');
                else if (option.value === 'dct') option.textContent = this.t('algo_dct');
                else if (option.value === 'patchwork') option.textContent = this.t('algo_patchwork');
                else if (option.value === 'auto') option.textContent = this.t('algo_auto');
            });
        }
        
        // 更新解码按钮
        const decodeBtn = decodeTab.querySelector('#decode-btn');
        if (decodeBtn) decodeBtn.textContent = this.t('decode_btn');
        
        // 更新检查水印按钮
        const checkWatermarkBtn = decodeTab.querySelector('#check-watermark-btn');
        if (checkWatermarkBtn) checkWatermarkBtn.textContent = this.t('check_watermark');
        
        // 更新结果标题
        document.getElementById('decoding-result-title').textContent = this.t('decoding_result');
        
        // 更新复制按钮
        const copyBtn = decodeTab.querySelector('#copy-btn');
        if (copyBtn) copyBtn.textContent = this.t('copy_btn');
        
        // 更新生成二维码按钮
        const generateQrBtn = decodeTab.querySelector('#generate-qr-btn');
        if (generateQrBtn) generateQrBtn.textContent = this.t('generate_qr');
        
        // 更新下载二维码按钮
        const downloadQrBtn = decodeTab.querySelector('#download-qr-btn');
        if (downloadQrBtn) downloadQrBtn.textContent = this.t('download_qr');
    },
    
    /**
     * 更新加密钱包标签页的翻译
     */
    updateCryptoTab: function() {
        const cryptoTab = document.getElementById('crypto');
        if (!cryptoTab) return;
        
        // 更新标题和描述
        document.getElementById('crypto-title').textContent = this.t('crypto_title');
        document.getElementById('crypto-description').textContent = this.t('crypto_description');
        
        // 更新表单标签
        const labels = cryptoTab.querySelectorAll('label');
        labels.forEach(label => {
            if (label.getAttribute('for') === 'crypto-type') {
                label.textContent = this.t('select_type');
            } else if (label.getAttribute('for') === 'private-key') {
                label.textContent = this.t('private_key_label');
            } else if (label.getAttribute('for') === 'recovery-phrase') {
                label.textContent = this.t('recovery_phrase_label');
            } else if (label.getAttribute('for') === 'phrase-length') {
                label.textContent = this.t('phrase_length');
            } else if (label.getAttribute('for') === 'crypto-password') {
                label.textContent = this.t('crypto_password');
            } else if (label.getAttribute('for') === 'crypto-image') {
                label.textContent = this.t('select_image');
            } else if (label.getAttribute('for') === 'crypto-algorithm') {
                label.textContent = this.t('steg_algorithm');
            } else if (label.getAttribute('for') === 'crypto-decode-image') {
                label.textContent = this.t('select_image');
            } else if (label.getAttribute('for') === 'crypto-decode-password') {
                label.textContent = this.t('decode_password');
            } else if (label.getAttribute('for') === 'crypto-decode-algorithm') {
                label.textContent = this.t('steg_algorithm');
            }
        });
        
        // 更新类型选择下拉菜单
        const typeSelect = cryptoTab.querySelector('#crypto-type');
        if (typeSelect) {
            const options = typeSelect.querySelectorAll('option');
            options.forEach(option => {
                if (option.value === 'private-key') option.textContent = this.t('private_key');
                else if (option.value === 'recovery-phrase') option.textContent = this.t('recovery_phrase');
            });
        }
        
        // 更新私钥输入框
        const privateKey = cryptoTab.querySelector('#private-key');
        if (privateKey) privateKey.placeholder = this.t('private_key_placeholder');
        
        // 更新短语长度选择下拉菜单
        const phraseLength = cryptoTab.querySelector('#phrase-length');
        if (phraseLength) {
            const options = phraseLength.querySelectorAll('option');
            options.forEach(option => {
                if (option.value === '12') option.textContent = this.t('12_words');
                else if (option.value === '24') option.textContent = this.t('24_words');
            });
        }
        
        // 更新验证短语按钮
        const validatePhraseBtn = cryptoTab.querySelector('#validate-phrase-btn');
        if (validatePhraseBtn) validatePhraseBtn.textContent = this.t('validate_phrase');
        
        // 更新显示密码按钮
        const toggleKeyVisibility = cryptoTab.querySelector('#toggle-key-visibility');
        if (toggleKeyVisibility) toggleKeyVisibility.textContent = this.t('show_password');
        
        const togglePhraseVisibility = cryptoTab.querySelector('#toggle-phrase-visibility');
        if (togglePhraseVisibility) togglePhraseVisibility.textContent = this.t('show_password');
        
        const toggleCryptoPassword = cryptoTab.querySelector('#toggle-crypto-password');
        if (toggleCryptoPassword) toggleCryptoPassword.textContent = this.t('show_password');
        
        const toggleCryptoDecodePassword = cryptoTab.querySelector('#toggle-crypto-decode-password');
        if (toggleCryptoDecodePassword) toggleCryptoDecodePassword.textContent = this.t('show_password');
        
        // 更新密码输入框
        const cryptoPassword = cryptoTab.querySelector('#crypto-password');
        if (cryptoPassword) cryptoPassword.placeholder = this.t('crypto_password_placeholder');
        
        const cryptoDecodePassword = cryptoTab.querySelector('#crypto-decode-password');
        if (cryptoDecodePassword) cryptoDecodePassword.placeholder = this.t('decode_password_placeholder');
        
        // 更新密码帮助文本
        const helpText = cryptoTab.querySelector('.help-text');
        if (helpText) helpText.textContent = this.t('crypto_password_help');
        
        // 更新水印警告
        const watermarkWarning = cryptoTab.querySelector('#watermark-warning');
        if (watermarkWarning) watermarkWarning.textContent = this.t('watermark_warning');
        
        // 更新算法选择下拉菜单
        const algorithmSelect = cryptoTab.querySelector('#crypto-algorithm');
        if (algorithmSelect) {
            const options = algorithmSelect.querySelectorAll('option');
            options.forEach(option => {
                if (option.value === 'lsb') option.textContent = this.t('algo_lsb');
                else if (option.value === 'dct') option.textContent = this.t('algo_dct');
                else if (option.value === 'patchwork') option.textContent = this.t('algo_patchwork');
            });
        }
        
        const decodeAlgorithmSelect = cryptoTab.querySelector('#crypto-decode-algorithm');
        if (decodeAlgorithmSelect) {
            const options = decodeAlgorithmSelect.querySelectorAll('option');
            options.forEach(option => {
                if (option.value === 'lsb') option.textContent = this.t('algo_lsb');
                else if (option.value === 'dct') option.textContent = this.t('algo_dct');
                else if (option.value === 'patchwork') option.textContent = this.t('algo_patchwork');
                else if (option.value === 'auto') option.textContent = this.t('algo_auto');
            });
        }
        
        // 更新拖放区域文本
        const dropMessages = cryptoTab.querySelectorAll('.drop-message p');
        dropMessages.forEach(message => {
            message.textContent = this.t('drop_message');
        });
        
        // 更新自动清除复选框
        const autoClearLabel = document.getElementById('auto-clear-crypto-text');
        if (autoClearLabel) autoClearLabel.textContent = this.t('auto_clear');
        
        // 更新编码按钮
        const cryptoEncodeBtn = cryptoTab.querySelector('#crypto-encode-btn');
        if (cryptoEncodeBtn) cryptoEncodeBtn.textContent = this.t('crypto_encode_btn');
        
        // 更新编码结果标题
        const encodeResultTitle = cryptoTab.querySelector('#crypto-encode-result h3');
        if (encodeResultTitle) encodeResultTitle.textContent = this.t('encoding_result');
        
        // 更新下载按钮
        const cryptoDownloadBtn = cryptoTab.querySelector('#crypto-download-btn');
        if (cryptoDownloadBtn) cryptoDownloadBtn.textContent = this.t('download_btn');
        
        // 更新解码部分标题和描述
        const decodeTitle = cryptoTab.querySelector('h3:not(#crypto-encode-result h3, #crypto-decode-result h3)');
        if (decodeTitle) decodeTitle.textContent = this.t('crypto_decode_title');
        
        const decodeDescription = cryptoTab.querySelector('h3:not(#crypto-encode-result h3, #crypto-decode-result h3) + p');
        if (decodeDescription) decodeDescription.textContent = this.t('crypto_decode_description');
        
        // 更新解码按钮
        const cryptoDecodeBtn = cryptoTab.querySelector('#crypto-decode-btn');
        if (cryptoDecodeBtn) cryptoDecodeBtn.textContent = this.t('crypto_decode_btn');
        
        // 更新解码结果标题
        const decodeResultTitle = cryptoTab.querySelector('#crypto-decode-result h3');
        if (decodeResultTitle) decodeResultTitle.textContent = this.t('decoding_result');
        
        // 更新复制按钮
        const cryptoCopyBtn = cryptoTab.querySelector('#crypto-copy-btn');
        if (cryptoCopyBtn) cryptoCopyBtn.textContent = this.t('copy_btn');
        
        // 更新生成二维码按钮
        const cryptoGenerateQrBtn = cryptoTab.querySelector('#crypto-generate-qr-btn');
        if (cryptoGenerateQrBtn) cryptoGenerateQrBtn.textContent = this.t('generate_qr');
        
        // 更新下载二维码按钮
        const cryptoDownloadQrBtn = cryptoTab.querySelector('#crypto-download-qr-btn');
        if (cryptoDownloadQrBtn) cryptoDownloadQrBtn.textContent = this.t('download_qr');
    },
    
    /**
     * 更新教程标签页的内容
     */
    updateTutorialTab: function() {
        const tutorialTab = document.getElementById('tutorial');
        if (!tutorialTab) return;
        // 更新标题
        document.getElementById('tutorial-title').textContent = this.t('tutorial_title');
        
        // 更新小标题
        document.getElementById('what-is-steg').textContent = this.t('what_is_steg');
        document.getElementById('features').textContent = this.t('features');
        document.getElementById('how-to-use').textContent = this.t('how_to_use');
        document.getElementById('security-considerations').textContent = this.t('security_considerations');
        
        // 更新隐写术定义
        const stegDefinition = tutorialTab.querySelector('#steg-definition');
        if (stegDefinition) stegDefinition.textContent = this.t('steg_definition');
        
        // 更新功能列表
        const featureTextHiding = tutorialTab.querySelector('#feature-text-hiding');
        if (featureTextHiding) featureTextHiding.innerHTML = '<strong>' + this.t('feature_text_hiding').split(' - ')[0] + '</strong> - ' + this.t('feature_text_hiding').split(' - ')[1];
        
        const featureCrypto = tutorialTab.querySelector('#feature-crypto');
        if (featureCrypto) featureCrypto.innerHTML = '<strong>' + this.t('feature_crypto').split(' - ')[0] + '</strong> - ' + this.t('feature_crypto').split(' - ')[1];
        
        const featureBrowser = tutorialTab.querySelector('#feature-browser');
        if (featureBrowser) featureBrowser.innerHTML = '<strong>' + this.t('feature_browser').split(' - ')[0] + '</strong> - ' + this.t('feature_browser').split(' - ')[1];
        
        // 更新使用说明
        const howToUseTitle = tutorialTab.querySelector('#how-to-use');
        if (howToUseTitle) howToUseTitle.textContent = this.t('how_to_use');
        
        // 更新编码说明
        const encodingInstructions = tutorialTab.querySelector('#encoding-instructions');
        if (encodingInstructions) {
            encodingInstructions.firstChild.textContent = this.t('encoding_instructions') + ' ';
            const encodingSteps = encodingInstructions.querySelectorAll('ul li');
            if (encodingSteps.length >= 4) {
                encodingSteps[0].textContent = this.t('encoding_step1');
                encodingSteps[1].textContent = this.t('encoding_step2');
                encodingSteps[2].textContent = this.t('encoding_step3');
                encodingSteps[3].textContent = this.t('encoding_step4');
            }
        }
        
        // 更新解码说明
        const decodingInstructions = tutorialTab.querySelector('#decoding-instructions');
        if (decodingInstructions) {
            decodingInstructions.firstChild.textContent = this.t('decoding_instructions') + ' ';
            const decodingSteps = decodingInstructions.querySelectorAll('ul li');
            if (decodingSteps.length >= 3) {
                decodingSteps[0].textContent = this.t('decoding_step1');
                decodingSteps[1].textContent = this.t('decoding_step2');
                decodingSteps[2].textContent = this.t('decoding_step3');
            }
        }
        
        // 更新加密钱包说明
        const cryptoInstructions = tutorialTab.querySelector('#crypto-instructions');
        if (cryptoInstructions) {
            cryptoInstructions.firstChild.textContent = this.t('crypto_instructions') + ' ';
            const cryptoSteps = cryptoInstructions.querySelectorAll('ul li');
            if (cryptoSteps.length >= 3) {
                cryptoSteps[0].textContent = this.t('crypto_step1');
                cryptoSteps[1].textContent = this.t('crypto_step2');
                cryptoSteps[2].textContent = this.t('crypto_step3');
            }
        }
        
        // 更新安全警告
        document.getElementById('security-warning-title').innerHTML = '<strong>' + this.t('security_warning') + '</strong>';
        
        const securityWarningItems = tutorialTab.querySelectorAll('.security-warning ul li');
        if (securityWarningItems.length >= 5) {
            securityWarningItems[0].textContent = this.t('security_warning1');
            securityWarningItems[1].textContent = this.t('security_warning2');
            securityWarningItems[2].textContent = this.t('security_warning3');
            securityWarningItems[3].textContent = this.t('security_warning4');
            securityWarningItems[4].textContent = this.t('security_warning5');
        }
        
        // 添加安全最佳实践部分
        this.addBestPracticesSection();
        
        // 根据用户要求，教程页面不需要包含FAQ部分
        // this.addFAQSection(tutorialTab);
        
        // 故障排除部分已移至FAQ部分，教程部分不再显示
    },
    
    /**
     * 更新安全最佳实践部分
     */
    addBestPracticesSection: function() {
        const tutorialTab = document.getElementById('tutorial');
        if (!tutorialTab) return;
        
        // 获取tutorialContent元素
        const tutorialContent = tutorialTab.querySelector('.tutorial-content');
        if (!tutorialContent) return;
        
        // 获取安全最佳实践容器
        const bestPracticesContainer = tutorialTab.querySelector('.security-best-practices');
        if (!bestPracticesContainer) return;
        
        // 清空容器内容，准备重新生成
        bestPracticesContainer.innerHTML = '';
        
        // 更新已存在的安全最佳实践部分标题
        const securityBestPractices = tutorialTab.querySelector('#security-best-practices');
        if (securityBestPractices) {
            securityBestPractices.textContent = this.t('best_practices_title');
        }
        
        // 获取当前语言
        const currentLang = this.currentLanguage;
        
        // 创建各个最佳实践部分
        // 1. 选择合适的图像
        const choosingRightImageDiv = document.createElement('div');
        choosingRightImageDiv.className = 'best-practice-item';
        const bestPractice1 = this.t('best_practice1').split('。');
        let imageListItems = '';
        if (bestPractice1.length >= 3) {
            imageListItems = `
                <li>${bestPractice1[0]}。</li>
                <li>${bestPractice1[1]}。</li>
                <li>${bestPractice1[2]}</li>
            `;
        } else {
            imageListItems = `<li>${this.t('best_practice1')}</li>`;
        }
        choosingRightImageDiv.innerHTML = `
            <h4 id="choosing-right-image">${this.t('best_practice1_title')}</h4>
            <ul>
                ${imageListItems}
            </ul>
        `;
        bestPracticesContainer.appendChild(choosingRightImageDiv);
        
        // 2. 密码保护
        const passwordProtectionDiv = document.createElement('div');
        passwordProtectionDiv.className = 'best-practice-item';
        passwordProtectionDiv.innerHTML = `
            <h4 id="password-protection">${this.t('best_practice2_title')}</h4>
            <ul>
                <li>${this.t('best_practice2')}</li>
            </ul>
        `;
        bestPracticesContainer.appendChild(passwordProtectionDiv);
        
        // 3. 安全存储和传输
        const secureStorageDiv = document.createElement('div');
        secureStorageDiv.className = 'best-practice-item';
        const bestPractice3 = this.t('best_practice3').split('。');
        let storageListItems = '';
        if (bestPractice3.length >= 4) {
            storageListItems = `
                <li>${bestPractice3[0]}。</li>
                <li>${bestPractice3[1]}。</li>
                <li>${bestPractice3[2]}。</li>
                <li>${bestPractice3[3]}</li>
            `;
        } else {
            storageListItems = `<li>${this.t('best_practice3')}</li>`;
        }
        secureStorageDiv.innerHTML = `
            <h4 id="secure-storage">${this.t('best_practice3_title')}</h4>
            <ul>
                ${storageListItems}
            </ul>
        `;
        bestPracticesContainer.appendChild(secureStorageDiv);
        
        // 4. 避免压缩
        const avoidCompressionDiv = document.createElement('div');
        avoidCompressionDiv.className = 'best-practice-item';
        avoidCompressionDiv.innerHTML = `
            <h4 id="avoid-compression">${this.t('best_practice4_title')}</h4>
            <ul>
                <li>${this.t('best_practice4')}</li>
            </ul>
        `;
        bestPracticesContainer.appendChild(avoidCompressionDiv);
        
        // 5. 多重备份
        const multipleBackupsDiv = document.createElement('div');
        multipleBackupsDiv.className = 'best-practice-item';
        multipleBackupsDiv.innerHTML = `
            <h4 id="multiple-backups">${this.t('best_practice5_title')}</h4>
            <ul>
                <li>${this.t('best_practice5')}</li>
            </ul>
        `;
        bestPracticesContainer.appendChild(multipleBackupsDiv);
        
        // 6. 额外保护层
        const additionalProtectionDiv = document.createElement('div');
        additionalProtectionDiv.className = 'best-practice-item';
        const bestPractice6 = this.t('best_practice6').split('。');
        let protectionListItems = '';
        if (bestPractice6.length >= 4) {
            protectionListItems = `
                <li>${bestPractice6[0]}。</li>
                <li>${bestPractice6[1]}。</li>
                <li>${bestPractice6[2]}。</li>
                <li>${bestPractice6[3]}</li>
            `;
        } else {
            protectionListItems = `<li>${this.t('best_practice6')}</li>`;
        }
        additionalProtectionDiv.innerHTML = `
            <h4 id="additional-protection">${this.t('best_practice6_title')}</h4>
            <ul>
                ${protectionListItems}
            </ul>
        `;
        bestPracticesContainer.appendChild(additionalProtectionDiv);
    },
    
    /**
     * 添加FAQ部分 - 根据用户要求，教程页面不需要包含FAQ
     */
    addFAQSection: function() {
        // 根据用户要求，教程页面不需要包含FAQ，此函数不再添加FAQ到教程页面
        return;
    },
    
    /**
     * 更新故障排除部分
     */
    addTroubleshootingSection: function() {
        // 故障排除指南已移至FAQ部分，教程部分不再显示故障排除指南
        return;
    },
    
    /**
     * 初始化FAQ标签页
     * 为独立的FAQ标签页添加内容和交互功能
     */
    updateFAQTab: function() {
        // 获取FAQ标签页
        const faqTab = document.querySelector('#faq.tab-pane');
        if (!faqTab) return;
        
        // 更新标题
        document.getElementById('faq-title').textContent = this.t('faq_title');
        
        // 创建FAQ内容
        const faqContent = faqTab.querySelector('.faq-content');
        if (!faqContent) return;
        
        faqContent.innerHTML = `
            <div class="faq-container">
                <div class="faq-item">
                    <div class="faq-question">${this.t('faq1_question')}</div>
                    <div class="faq-answer">${this.t('faq1_answer')}</div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">${this.t('faq2_question')}</div>
                    <div class="faq-answer">${this.t('faq2_answer')}</div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">${this.t('faq3_question')}</div>
                    <div class="faq-answer">${this.t('faq3_answer')}</div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">${this.t('faq4_question')}</div>
                    <div class="faq-answer">${this.t('faq4_answer')}</div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">${this.t('faq5_question')}</div>
                    <div class="faq-answer">${this.t('faq5_answer')}</div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">${this.t('faq6_question')}</div>
                    <div class="faq-answer">${this.t('faq6_answer')}</div>
                </div>
            </div>
            
            <h3>${this.t('troubleshooting_title')}</h3>
            <div class="troubleshooting-container">
                <div class="troubleshooting-item">
                    <h4>${this.t('issue1_title')}</h4>
                    <p>${this.t('issue1_solution')}</p>
                </div>
                <div class="troubleshooting-item">
                    <h4>${this.t('issue2_title')}</h4>
                    <p>${this.t('issue2_solution')}</p>
                </div>
                <div class="troubleshooting-item">
                    <h4>${this.t('issue3_title')}</h4>
                    <p>${this.t('issue3_solution')}</p>
                </div>
                <div class="troubleshooting-item">
                    <h4>${this.t('issue4_title')}</h4>
                    <p>${this.t('issue4_solution')}</p>
                </div>
                <div class="troubleshooting-item">
                    <h4>${this.t('issue5_title')}</h4>
                    <p>${this.t('issue5_solution')}</p>
                </div>
            </div>
        `;
        
        // 添加FAQ交互功能
        const faqItems = faqContent.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            // 初始状态下隐藏答案
            answer.style.display = 'none';
            
            // 添加点击事件切换答案显示/隐藏
            question.addEventListener('click', () => {
                if (answer.style.display === 'none') {
                    answer.style.display = 'block';
                    question.classList.add('active');
                } else {
                    answer.style.display = 'none';
                    question.classList.remove('active');
                }
            });
        });
    }
};

// 页面加载完成后初始化多语言支持
document.addEventListener('DOMContentLoaded', function() {
    I18N.init();
});
