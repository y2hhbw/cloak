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
    translations: {
        // 英文翻译
        'en': {
            // 通用
            'app_title': 'cloak: a better image steganography tool',
            'app_description': 'Hide text messages in images or extract hidden text from images. All operations are performed in your browser, no data is uploaded.',
            
            // 标签页
            'tab_about': 'Why Better',
            'tab_encode': 'Encode Message',
            'tab_decode': 'Decode Message',
            'tab_crypto': 'Crypto Wallet',
            'tab_tutorial': 'Tutorial',
            'tab_faq': 'FAQ',
            
            // About页面
            'about_title': 'Why cloak is a Better Image Steganography Tool',
            'about_subtitle': 'The most secure, feature-rich, and user-friendly steganography tool available online',
            'feature_security_title': 'Maximum Security',
            'feature_security_desc': 'All operations happen in your browser. No data is ever uploaded to any server, ensuring complete privacy and security.',
            'feature_multilang_title': 'Multi-Language Support',
            'feature_multilang_desc': 'Available in 8 languages including English, Chinese, French, Japanese, Spanish, German, and Russian.',
            'feature_algorithms_title': 'Multiple Algorithms',
            'feature_algorithms_desc': 'Supports LSB, DCT, and Patchwork steganography algorithms with auto-detection for maximum compatibility.',
            'feature_password_title': 'Password Protection',
            'feature_password_desc': 'Optional password encryption adds an extra layer of security to your hidden messages.',
            'feature_crypto_title': 'Crypto Wallet Support',
            'feature_crypto_desc': 'Specialized features for securely hiding cryptocurrency private keys and recovery phrases.',
            'feature_usability_title': 'Easy to Use',
            'feature_usability_desc': 'Intuitive interface with drag-and-drop support, real-time validation, and comprehensive tutorials.',
            'comparison_title': 'Why Choose cloak Over Other Tools?',
            'comparison_feature_header': 'Feature',
            'comparison_cloak_header': 'cloak',
            'comparison_others_header': 'Other Tools',
            'comparison_browser_based': 'Browser-based',
            'comparison_no_upload': 'No Data Upload',
            'comparison_multi_algo': 'Multiple Algorithms',
            'comparison_crypto_support': 'Crypto Wallet Support',
            'comparison_multilang': 'Multi-language',
            'comparison_free': 'Free & Open Source',
            'cta_title': 'Ready to Get Started?',
            'cta_description': 'Start hiding your messages securely with the most advanced steganography tool available.',
            'cta_encode': 'Start Encoding',
            'cta_tutorial': 'View Tutorial',
            
            // 编码部分
            'encode_title': 'Hide Message in Image',
            'encode_description': 'Select an image, enter the text you want to hide, then click the "Encode" button. Save the generated image, it will contain your hidden message.',
            'select_image': 'Select Image:',
            'drop_message': 'Drop image here or click to select file',
            'secret_message': 'Secret Message:',
            'secret_message_placeholder': 'Enter text to hide...',
            'password_protection': 'Password Protection (Optional):',
            'password_placeholder': 'Enter password to encrypt your message...',
            'password_help': 'Adding a password will encrypt your message for additional security.',
            'show_password': 'Show',
            'hide_password': 'Hide',
            'steg_algorithm': 'Steganography Algorithm:',
            'algo_lsb': 'LSB (Least Significant Bit)',
            'algo_dct': 'DCT (Discrete Cosine Transform)',
            'algo_patchwork': 'Patchwork',
            'algo_auto': 'Auto Detect',
            'auto_clear': 'Auto-clear sensitive data after encoding',
            'encode_btn': 'Encode',
            'encoding_result': 'Encoding Result',
            'download_btn': 'Download Image',
            
            // 解码部分
            'decode_title': 'Extract Hidden Message',
            'decode_description': 'Select an image containing a hidden message, then click the "Decode" button to extract the hidden text.',
            'decode_password': 'Password (if required):',
            'decode_password_placeholder': 'Enter password if the message is encrypted...',
            'decode_btn': 'Decode',
            'check_watermark': 'Check for Hidden Content',
            'decoding_result': 'Decoding Result',
            'copy_btn': 'Copy Text',
            'generate_qr': 'Generate QR Code',
            'download_qr': 'Download QR Code',
            
            // 加密钱包部分
            'crypto_title': 'Crypto Wallet Protection',
            'crypto_description': 'Securely hide your cryptocurrency wallet private keys or recovery phrases in an image. Never share these images on public platforms.',
            'select_type': 'Select Type:',
            'private_key': 'Private Key',
            'recovery_phrase': 'Recovery Phrase (12/24 words)',
            'private_key_label': 'Private Key:',
            'private_key_placeholder': 'Enter your private key...',
            'recovery_phrase_label': 'Recovery Phrase:',
            'phrase_length': 'Phrase Length:',
            '12_words': '12 words',
            '24_words': '24 words',
            'validate_phrase': 'Validate Phrase',
            'crypto_password': 'Password Protection (Optional):',
            'crypto_password_placeholder': 'Enter password to encrypt your wallet info...',
            'crypto_password_help': 'Adding a password will encrypt your wallet information for additional security.',
            'watermark_warning': 'Warning: This image already contains hidden data. Encoding new data will overwrite it.',
            'crypto_encode_btn': 'Encode Wallet Info',
            'crypto_decode_title': 'Decode Wallet Information',
            'crypto_decode_description': 'Extract previously hidden wallet information from an image.',
            'crypto_decode_btn': 'Decode Wallet Info',
            
            // 教程部分
            'tutorial_title': 'Tutorial & Usage Guidelines',
            'what_is_steg': 'What is Steganography?',
            'steg_definition': 'Steganography is the practice of hiding information within other non-secret data or a physical object to avoid detection. This tool allows you to hide text messages inside images.',
            'features': 'Features',
            'feature_text_hiding': 'Text Hiding - Hide any text message inside an image',
            'feature_crypto': 'Crypto Wallet Protection - Securely store your wallet keys and recovery phrases',
            'feature_browser': 'Browser-based - All operations happen in your browser, no data is sent to any server',
            'how_to_use': 'How to Use',
            'encoding_instructions': 'Encoding a message:',
            'encoding_step1': 'Select the "Encode Message" tab',
            'encoding_step2': 'Upload an image (preferably PNG format)',
            'encoding_step3': 'Enter your secret text',
            'encoding_step4': 'Click "Encode" and download the resulting image',
            'decoding_instructions': 'Decoding a message:',
            'decoding_step1': 'Select the "Decode Message" tab',
            'decoding_step2': 'Upload an image containing a hidden message',
            'decoding_step3': 'Click "Decode" to reveal the hidden text',
            'crypto_instructions': 'Crypto Wallet Protection:',
            'crypto_step1': 'Select the "Crypto Wallet" tab',
            'crypto_step2': 'Enter your private key or recovery phrase',
            'crypto_step3': 'Upload an image and encode your sensitive information',
            
            // 安全考虑
            'security_considerations': 'Security Considerations',
            'security_warning': 'Important Security Warnings:',
            'security_warning1': 'This tool does not encrypt your data, it only hides it. Anyone with access to the image and knowledge of steganography can potentially extract your message.',
            'security_warning2': 'Never share steganographic images containing sensitive information on social media or public platforms, as image compression might destroy the hidden data.',
            'security_warning3': 'Always keep multiple backups of your crypto wallet information through different secure methods.',
            'security_warning4': 'For maximum security, use this tool on an offline computer when hiding sensitive financial information.',
            'security_warning5': 'The tool has a limited capacity for hiding data based on the image size. Larger images can store more data.',
            
            // 安全最佳实践
            'best_practices_title': 'Security Best Practices',
            'best_practice1_title': 'Choose the Right Image',
            'best_practice1': 'Use high-resolution images with complex patterns or many colors to better hide your data. Prefer PNG format over JPEG, as JPEG compression can destroy hidden data. Avoid using popular or recognizable images that might attract attention.',
            'best_practice2_title': 'Password Protection',
            'best_practice2': 'Always use strong, unique passwords when encrypting sensitive information. Combine uppercase, lowercase, numbers, and special characters.',
            'best_practice3_title': 'Secure Storage and Transmission',
            'best_practice3': 'Store steganographic images on encrypted drives or secure cloud storage with strong passwords. When transmitting steganographic images, use encrypted channels like Signal, ProtonMail, or other end-to-end encrypted services. Consider using a different transmission channel for the password than the one used for the image. Delete metadata from images before encoding sensitive information to remove potential identifying information.',
            'best_practice4_title': 'Avoid Compression',
            'best_practice4': 'Never upload steganographic images to social media or messaging platforms that compress images, as this will likely destroy the hidden data.',
            'best_practice5_title': 'Multiple Backups',
            'best_practice5': 'Always maintain multiple backups of your sensitive information using different methods, not just steganography.',
            'best_practice6_title': 'Additional Protection Layers',
            'best_practice6': 'Always use the password protection feature for sensitive information. Consider encrypting your message with PGP or other encryption tools before hiding it in an image. For cryptocurrency keys, use BIP39 passphrase (25th word) as an additional security layer. Regularly change the images you use for storing sensitive information.',
            
            // FAQ部分
            'faq_title': 'Frequently Asked Questions',
            'faq1_question': 'How much data can I hide in an image?',
            'faq1_answer': 'The amount of data depends on the image size. As a rule of thumb, you can hide approximately 10% of the image size in bytes. For example, a 1MB image can hide about 100KB of text.',
            'faq2_question': 'Will the image look different after hiding data?',
            'faq2_answer': 'When using LSB steganography, changes are usually imperceptible to the human eye. However, technical analysis can detect modifications. The DCT and Patchwork methods offer better resistance to detection.',
            'faq3_question': 'What image formats work best?',
            'faq3_answer': 'PNG is recommended as it uses lossless compression. JPEG is not ideal as its compression algorithm can destroy hidden data. BMP and TIFF also work well but result in larger file sizes.',
            'faq4_question': 'Is steganography the same as encryption?',
            'faq4_answer': 'No. Steganography hides the existence of data, while encryption scrambles data to make it unreadable. This tool offers both: steganography to hide data and optional password protection to encrypt it.',
            'faq5_question': 'Can I hide files other than text?',
            'faq5_answer': 'This tool is designed for text only. To hide other file types, you would need to convert them to text (e.g., using Base64 encoding) before hiding them.',
            'faq6_question': 'Why does decoding fail sometimes?',
            'faq6_answer': 'Decoding can fail if: the image was compressed after encoding (e.g., by social media), the wrong password was used, the image doesn\'t contain hidden data, or you selected the wrong steganography algorithm.',
            
            // 故障排除
            'troubleshooting_title': 'Troubleshooting Guide',
            'issue1_title': 'Encoding fails or produces corrupted images',
            'issue1_solution': 'Try using a different image, preferably a PNG with higher resolution. Ensure your message isn\'t too large for the image capacity.',
            'issue2_title': 'Decoding returns gibberish or no data',
            'issue2_solution': 'Verify you\'re using the correct password (if one was set). Try the "Auto Detect" algorithm option. Ensure the image hasn\'t been modified or compressed since encoding.',
            'issue3_title': 'Browser crashes during encoding/decoding',
            'issue3_solution': 'This may happen with very large images or messages. Try using smaller images or breaking your message into smaller parts.',
            'issue4_title': 'Recovery phrase validation fails',
            'issue4_solution': 'Ensure all words are spelled correctly and are from the BIP39 wordlist. Check that you\'ve selected the correct phrase length (12 or 24 words).',
            'invalid_bip39_word': 'Not a valid BIP39 word',
            'valid_mnemonic': 'Valid {{count}}-word mnemonic',
            'fill_all_mnemonic_inputs': 'Please fill all mnemonic word inputs',
            'contains_invalid_bip39_words': 'Contains invalid BIP39 words',
            'mnemonic_must_contain': 'Mnemonic must contain {{count}} words',
            'issue5_title': 'Downloaded image doesn\'t contain the hidden message',
            'issue5_solution': 'Make sure you downloaded the image after encoding, not the original. Try encoding again and test decoding before sharing the image.',
            
            // 页脚
            'footer_text': 'This tool runs entirely in your browser. Your images and text are never uploaded to any server.',
            'copyright_text': '© 2023-2024 cloak.',
            'buymeacoffee_text': '☕ Buy me a coffee',
            'language_selector': 'Language:'
        },
        
        // 中文翻译
        'zh': {
            // 通用
            'app_title': 'cloak: 更好的图像隐写工具',
            'app_description': '在图像中隐藏文本信息或从图像中提取隐藏文本。所有操作都在您的浏览器中执行，不会上传任何数据。',
            
            // 标签页
            'tab_about': '为什么更好',
            'tab_encode': '编码信息',
            'tab_decode': '解码信息',
            'tab_crypto': '加密钱包',
            'tab_tutorial': '教程',
            'tab_faq': '常见问题',
            
            // About页面
            'about_title': '为什么cloak是更好的图像隐写工具',
            'about_subtitle': '最安全、功能最丰富、最用户友好的在线隐写工具',
            'feature_security_title': '最高安全性',
            'feature_security_desc': '所有操作都在您的浏览器中进行。没有数据会上传到任何服务器，确保完全的隐私和安全。',
            'feature_multilang_title': '多语言支持',
            'feature_multilang_desc': '支持8种语言，包括中文、英文、法文、日文、西班牙文、德文和俄文。',
            'feature_algorithms_title': '多种算法',
            'feature_algorithms_desc': '支持LSB、DCT和Patchwork隐写算法，具有自动检测功能，确保最大兼容性。',
            'feature_password_title': '密码保护',
            'feature_password_desc': '可选的密码加密为您的隐藏消息增加额外的安全层。',
            'feature_crypto_title': '加密钱包支持',
            'feature_crypto_desc': '专门的功能用于安全隐藏加密货币私钥和恢复短语。',
            'feature_usability_title': '易于使用',
            'feature_usability_desc': '直观的界面，支持拖放、实时验证和全面的教程。',
            'comparison_title': '为什么选择cloak而不是其他工具？',
            'comparison_feature_header': '功能',
            'comparison_cloak_header': 'cloak',
            'comparison_others_header': '其他工具',
            'comparison_browser_based': '基于浏览器',
            'comparison_no_upload': '无数据上传',
            'comparison_multi_algo': '多种算法',
            'comparison_crypto_support': '加密钱包支持',
            'comparison_multilang': '多语言',
            'comparison_free': '免费开源',
            'cta_title': '准备开始了吗？',
            'cta_description': '使用最先进的隐写工具开始安全地隐藏您的消息。',
            'cta_encode': '开始编码',
            'cta_tutorial': '查看教程',
            
            // 编码页面编码部分
            'encode_title': '在图像中隐藏信息',
            'encode_description': '选择一张图片，输入您想要隐藏的文本，然后点击"编码"按钮。保存生成的图像，它将包含您的隐藏信息。',
            'select_image': '选择图像：',
            'drop_message': '拖放图像到此处或点击选择文件',
            'secret_message': '秘密信息：',
            'secret_message_placeholder': '输入要隐藏的文本...',
            'password_protection': '密码保护（可选）：',
            'password_placeholder': '输入密码以加密您的信息...',
            'password_help': '添加密码将为您的信息提供额外的安全保护。',
            'show_password': '显示',
            'hide_password': '隐藏',
            'steg_algorithm': '隐写算法：',
            'algo_lsb': 'LSB（最低有效位）',
            'algo_dct': 'DCT（离散余弦变换）',
            'algo_patchwork': '拼贴法',
            'algo_auto': '自动检测',
            'auto_clear': '编码后自动清除敏感数据',
            'encode_btn': '编码',
            'encoding_result': '编码结果',
            'download_btn': '下载图像',
            
            // 解码部分
            'decode_title': '提取隐藏信息',
            'decode_description': '选择包含隐藏信息的图像，然后点击"解码"按钮提取隐藏的文本。',
            'decode_password': '密码（如需要）：',
            'decode_password_placeholder': '如果信息已加密，请输入密码...',
            'decode_btn': '解码',
            'check_watermark': '检查隐藏内容',
            'decoding_result': '解码结果',
            'copy_btn': '复制文本',
            'generate_qr': '生成二维码',
            'download_qr': '下载二维码',
            
            // 加密钱包部分
            'crypto_title': '加密钱包保护',
            'crypto_description': '安全地隐藏您的加密货币钱包私钥或恢复短语在图像中。切勿在公共平台上共享这些图像。',
            'select_type': '选择类型：',
            'private_key': '私钥',
            'recovery_phrase': '恢复短语（12/24个词）',
            'private_key_label': '私钥：',
            'private_key_placeholder': '输入您的私钥...',
            'recovery_phrase_label': '恢复短语：',
            'phrase_length': '短语长度：',
            '12_words': '12个词',
            '24_words': '24个词',
            'validate_phrase': '验证短语',
            'crypto_password': '密码保护（可选）：',
            'crypto_password_placeholder': '输入密码以加密您的钱包信息...',
            'crypto_password_help': '添加密码将为您的钱包信息提供额外的安全保护。',
            'watermark_warning': '警告：此图像已包含隐藏数据。编码新数据将覆盖它。',
            'crypto_encode_btn': '编码钱包信息',
            'crypto_decode_title': '解码钱包信息',
            'crypto_decode_description': '从图像中提取先前隐藏的钱包信息。',
            'crypto_decode_btn': '解码钱包信息',
            
            // 教程部分
            'tutorial_title': '教程和使用指南',
            'what_is_steg': '什么是隐写术？',
            'steg_definition': '隐写术是在其他非秘密数据或物理对象中隐藏信息以避免被检测的做法。此工具允许您在图像中隐藏文本信息。',
            'features': '功能',
            'feature_text_hiding': '文本隐藏 - 在图像中隐藏任何文本信息',
            'feature_crypto': '加密钱包保护 - 安全存储您的钱包密钥和恢复短语',
            'feature_browser': '基于浏览器 - 所有操作都在您的浏览器中进行，不会向任何服务器发送数据',
            'how_to_use': '如何使用',
            'encoding_instructions': '编码信息：',
            'encoding_step1': '选择"编码信息"标签页',
            'encoding_step2': '上传图像（最好是PNG格式）',
            'encoding_step3': '输入您的秘密文本',
            'encoding_step4': '点击"编码"并下载生成的图像',
            'decoding_instructions': '解码信息：',
            'decoding_step1': '选择"解码信息"标签页',
            'decoding_step2': '上传包含隐藏信息的图像',
            'decoding_step3': '点击"解码"显示隐藏的文本',
            'crypto_instructions': '加密钱包保护：',
            'crypto_step1': '选择"加密钱包"标签页',
            'crypto_step2': '输入您的私钥或恢复短语',
            'crypto_step3': '上传图像并编码您的敏感信息',
            
            // 安全考虑
            'security_considerations': '安全考虑',
            'security_warning': '重要安全警告：',
            'security_warning1': '此工具不会加密您的数据，只会隐藏它。任何能够访问图像并了解隐写术的人都可能提取您的信息。',
            'security_warning2': '切勿在社交媒体或公共平台上共享包含敏感信息的隐写图像，因为图像压缩可能会破坏隐藏的数据。',
            'security_warning3': '始终通过不同的安全方法保留加密钱包信息的多个备份。',
            'security_warning4': '为了最大限度地提高安全性，在隐藏敏感财务信息时，请在离线计算机上使用此工具。',
            'security_warning5': '该工具隐藏数据的容量有限，取决于图像大小。较大的图像可以存储更多数据。',
            
            // 安全最佳实践
            'best_practices_title': '安全最佳实践',
            'best_practice1_title': '选择合适的图像',
            'best_practice1': '使用具有复杂图案或多种颜色的高分辨率图像，以更好地隐藏您的数据。优先选择PNG格式而非JPEG，因为JPEG压缩可能会破坏隐藏的数据。避免使用可能引起注意的流行或可识别的图像。',
            'best_practice2_title': '密码保护',
            'best_practice2': '加密敏感信息时，始终使用强大、独特的密码。结合使用大写字母、小写字母、数字和特殊字符。',
            'best_practice3_title': '安全存储和传输',
            'best_practice3': '将隐写图像存储在使用强密码保护的加密驱动器或安全云存储中。传输隐写图像时，使用Signal、ProtonMail或其他端到端加密服务等加密通道。考虑为密码使用与图像不同的传输通道。在编码敏感信息前删除图像元数据，以移除潜在的识别信息。',
            'best_practice4_title': '避免压缩',
            'best_practice4': '切勿将隐写图像上传到会压缩图像的社交媒体或消息平台，因为这可能会破坏隐藏的数据。',
            'best_practice5_title': '多重备份',
            'best_practice5': '始终使用不同的方法（不仅仅是隐写术）维护敏感信息的多个备份。',
            'best_practice6_title': '额外保护层',
            'best_practice6': '对敏感信息始终使用密码保护功能。考虑在将消息隐藏到图像前使用PGP或其他加密工具对其进行加密。对于加密货币密钥，使用BIP39密码短语（第25个词）作为额外的安全层。定期更换用于存储敏感信息的图像。',
            
            // FAQ部分
            'faq_title': '常见问题解答',
            'faq1_question': '我可以在图像中隐藏多少数据？',
            'faq1_answer': '数据量取决于图像大小。根据经验，您可以隐藏大约10%的图像字节大小。例如，1MB的图像可以隐藏约100KB的文本。',
            'faq2_question': '隐藏数据后图像会看起来不同吗？',
            'faq2_answer': '使用LSB隐写术时，变化通常对人眼不可察觉。但是，技术分析可以检测到修改。DCT和拼贴法提供更好的抗检测能力。',
            'faq3_question': '哪种图像格式效果最好？',
            'faq3_answer': '推荐使用PNG，因为它使用无损压缩。JPEG不理想，因为其压缩算法可能会破坏隐藏的数据。BMP和TIFF也可以，但会导致更大的文件大小。',
            'faq4_question': '隐写术与加密是一样的吗？',
            'faq4_answer': '不是。隐写术隐藏数据的存在，而加密则将数据加扰使其不可读。此工具提供两者：隐写术隐藏数据，可选的密码保护加密数据。',
            'faq5_question': '我可以隐藏文本以外的文件吗？',
            'faq5_answer': '此工具仅设计用于文本。要隐藏其他文件类型，您需要在隐藏之前将它们转换为文本（例如，使用Base64编码）。',
            'faq6_question': '为什么解码有时会失败？',
            'faq6_answer': '解码可能失败的原因：编码后图像被压缩（例如，通过社交媒体），使用了错误的密码，图像不包含隐藏数据，或者您选择了错误的隐写算法。',
            
            // 故障排除
            'troubleshooting_title': '故障排除指南',
            'issue1_title': '编码失败或产生损坏的图像',
            'issue1_solution': '尝试使用不同的图像，最好是分辨率更高的PNG。确保您的信息不超过图像容量。',
            'issue2_title': '解码返回乱码或无数据',
            'issue2_solution': '验证您使用的密码是否正确（如果设置了密码）。尝试"自动检测"算法选项。确保图像自编码以来没有被修改或压缩。',
            'issue3_title': '编码/解码过程中浏览器崩溃',
            'issue3_solution': '这可能发生在非常大的图像或信息上。尝试使用较小的图像或将您的信息分成较小的部分。',
            'issue4_title': '恢复短语验证失败',
            'issue4_solution': '确保所有单词拼写正确并来自BIP39词汇表。检查您是否选择了正确的短语长度（12或24个词）。',
            'invalid_bip39_word': '不是有效的BIP39单词',
            'valid_mnemonic': '有效的{{count}}词助记词',
            'fill_all_mnemonic_inputs': '请填写所有助记词输入框',
            'contains_invalid_bip39_words': '包含无效的BIP39词汇',
            'mnemonic_must_contain': '助记词必须包含{{count}}个词',
            'issue5_title': '下载的图像不包含隐藏信息',
            'issue5_solution': '确保您下载的是编码后的图像，而不是原始图像。尝试再次编码，并在共享图像之前测试解码。',
            
            // 页脚
            'footer_text': '此工具完全在您的浏览器中运行。您的图像和文本永远不会上传到任何服务器。',
            'copyright_text': '© 2023-2024 cloak。',
            'buymeacoffee_text': '☕ 请我喝杯咖啡',
            'language_selector': '语言：'
        },
        
        // 繁體中文翻譯
        'zh-tw': {
            // 通用
            'app_title': 'cloak: 更好的圖像隱寫工具',
            'invalid_bip39_word': '不是有效的BIP39單詞',
            'valid_mnemonic': '有效的{{count}}詞助記詞',
            'fill_all_mnemonic_inputs': '請填寫所有助記詞輸入框',
            'contains_invalid_bip39_words': '包含無效的BIP39詞彙',
            'mnemonic_must_contain': '助記詞必須包含{{count}}個詞',
            'app_description': '在圖像中隱藏文本信息或從圖像中提取隱藏文本。所有操作都在您的瀏覽器中執行，不會上傳任何數據。',
            
            // 標籤頁
            'tab_about': '為什麼更好',
            'tab_encode': '編碼信息',
            'tab_decode': '解碼信息',
            'tab_crypto': '加密錢包',
            'tab_tutorial': '教程',
            'tab_faq': '常見問題',
            
            // About頁面
            'about_title': '為什麼cloak是更好的圖像隱寫工具',
            'about_subtitle': '最安全、功能最豐富、最用戶友好的在線隱寫工具',
            'feature_security_title': '最高安全性',
            'feature_security_desc': '所有操作都在您的瀏覽器中進行。沒有數據會上傳到任何服務器，確保完全的隱私和安全。',
            'feature_multilang_title': '多語言支持',
            'feature_multilang_desc': '支持8種語言，包括英語、中文、法語、日語、西班牙語、德語和俄語。',
            'feature_algorithms_title': '多種算法',
            'feature_algorithms_desc': '支持LSB、DCT和拼貼隱寫算法，具有自動檢測功能，實現最大兼容性。',
            'feature_password_title': '密碼保護',
            'feature_password_desc': '可選的密碼加密為您的隱藏信息增加額外的安全層。',
            'feature_crypto_title': '加密錢包支持',
            'feature_crypto_desc': '專門的功能用於安全隱藏加密貨幣私鑰和恢復短語。',
            'feature_usability_title': '易於使用',
            'feature_usability_desc': '直觀的界面，支持拖放、實時驗證和全面的教程。',
            'comparison_title': '為什麼選擇cloak而不是其他工具？',
            'comparison_feature_header': '功能',
            'comparison_cloak_header': 'cloak',
            'comparison_others_header': '其他工具',
            'comparison_browser_based': '基於瀏覽器',
            'comparison_no_upload': '無數據上傳',
            'comparison_multi_algo': '多種算法',
            'comparison_crypto_support': '加密錢包支持',
            'comparison_multilang': '多語言',
            'comparison_free': '免費開源',
            'cta_title': '準備開始了嗎？',
            'cta_description': '使用最先進的隱寫工具開始安全地隱藏您的信息。',
            'cta_encode': '開始編碼',
            'cta_tutorial': '查看教程',
            
            // 編碼部分
            'encode_title': '在圖像中隱藏信息',
            'encode_description': '選擇一張圖片，輸入您想要隱藏的文本，然後點擊「編碼」按鈕。保存生成的圖像，它將包含您的隱藏信息。',
            'select_image': '選擇圖像：',
            'drop_message': '拖放圖像到此處或點擊選擇文件',
            'secret_message': '秘密信息：',
            'secret_message_placeholder': '輸入要隱藏的文本...',
            'password_protection': '密碼保護（可選）：',
            'password_placeholder': '輸入密碼以加密您的信息...',
            'password_help': '添加密碼將為您的信息提供額外的安全保護。',
            'show_password': '顯示',
            'hide_password': '隱藏',
            'steg_algorithm': '隱寫算法：',
            'algo_lsb': 'LSB（最低有效位）',
            'algo_dct': 'DCT（離散餘弦變換）',
            'algo_patchwork': '拼貼法',
            'algo_auto': '自動檢測',
            'auto_clear': '編碼後自動清除敏感數據',
            'encode_btn': '編碼',
            'encoding_result': '編碼結果',
            'download_btn': '下載圖像',
            
            // 解碼部分
            'decode_title': '提取隱藏信息',
            'decode_description': '選擇包含隱藏信息的圖像，然後點擊「解碼」按鈕提取隱藏的文本。',
            'decode_password': '密碼（如需要）：',
            'decode_password_placeholder': '如果信息已加密，請輸入密碼...',
            'decode_btn': '解碼',
            'check_watermark': '檢查隱藏內容',
            'decoding_result': '解碼結果',
            'copy_btn': '複製文本',
            'generate_qr': '生成二維碼',
            'download_qr': '下載二維碼',
            
            // 加密錢包部分
            'crypto_title': '加密錢包保護',
            'crypto_description': '安全地在圖像中隱藏您的加密貨幣錢包私鑰或恢復短語。切勿在公共平台上分享這些圖像。',
            'select_type': '選擇類型：',
            'private_key': '私鑰',
            'recovery_phrase': '恢復短語（12/24個詞）',
            'private_key_label': '私鑰：',
            'private_key_placeholder': '輸入您的私鑰...',
            'recovery_phrase_label': '恢復短語：',
            'phrase_length': '短語長度：',
            '12_words': '12個詞',
            '24_words': '24個詞',
            'validate_phrase': '驗證短語',
            'crypto_password': '密碼保護（可選）：',
            'crypto_password_placeholder': '輸入密碼以加密您的錢包信息...',
            'crypto_password_help': '添加密碼將為您的錢包信息提供額外的安全保護。',
            'watermark_warning': '警告：此圖像已包含隱藏數據。編碼新數據將覆蓋它。',
            'crypto_encode_btn': '編碼錢包信息',
            'crypto_decode_title': '解碼錢包信息',
            'crypto_decode_description': '從圖像中提取先前隱藏的錢包信息。',
            'crypto_decode_btn': '解碼錢包信息',
            
            // 教程部分
            'tutorial_title': '教程和使用指南',
            'what_is_steg': '什麼是隱寫術？',
            'steg_definition': '隱寫術是在其他非秘密數據或物理對象中隱藏信息以避免被檢測的做法。此工具允許您在圖像中隱藏文本信息。',
            'features': '功能',
            'feature_text_hiding': '文本隱藏 - 在圖像中隱藏任何文本信息',
            'feature_crypto': '加密錢包保護 - 安全存儲您的錢包密鑰和恢復短語',
            'feature_browser': '瀏覽器端處理 - 所有操作都在您的瀏覽器中進行，不會向任何服務器發送數據',
            'how_to_use': '如何使用',
            'encoding_instructions': '編碼信息：',
            'encoding_step1': '選擇「編碼信息」標籤頁',
            'encoding_step2': '上傳圖像（最好是PNG格式）',
            'encoding_step3': '輸入您的秘密文本',
            'encoding_step4': '點擊「編碼」並下載生成的圖像',
            'decoding_instructions': '解碼信息：',
            'decoding_step1': '選擇「解碼信息」標籤頁',
            'decoding_step2': '上傳包含隱藏信息的圖像',
            'decoding_step3': '點擊「解碼」顯示隱藏的文本',
            'crypto_instructions': '加密錢包保護：',
            'crypto_step1': '選擇「加密錢包」標籤頁',
            'crypto_step2': '輸入您的私鑰或恢復短語',
            'crypto_step3': '上傳圖像並編碼您的敏感信息',
            
            // 安全考慮
            'security_considerations': '安全考慮',
            'security_warning': '重要安全警告：',
            'security_warning1': '此工具不會加密您的數據，只會隱藏它。任何能夠訪問圖像並了解隱寫術的人都可能提取您的信息。',
            'security_warning2': '切勿在社交媒體或公共平台上共享包含敏感信息的隱寫圖像，因為圖像壓縮可能會破壞隱藏的數據。',
            'security_warning3': '始終通過不同的安全方法保留加密錢包信息的多個備份。',
            'security_warning4': '為了最大限度地提高安全性，在隱藏敏感財務信息時，請在離線計算機上使用此工具。',
            'security_warning5': '該工具隱藏數據的容量有限，取決於圖像大小。較大的圖像可以存儲更多數據。',
            
            // 安全最佳實踐
            'best_practices_title': '安全最佳實踐',
            'best_practice1_title': '選擇合適的圖像',
            'best_practice1': '使用具有複雜圖案或多種顏色的高分辨率圖像，以更好地隱藏您的數據。優先選擇PNG格式而非JPEG，因為JPEG壓縮可能會破壞隱藏的數據。避免使用可能引起注意的流行或可識別的圖像。',
            'best_practice2_title': '密碼保護',
            'best_practice2': '加密敏感信息時，始終使用強大、獨特的密碼。結合使用大寫字母、小寫字母、數字和特殊字符。',
            'best_practice3_title': '安全存儲和傳輸',
            'best_practice3': '將隱寫圖像存儲在使用強密碼保護的加密驅動器或安全雲存儲中。傳輸隱寫圖像時，使用Signal、ProtonMail或其他端到端加密服務等加密通道。考慮為密碼使用與圖像不同的傳輸通道。在編碼敏感信息前刪除圖像元數據，以移除潛在的識別信息。',
            'best_practice4_title': '避免壓縮',
            'best_practice4': '切勿將隱寫圖像上傳到會壓縮圖像的社交媒體或消息平台，因為這可能會破壞隱藏的數據。',
            'best_practice5_title': '多重備份',
            'best_practice5': '始終使用不同的方法（不僅僅是隱寫術）維護敏感信息的多個備份。',
            'best_practice6_title': '額外保護層',
            'best_practice6': '對敏感信息始終使用密碼保護功能。考慮在將消息隱藏到圖像前使用PGP或其他加密工具對其進行加密。對於加密貨幣密鑰，使用BIP39密碼短語（第25個詞）作為額外的安全層。定期更換用於存儲敏感信息的圖像。',
            
            // FAQ部分
            'faq_title': '常見問題解答',
            'faq1_question': '我可以在圖像中隱藏多少數據？',
            'faq1_answer': '數據量取決於圖像大小。根據經驗，您可以隱藏大約10%的圖像字節大小。例如，1MB的圖像可以隱藏約100KB的文本。',
            'faq2_question': '隱藏數據後圖像會看起來不同嗎？',
            'faq2_answer': '使用LSB隱寫術時，變化通常對人眼不可察覺。但是，技術分析可以檢測到修改。DCT和拼貼法提供更好的抗檢測能力。',
            'faq3_question': '哪種圖像格式效果最好？',
            'faq3_answer': '推薦使用PNG，因為它使用無損壓縮。JPEG不理想，因為其壓縮算法可能會破壞隱藏的數據。BMP和TIFF也可以，但會導致更大的文件大小。',
            'faq4_question': '隱寫術與加密是一樣的嗎？',
            'faq4_answer': '不是。隱寫術隱藏數據的存在，而加密則將數據加擾使其不可讀。此工具提供兩者：隱寫術隱藏數據，可選的密碼保護加密數據。',
            'faq5_question': '我可以隱藏文本以外的文件嗎？',
            'faq5_answer': '此工具僅設計用於文本。要隱藏其他文件類型，您需要在隱藏之前將它們轉換為文本（例如，使用Base64編碼）。',
            'faq6_question': '為什麼解碼有時會失敗？',
            'faq6_answer': '解碼可能失敗的原因：編碼後圖像被壓縮（例如，通過社交媒體），使用了錯誤的密碼，圖像不包含隱藏數據，或者您選擇了錯誤的隱寫算法。',
            
            // 故障排除
            'troubleshooting_title': '故障排除指南',
            'issue1_title': '編碼失敗或產生損壞的圖像',
            'issue1_solution': '嘗試使用不同的圖像，最好是分辨率更高的PNG。確保您的信息不超過圖像容量。',
            'issue2_title': '解碼返回亂碼或無數據',
            'issue2_solution': '驗證您使用的密碼是否正確（如果設置了密碼）。嘗試「自動檢測」算法選項。確保圖像自編碼以來沒有被修改或壓縮。',
            'issue3_title': '編碼/解碼過程中瀏覽器崩潰',
            'issue3_solution': '這可能發生在非常大的圖像或信息上。嘗試使用較小的圖像或將您的信息分成較小的部分。',
            'issue4_title': '恢復短語驗證失敗',
            'issue4_solution': '確保所有單詞拼寫正確並來自BIP39詞彙表。檢查您是否選擇了正確的短語長度（12或24個詞）。',
            'issue5_title': '下載的圖像不包含隱藏信息',
            'issue5_solution': '確保您下載的是編碼後的圖像，而不是原始圖像。嘗試再次編碼，並在共享圖像之前測試解碼。',
            
            // 頁腳
            'footer_text': '此工具完全在您的瀏覽器中運行。您的圖像和文本永遠不會上傳到任何服務器。',
            'copyright_text': '© 2023-2024 cloak。',
            'buymeacoffee_text': '☕ 請我喝杯咖啡',
            'language_selector': '語言：'
        },
        
        // Français
        'fr': {
            // Général
            'app_title': 'cloak: un meilleur outil de stéganographie d\'image',
            'app_description': 'Cachez des messages texte dans des images ou extrayez du texte caché des images. Toutes les opérations sont effectuées dans votre navigateur, aucune donnée n\'est téléchargée.',
            
            // Onglets
            'tab_about': 'Pourquoi Mieux',
            'tab_encode': 'Encoder Message',
            'tab_decode': 'Décoder Message',
            'tab_crypto': 'Portefeuille Crypto',
            'tab_tutorial': 'Tutoriel',
            'tab_faq': 'FAQ',
            
            // Page À propos
            'about_title': 'Pourquoi cloak est un Meilleur Outil de Stéganographie d\'Image',
            'about_subtitle': 'L\'outil de stéganographie en ligne le plus sécurisé, riche en fonctionnalités et convivial',
            'feature_security_title': 'Sécurité Maximale',
            'feature_security_desc': 'Toutes les opérations se déroulent dans votre navigateur. Aucune donnée n\'est jamais téléchargée vers un serveur, garantissant une confidentialité et une sécurité complètes.',
            'feature_multilang_title': 'Support Multi-langues',
            'feature_multilang_desc': 'Disponible en 8 langues incluant l\'anglais, le chinois, le français, le japonais, l\'espagnol, l\'allemand et le russe.',
            'feature_algorithms_title': 'Algorithmes Multiples',
            'feature_algorithms_desc': 'Prend en charge les algorithmes de stéganographie LSB, DCT et Patchwork avec détection automatique pour une compatibilité maximale.',
            'feature_password_title': 'Protection par Mot de Passe',
            'feature_password_desc': 'Le chiffrement par mot de passe optionnel ajoute une couche de sécurité supplémentaire à vos messages cachés.',
            'feature_crypto_title': 'Support Portefeuille Crypto',
            'feature_crypto_desc': 'Fonctionnalités spécialisées pour cacher en toute sécurité les clés privées et phrases de récupération de cryptomonnaies.',
            'feature_usability_title': 'Facile à Utiliser',
            'feature_usability_desc': 'Interface intuitive avec support glisser-déposer, validation en temps réel et tutoriels complets.',
            'comparison_title': 'Pourquoi Choisir cloak Plutôt que d\'Autres Outils ?',
            'comparison_feature_header': 'Fonctionnalité',
            'comparison_cloak_header': 'cloak',
            'comparison_others_header': 'Autres Outils',
            'comparison_browser_based': 'Basé sur navigateur',
            'comparison_no_upload': 'Aucun téléchargement de données',
            'comparison_multi_algo': 'Algorithmes multiples',
            'comparison_crypto_support': 'Support portefeuille crypto',
            'comparison_multilang': 'Multi-langues',
            'comparison_free': 'Gratuit et Open Source',
            'cta_title': 'Prêt à Commencer ?',
            'cta_description': 'Commencez à cacher vos messages en toute sécurité avec l\'outil de stéganographie le plus avancé disponible.',
            'cta_encode': 'Commencer l\'Encodage',
            'cta_tutorial': 'Voir le Tutoriel',
            
            // Section d'encodage
            'encode_title': 'Cacher un Message dans une Image',
            'encode_description': 'Sélectionnez une image, entrez le texte que vous souhaitez cacher, puis cliquez sur le bouton "Encoder". Enregistrez l\'image générée, elle contiendra votre message caché.',
            'select_image': 'Sélectionner une Image:',
            'drop_message': 'Déposez l\'image ici ou cliquez pour sélectionner un fichier',
            'secret_message': 'Message Secret:',
            'secret_message_placeholder': 'Entrez le texte à cacher...',
            'password_protection': 'Protection par Mot de Passe (Optionnel):',
            'password_placeholder': 'Entrez un mot de passe pour chiffrer votre message...',
            'password_help': 'L\'ajout d\'un mot de passe chiffrera votre message pour une sécurité supplémentaire.',
            'show_password': 'Afficher',
            'hide_password': 'Masquer',
            'steg_algorithm': 'Algorithme de Stéganographie:',
            'algo_lsb': 'LSB (Bit le Moins Significatif)',
            'algo_dct': 'DCT (Transformation en Cosinus Discrète)',
            'algo_patchwork': 'Patchwork',
            'algo_auto': 'Détection Automatique',
            'auto_clear': 'Effacer automatiquement les données sensibles après l\'encodage',
            'encode_btn': 'Encoder',
            'encoding_result': 'Résultat de l\'Encodage',
            'download_btn': 'Télécharger l\'Image',
            
            // Section de décodage
            'decode_title': 'Extraire un Message Caché',
            'decode_description': 'Sélectionnez une image contenant un message caché, puis cliquez sur le bouton "Décoder" pour extraire le texte caché.',
            'decode_password': 'Mot de Passe (si nécessaire):',
            'decode_password_placeholder': 'Entrez le mot de passe si le message est chiffré...',
            'decode_btn': 'Décoder',
            'check_watermark': 'Vérifier le Contenu Caché',
            'decoding_result': 'Résultat du Décodage',
            'copy_btn': 'Copier le Texte',
            'generate_qr': 'Générer un Code QR',
            'download_qr': 'Télécharger le Code QR',
            
            // Section portefeuille crypto
            'crypto_title': 'Protection de Portefeuille Crypto',
            'crypto_description': 'Cachez en toute sécurité vos clés privées ou phrases de récupération de portefeuille de cryptomonnaie dans une image. Ne partagez jamais ces images sur des plateformes publiques.',
            'select_type': 'Sélectionner le Type:',
            'private_key': 'Clé Privée',
            'recovery_phrase': 'Phrase de Récupération (12/24 mots)',
            'private_key_label': 'Clé Privée:',
            'private_key_placeholder': 'Entrez votre clé privée...',
            'recovery_phrase_label': 'Phrase de Récupération:',
            'phrase_length': 'Longueur de la Phrase:',
            '12_words': '12 mots',
            '24_words': '24 mots',
            'validate_phrase': 'Valider la Phrase',
            'crypto_password': 'Protection par Mot de Passe (Optionnel):',
            'crypto_password_placeholder': 'Entrez un mot de passe pour chiffrer vos informations de portefeuille...',
            'crypto_password_help': 'L\'ajout d\'un mot de passe chiffrera vos informations de portefeuille pour une sécurité supplémentaire.',
            'watermark_warning': 'Attention: Cette image contient déjà des données cachées. L\'encodage de nouvelles données les écrasera.',
            'crypto_encode_btn': 'Encoder les Informations de Portefeuille',
            'crypto_decode_title': 'Décoder les Informations de Portefeuille',
            'crypto_decode_description': 'Extraire les informations de portefeuille précédemment cachées d\'une image.',
            'crypto_decode_btn': 'Décoder les Informations de Portefeuille',
            
            // Section tutoriel
            'tutorial_title': 'Tutoriel et Guide d\'Utilisation',
            'what_is_steg': 'Qu\'est-ce que la Stéganographie?',
            'steg_definition': 'La stéganographie est la pratique de cacher des informations dans d\'autres données non secrètes ou un objet physique pour éviter la détection. Cet outil vous permet de cacher des messages texte dans des images.',
            'features': 'Fonctionnalités',
            'feature_text_hiding': 'Dissimulation de Texte - Cachez n\'importe quel message texte dans une image',
            'feature_crypto': 'Protection de Portefeuille Crypto - Stockez en toute sécurité vos clés de portefeuille et phrases de récupération',
            'feature_browser': 'Basé sur le Navigateur - Toutes les opérations se déroulent dans votre navigateur, aucune donnée n\'est envoyée à un serveur',
            'how_to_use': 'Comment Utiliser',
            'encoding_instructions': 'Encoder un message:',
            'encoding_step1': 'Sélectionnez l\'onglet "Encoder Message"',
            'encoding_step2': 'Téléchargez une image (de préférence au format PNG)',
            'encoding_step3': 'Entrez votre texte secret',
            'encoding_step4': 'Cliquez sur "Encoder" et téléchargez l\'image résultante',
            'decoding_instructions': 'Décoder un message:',
            'decoding_step1': 'Sélectionnez l\'onglet "Décoder Message"',
            'decoding_step2': 'Téléchargez une image contenant un message caché',
            'decoding_step3': 'Cliquez sur "Décoder" pour révéler le texte caché',
            'crypto_instructions': 'Protection de Portefeuille Crypto:',
            'crypto_step1': 'Sélectionnez l\'onglet "Portefeuille Crypto"',
            'crypto_step2': 'Entrez votre clé privée ou phrase de récupération',
            'crypto_step3': 'Téléchargez une image et encodez vos informations sensibles',
            
            // Considérations de sécurité
            'security_considerations': 'Considérations de Sécurité',
            'security_warning': 'Avertissements de Sécurité Importants:',
            'security_warning1': 'Cet outil ne chiffre pas vos données, il les cache seulement. Toute personne ayant accès à l\'image et connaissant la stéganographie peut potentiellement extraire votre message.',
            'security_warning2': 'Ne partagez jamais d\'images stéganographiques contenant des informations sensibles sur les réseaux sociaux ou les plateformes publiques, car la compression d\'image pourrait détruire les données cachées.',
            'security_warning3': 'Conservez toujours plusieurs sauvegardes de vos informations de portefeuille crypto par différentes méthodes sécurisées.',
            'security_warning4': 'Pour une sécurité maximale, utilisez cet outil sur un ordinateur hors ligne lors de la dissimulation d\'informations financières sensibles.',
            'security_warning5': 'L\'outil a une capacité limitée pour cacher des données en fonction de la taille de l\'image. Les images plus grandes peuvent stocker plus de données.',
            
            // Meilleures pratiques de sécurité
            'best_practices_title': 'Meilleures Pratiques de Sécurité',
            'best_practice1_title': 'Choisir la Bonne Image',
            'best_practice1': 'Utilisez des images haute résolution avec des motifs complexes ou de nombreuses couleurs pour mieux cacher vos données. Préférez le format PNG au JPEG, car la compression JPEG peut détruire les données cachées. Évitez d\'utiliser des images populaires ou reconnaissables qui pourraient attirer l\'attention.',
            'best_practice2_title': 'Protection par Mot de Passe',
            'best_practice2': 'Utilisez toujours des mots de passe forts et uniques lors du chiffrement d\'informations sensibles. Combinez majuscules, minuscules, chiffres et caractères spéciaux.',
            'best_practice3_title': 'Stockage et Transmission Sécurisés',
            'best_practice3': 'Stockez les images stéganographiques sur des disques chiffrés ou un stockage cloud sécurisé avec des mots de passe forts. Lors de la transmission d\'images stéganographiques, utilisez des canaux chiffrés comme Signal, ProtonMail ou d\'autres services chiffrés de bout en bout. Envisagez d\'utiliser un canal de transmission différent pour le mot de passe que celui utilisé pour l\'image. Supprimez les métadonnées des images avant d\'encoder des informations sensibles pour éliminer les informations d\'identification potentielles.',
            'best_practice4_title': 'Éviter la Compression',
            'best_practice4': 'Ne téléchargez jamais d\'images stéganographiques sur les réseaux sociaux ou les plateformes de messagerie qui compressent les images, car cela détruira probablement les données cachées.',
            'best_practice5_title': 'Sauvegardes Multiples',
            'best_practice5': 'Maintenez toujours plusieurs sauvegardes de vos informations sensibles en utilisant différentes méthodes, pas seulement la stéganographie.',
            'best_practice6_title': 'Couches de Protection Supplémentaires',
            'best_practice6': 'Utilisez toujours la fonction de protection par mot de passe pour les informations sensibles. Envisagez de chiffrer votre message avec PGP ou d\'autres outils de chiffrement avant de le cacher dans une image. Pour les clés de cryptomonnaie, utilisez une phrase de passe BIP39 (25ème mot) comme couche de sécurité supplémentaire. Changez régulièrement les images que vous utilisez pour stocker des informations sensibles.',
            
            // Section FAQ
            'faq_title': 'Foire Aux Questions',
            'faq1_question': 'Quelle quantité de données puis-je cacher dans une image?',
            'faq1_answer': 'La quantité de données dépend de la taille de l\'image. En règle générale, vous pouvez cacher environ 10% de la taille de l\'image en octets. Par exemple, une image de 1MB peut cacher environ 100KB de texte.',
            'faq2_question': 'L\'image aura-t-elle un aspect différent après avoir caché des données?',
            'faq2_answer': 'Lors de l\'utilisation de la stéganographie LSB, les changements sont généralement imperceptibles à l\'œil humain. Cependant, une analyse technique peut détecter des modifications. Les méthodes DCT et Patchwork offrent une meilleure résistance à la détection.',
            'faq3_question': 'Quels formats d\'image fonctionnent le mieux?',
            'faq3_answer': 'PNG est recommandé car il utilise une compression sans perte. JPEG n\'est pas idéal car son algorithme de compression peut détruire les données cachées. BMP et TIFF fonctionnent également bien mais entraînent des tailles de fichier plus importantes.',
            'faq4_question': 'La stéganographie est-elle identique au chiffrement?',
            'faq4_answer': 'Non. La stéganographie cache l\'existence des données, tandis que le chiffrement brouille les données pour les rendre illisibles. Cet outil offre les deux: la stéganographie pour cacher les données et une protection par mot de passe optionnelle pour les chiffrer.',
            'faq5_question': 'Puis-je cacher des fichiers autres que du texte?',
            'faq5_answer': 'Cet outil est conçu uniquement pour le texte. Pour cacher d\'autres types de fichiers, vous devriez les convertir en texte (par exemple, en utilisant l\'encodage Base64) avant de les cacher.',
            'faq6_question': 'Pourquoi le décodage échoue-t-il parfois?',
            'faq6_answer': 'Le décodage peut échouer si: l\'image a été compressée après l\'encodage (par exemple, par les réseaux sociaux), le mauvais mot de passe a été utilisé, l\'image ne contient pas de données cachées, ou vous avez sélectionné le mauvais algorithme de stéganographie.',
            
            // Guide de dépannage
            'troubleshooting_title': 'Guide de Dépannage',
            'issue1_title': 'L\'encodage échoue ou produit des images corrompues',
            'issue1_solution': 'Essayez d\'utiliser une image différente, de préférence un PNG avec une résolution plus élevée. Assurez-vous que votre message n\'est pas trop volumineux pour la capacité de l\'image.',
            'issue2_title': 'Le décodage renvoie des données incompréhensibles ou aucune donnée',
            'issue2_solution': 'Vérifiez que vous utilisez le mot de passe correct (si un mot de passe a été défini). Essayez l\'option d\'algorithme "Détection Automatique". Assurez-vous que l\'image n\'a pas été modifiée ou compressée depuis l\'encodage.',
            'issue3_title': 'Le navigateur plante pendant l\'encodage/décodage',
            'issue3_solution': 'Cela peut se produire avec des images ou des messages très volumineux. Essayez d\'utiliser des images plus petites ou de diviser votre message en parties plus petites.',
            'issue4_title': 'La validation de la phrase de récupération échoue',
            'issue4_solution': 'Assurez-vous que tous les mots sont correctement orthographiés et proviennent de la liste de mots BIP39. Vérifiez que vous avez sélectionné la bonne longueur de phrase (12 ou 24 mots).',
            'issue5_title': 'L\'image téléchargée ne contient pas le message caché',
            'issue5_solution': 'Assurez-vous d\'avoir téléchargé l\'image après l\'encodage, pas l\'original. Essayez d\'encoder à nouveau et testez le décodage avant de partager l\'image.',
            
            // Pied de page
            'footer_text': 'Cet outil fonctionne entièrement dans votre navigateur. Vos images et textes ne sont jamais téléchargés sur un serveur.',
            'copyright_text': '© 2023-2024 cloak.',
            'buymeacoffee_text': '☕ Offrez-moi un café',
            'language_selector': 'Langue:'
        },
        
        // 日本語
        'ja': {
            // 一般
            'app_title': 'cloak: より良い画像ステガノグラフィーツール',
            'app_description': '画像にテキストメッセージを隠したり、画像から隠しテキストを抽出したりします。すべての操作はブラウザ内で実行され、データはアップロードされません。',
            
            // タブ
            'tab_about': 'なぜより良いか',
            'tab_encode': 'メッセージを符号化',
            'tab_decode': 'メッセージを復号化',
            'tab_crypto': '暗号ウォレット',
            'tab_tutorial': 'チュートリアル',
            'tab_faq': 'よくある質問',
            
            // About ページ
            'about_title': 'なぜcloakがより良い画像ステガノグラフィーツールなのか',
            'about_subtitle': 'オンラインで利用可能な最も安全で機能豊富、そしてユーザーフレンドリーなステガノグラフィーツール',
            'feature_security_title': '最大限のセキュリティ',
            'feature_security_desc': 'すべての操作はブラウザ内で実行されます。データがサーバーにアップロードされることは一切なく、完全なプライバシーとセキュリティを保証します。',
            'feature_multilang_title': '多言語サポート',
            'feature_multilang_desc': '英語、中国語、フランス語、日本語、スペイン語、ドイツ語、ロシア語を含む8言語で利用可能です。',
            'feature_algorithms_title': '複数のアルゴリズム',
            'feature_algorithms_desc': 'LSB、DCT、Patchworkステガノグラフィーアルゴリズムをサポートし、最大限の互換性のための自動検出機能付き。',
            'feature_password_title': 'パスワード保護',
            'feature_password_desc': 'オプションのパスワード暗号化により、隠しメッセージにさらなるセキュリティ層を追加します。',
            'feature_crypto_title': '暗号ウォレットサポート',
            'feature_crypto_desc': '暗号通貨の秘密鍵と復旧フレーズを安全に隠すための専用機能。',
            'feature_usability_title': '使いやすさ',
            'feature_usability_desc': 'ドラッグアンドドロップサポート、リアルタイム検証、包括的なチュートリアルを備えた直感的なインターフェース。',
            'comparison_title': '他のツールよりもcloakを選ぶ理由は？',
            'comparison_feature_header': '機能',
            'comparison_cloak_header': 'cloak',
            'comparison_others_header': '他のツール',
            'comparison_browser_based': 'ブラウザベース',
            'comparison_no_upload': 'データアップロードなし',
            'comparison_multi_algo': '複数のアルゴリズム',
            'comparison_crypto_support': '暗号ウォレットサポート',
            'comparison_multilang': '多言語対応',
            'comparison_free': '無料＆オープンソース',
            'cta_title': '始める準備はできましたか？',
            'cta_description': '利用可能な最も高度なステガノグラフィーツールで、メッセージを安全に隠し始めましょう。',
            'cta_encode': 'エンコードを開始',
            'cta_tutorial': 'チュートリアルを見る',
            
            // エンコード部分
            'encode_title': '画像にメッセージを隠す',
            'encode_description': '画像を選択し、隠したいテキストを入力してから「エンコード」ボタンをクリックします。生成された画像を保存すると、隠しメッセージが含まれます。',
            'select_image': '画像を選択:',
            'drop_message': 'ここに画像をドロップするか、クリックしてファイルを選択',
            'secret_message': '秘密のメッセージ:',
            'secret_message_placeholder': '隠すテキストを入力...',
            'password_protection': 'パスワード保護（オプション）:',
            'password_placeholder': 'メッセージを暗号化するためのパスワードを入力...',
            'password_help': 'パスワードを追加すると、メッセージが暗号化され、セキュリティが強化されます。',
            'show_password': '表示',
            'hide_password': '非表示',
            'steg_algorithm': 'ステガノグラフィーアルゴリズム:',
            'algo_lsb': 'LSB（最下位ビット）',
            'algo_dct': 'DCT（離散コサイン変換）',
            'algo_patchwork': 'パッチワーク',
            'algo_auto': '自動検出',
            'auto_clear': 'エンコード後に機密データを自動的にクリア',
            'encode_btn': 'エンコード',
            'encoding_result': 'エンコード結果',
            'download_btn': '画像をダウンロード',
            
            // デコード部分
            'decode_title': '隠しメッセージを抽出',
            'decode_description': '隠しメッセージを含む画像を選択し、「デコード」ボタンをクリックして隠しテキストを抽出します。',
            'decode_password': 'パスワード（必要な場合）:',
            'decode_password_placeholder': 'メッセージが暗号化されている場合はパスワードを入力...',
            'decode_btn': 'デコード',
            'check_watermark': '隠しコンテンツを確認',
            'decoding_result': 'デコード結果',
            'copy_btn': 'テキストをコピー',
            'generate_qr': 'QRコードを生成',
            'download_qr': 'QRコードをダウンロード',
            
            // 暗号ウォレット部分
            'crypto_title': '暗号ウォレット保護',
            'crypto_description': '暗号通貨ウォレットの秘密鍵やリカバリーフレーズを画像に安全に隠します。これらの画像を公開プラットフォームで共有しないでください。',
            'select_type': 'タイプを選択:',
            'private_key': '秘密鍵',
            'recovery_phrase': 'リカバリーフレーズ（12/24単語）',
            'private_key_label': '秘密鍵:',
            'private_key_placeholder': '秘密鍵を入力...',
            'recovery_phrase_label': 'リカバリーフレーズ:',
            'phrase_length': 'フレーズの長さ:',
            '12_words': '12単語',
            '24_words': '24単語',
            'validate_phrase': 'フレーズを検証',
            'crypto_password': 'パスワード保護（オプション）:',
            'crypto_password_placeholder': 'ウォレット情報を暗号化するためのパスワードを入力...',
            'crypto_password_help': 'パスワードを追加すると、ウォレット情報が暗号化され、セキュリティが強化されます。',
            'watermark_warning': '警告：この画像にはすでに隠しデータが含まれています。新しいデータをエンコードすると上書きされます。',
            'crypto_encode_btn': 'ウォレット情報をエンコード',
            'crypto_decode_title': 'ウォレット情報をデコード',
            'crypto_decode_description': '画像から以前に隠されたウォレット情報を抽出します。',
            'crypto_decode_btn': 'ウォレット情報をデコード',
            
            // チュートリアル部分
            'tutorial_title': 'チュートリアルと使用ガイド',
            'what_is_steg': 'ステガノグラフィーとは？',
            'steg_definition': 'ステガノグラフィーは、検出を避けるために他の非秘密データや物理的なオブジェクトに情報を隠す実践です。このツールを使用すると、画像にテキストメッセージを隠すことができます。',
            'features': '機能',
            'feature_text_hiding': 'テキスト隠蔽 - 任意のテキストメッセージを画像に隠す',
            'feature_crypto': '暗号ウォレット保護 - ウォレットキーとリカバリーフレーズを安全に保存',
            'feature_browser': 'ブラウザベース - すべての操作はブラウザ内で行われ、データはサーバーに送信されません',
            'how_to_use': '使用方法',
            'encoding_instructions': 'メッセージを隠す:',
            'encoding_step1': '「メッセージを符号化」タブを選択',
            'encoding_step2': '画像をアップロード（PNG形式推奨）',
            'encoding_step3': '秘密のテキストを入力',
            'encoding_step4': '「エンコード」をクリックして結果の画像をダウンロード',
            'decoding_instructions': 'メッセージを取り出す:',
            'decoding_step1': '「メッセージを復号化」タブを選択',
            'decoding_step2': '隠しメッセージを含む画像をアップロード',
            'decoding_step3': '「デコード」をクリックして隠されたテキストを表示',
            'crypto_instructions': '暗号ウォレットの保護:',
            'crypto_step1': '「暗号ウォレット」タブを選択',
            'crypto_step2': '秘密鍵またはリカバリーフレーズを入力',
            'crypto_step3': '画像をアップロードして機密情報をエンコード',
            
            // セキュリティに関する考慮事項
            'security_considerations': 'セキュリティに関する考慮事項',
            'security_warning': '重要なセキュリティ警告:',
            'security_warning1': 'このツールはデータを暗号化せず、単に隠すだけです。画像にアクセスでき、ステガノグラフィーを知っている人は、あなたのメッセージを抽出できる可能性があります。',
            'security_warning2': '機密情報を含むステガノグラフィー画像をソーシャルメディアや公開プラットフォームで共有しないでください。画像圧縮により隠されたデータが破壊される可能性があります。',
            'security_warning3': '暗号ウォレット情報は常に複数の安全な方法でバックアップを保管してください。',
            'security_warning4': '機密性の高い金融情報を隠す場合は、オフラインコンピュータでこのツールを使用することで最大限のセキュリティを確保してください。',
            'security_warning5': 'このツールには画像サイズに基づいてデータを隠す容量に制限があります。大きな画像はより多くのデータを保存できます。',
            
            // セキュリティのベストプラクティス
            'best_practices_title': 'セキュリティのベストプラクティス',
            'best_practice1_title': '適切な画像の選択',
            'best_practice1': 'データをより効果的に隠すために、複雑なパターンや多くの色を持つ高解像度の画像を使用してください。JPEG圧縮は隠されたデータを破壊する可能性があるため、JPEGよりもPNG形式を優先してください。注目を集める可能性のある人気のある画像や認識しやすい画像の使用は避けてください。',
            'best_practice2_title': 'パスワード保護',
            'best_practice2': '機密情報を暗号化する際は、常に強力でユニークなパスワードを使用してください。大文字、小文字、数字、特殊文字を組み合わせてください。',
            'best_practice3_title': '安全な保存と送信',
            'best_practice3': 'ステガノグラフィー画像は、強力なパスワードで保護された暗号化ディスクまたは安全なクラウドストレージに保存してください。ステガノグラフィー画像を送信する際は、Signal、ProtonMail、またはその他のエンドツーエンド暗号化サービスなどの暗号化チャネルを使用してください。画像とパスワードには異なる送信チャネルの使用を検討してください。潜在的な識別情報を排除するために、機密情報をエンコードする前に画像からメタデータを削除してください。',
            'best_practice4_title': '圧縮の回避',
            'best_practice4': '画像を圧縮するソーシャルメディアやメッセージングプラットフォームには、ステガノグラフィー画像をアップロードしないでください。隠されたデータが破壊される可能性があります。',
            'best_practice5_title': '複数のバックアップ',
            'best_practice5': '機密情報は常にステガノグラフィーだけでなく、異なる方法を使用して複数のバックアップを維持してください。',
            'best_practice6_title': '追加の保護層',
            'best_practice6': '機密情報には常にパスワード保護機能を使用してください。画像に隠す前にPGPやその他の暗号化ツールでメッセージを暗号化することを検討してください。暗号通貨キーには、追加のセキュリティ層としてBIP39パスフレーズ（25番目の単語）を使用してください。機密情報を保存するために使用する画像を定期的に変更してください。',
            
            // FAQ セクション
            'faq_title': 'よくある質問',
            'faq1_question': '画像にどれくらいのデータを隠せますか？',
            'faq1_answer': 'データ量は画像のサイズによって異なります。一般的に、画像サイズの約10％のバイト数のテキストを隠すことができます。例えば、1MBの画像には約100KBのテキストを隠すことができます。',
            'faq2_question': 'データを隠した後、画像の見た目は変わりますか？',
            'faq2_answer': 'LSBステガノグラフィーを使用する場合、変更は通常、肉眼では気づかれません。ただし、技術的な分析により変更が検出される可能性があります。DCTやパッチワーク法はより検出に強い抵抗性を提供します。',
            'faq3_question': 'どの画像形式が最適ですか？',
            'faq3_answer': 'PNGは非可逆圧縮を使用するため推奨されます。JPEGはその圧縮アルゴリズムが隠されたデータを破壊する可能性があるため理想的ではありません。BMPとTIFFも適していますが、ファイルサイズが大きくなります。',
            'faq4_question': 'ステガノグラフィーは暗号化と同じですか？',
            'faq4_answer': 'いいえ。ステガノグラフィーはデータの存在を隠し、暗号化はデータを読めないように難読化します。このツールは両方を提供します：データを隠すためのステガノグラフィーと、それを暗号化するためのオプションのパスワード保護です。',
            'faq5_question': 'テキスト以外のファイルを隠すことはできますか？',
            'faq5_answer': 'このツールはテキストのみを対象に設計されています。他のタイプのファイルを隠すには、隠す前にBase64エンコーディングなどを使用してテキストに変換する必要があります。',
            'faq6_question': 'デコードが失敗することがあるのはなぜですか？',
            'faq6_answer': 'デコードが失敗する可能性があるのは：エンコード後に画像が圧縮された場合（ソーシャルメディアなどによる）、間違ったパスワードが使用された場合、画像に隠されたデータが含まれていない場合、または間違ったステガノグラフィーアルゴリズムを選択した場合です。',
            
            // トラブルシューティングガイド
            'troubleshooting_title': 'トラブルシューティングガイド',
            'issue1_title': 'エンコードが失敗するか破損した画像が生成される',
            'issue1_solution': '別の画像、できれば高解像度のPNGを使用してみてください。メッセージが画像の容量に対して大きすぎないことを確認してください。',
            'issue2_title': 'デコードで意味不明なデータが返されるかデータが返されない',
            'issue2_solution': '正しいパスワードを使用していることを確認してください（パスワードが設定されている場合）。「自動検出」アルゴリズムオプションを試してください。画像がエンコード以降に変更または圧縮されていないことを確認してください。',
            'issue3_title': 'エンコード/デコード中にブラウザがクラッシュする',
            'issue3_solution': 'これは非常に大きな画像やメッセージで発生する可能性があります。より小さな画像を使用するか、メッセージをより小さな部分に分割してみてください。',
            'issue4_title': 'リカバリーフレーズの検証に失敗する',
            'issue4_solution': 'すべての単語が正しくスペルされており、BIP39単語リストからのものであることを確認してください。正しいフレーズの長さ（12または24単語）を選択していることを確認してください。',
            'issue5_title': 'ダウンロードした画像に隠しメッセージが含まれていない',
            'issue5_solution': 'エンコード後に画像をダウンロードしたことを確認してください（元の画像ではなく）。再度エンコードして、画像を共有する前にデコードをテストしてみてください。',
            
            // フッター
            'footer_text': 'このツールはブラウザ内で完全に実行されます。画像やテキストがサーバーにアップロードされることはありません。',
            'copyright_text': '© 2023-2024 cloak。',
            'buymeacoffee_text': '☕ コーヒーをおごる',
            'language_selector': '言語:'
        },
        
        // Español
        'es': {
            // General
            'app_title': 'cloak: una mejor herramienta de esteganografía de imagen',
            'app_description': 'Oculta mensajes de texto en imágenes o extrae texto oculto de imágenes. Todas las operaciones se realizan en tu navegador, no se sube ningún dato.',
            
            // Pestañas
            'tab_about': 'Por Qué Mejor',
            'tab_encode': 'Codificar Mensaje',
            'tab_decode': 'Decodificar Mensaje',
            'tab_crypto': 'Monedero Cripto',
            'tab_tutorial': 'Tutorial',
            'tab_faq': 'Preguntas Frecuentes',
            
            // Página About
            'about_title': 'Por Qué cloak es una Mejor Herramienta de Esteganografía de Imagen',
            'about_subtitle': 'La herramienta de esteganografía más segura, rica en funciones y fácil de usar disponible en línea',
            'feature_security_title': 'Máxima Seguridad',
            'feature_security_desc': 'Todas las operaciones ocurren en tu navegador. Nunca se sube ningún dato a ningún servidor, garantizando completa privacidad y seguridad.',
            'feature_multilang_title': 'Soporte Multiidioma',
            'feature_multilang_desc': 'Disponible en 8 idiomas incluyendo inglés, chino, francés, japonés, español, alemán y ruso.',
            'feature_algorithms_title': 'Múltiples Algoritmos',
            'feature_algorithms_desc': 'Soporta algoritmos de esteganografía LSB, DCT y Patchwork con detección automática para máxima compatibilidad.',
            'feature_password_title': 'Protección con Contraseña',
            'feature_password_desc': 'El cifrado opcional con contraseña añade una capa extra de seguridad a tus mensajes ocultos.',
            'feature_crypto_title': 'Soporte para Monedero Cripto',
            'feature_crypto_desc': 'Funciones especializadas para ocultar de forma segura claves privadas de criptomonedas y frases de recuperación.',
            'feature_usability_title': 'Fácil de Usar',
            'feature_usability_desc': 'Interfaz intuitiva con soporte de arrastrar y soltar, validación en tiempo real y tutoriales completos.',
            'comparison_title': '¿Por Qué Elegir cloak Sobre Otras Herramientas?',
            'comparison_feature_header': 'Característica',
            'comparison_cloak_header': 'cloak',
            'comparison_others_header': 'Otras Herramientas',
            'comparison_browser_based': 'Basado en navegador',
            'comparison_no_upload': 'Sin subida de datos',
            'comparison_multi_algo': 'Múltiples algoritmos',
            'comparison_crypto_support': 'Soporte para monedero cripto',
            'comparison_multilang': 'Multiidioma',
            'comparison_free': 'Gratis y código abierto',
            'cta_title': '¿Listo para Empezar?',
            'cta_description': 'Comienza a ocultar tus mensajes de forma segura con la herramienta de esteganografía más avanzada disponible.',
            'cta_encode': 'Comenzar Codificación',
            'cta_tutorial': 'Ver Tutorial',
            
            // Sección de codificación
            'encode_title': 'Ocultar un Mensaje en una Imagen',
            'encode_description': 'Selecciona una imagen, introduce el texto que quieres ocultar y luego haz clic en el botón "Codificar". Guarda la imagen generada, contendrá tu mensaje oculto.',
            'select_image': 'Seleccionar Imagen:',
            'drop_message': 'Arrastra la imagen aquí o haz clic para seleccionar un archivo',
            'secret_message': 'Mensaje Secreto:',
            'secret_message_placeholder': 'Introduce el texto a ocultar...',
            'password_protection': 'Protección con Contraseña (Opcional):',
            'password_placeholder': 'Introduce una contraseña para cifrar tu mensaje...',
            'password_help': 'Añadir una contraseña cifrará tu mensaje para mayor seguridad.',
            'show_password': 'Mostrar',
            'hide_password': 'Ocultar',
            'steg_algorithm': 'Algoritmo de Esteganografía:',
            'algo_lsb': 'LSB (Bit Menos Significativo)',
            'algo_dct': 'DCT (Transformada Discreta del Coseno)',
            'algo_patchwork': 'Patchwork',
            'algo_auto': 'Detección Automática',
            'auto_clear': 'Borrar automáticamente datos sensibles después de codificar',
            'encode_btn': 'Codificar',
            'encoding_result': 'Resultado de la Codificación',
            'download_btn': 'Descargar Imagen',
            
            // Sección de decodificación
            'decode_title': 'Extraer Mensaje Oculto',
            'decode_description': 'Selecciona una imagen que contenga un mensaje oculto, luego haz clic en el botón "Decodificar" para extraer el texto oculto.',
            'decode_password': 'Contraseña (si es necesaria):',
            'decode_password_placeholder': 'Introduce la contraseña si el mensaje está cifrado...',
            'decode_btn': 'Decodificar',
            'check_watermark': 'Comprobar Contenido Oculto',
            'decoding_result': 'Resultado de la Decodificación',
            'copy_btn': 'Copiar Texto',
            'generate_qr': 'Generar Código QR',
            'download_qr': 'Descargar Código QR',
            
            // Sección de monedero cripto
            'crypto_title': 'Protección de Monedero Cripto',
            'crypto_description': 'Oculta de forma segura las claves privadas o frases de recuperación de tu monedero de criptomonedas en una imagen. Nunca compartas estas imágenes en plataformas públicas.',
            'select_type': 'Seleccionar Tipo:',
            'private_key': 'Clave Privada',
            'recovery_phrase': 'Frase de Recuperación (12/24 palabras)',
            'private_key_label': 'Clave Privada:',
            'private_key_placeholder': 'Introduce tu clave privada...',
            'recovery_phrase_label': 'Frase de Recuperación:',
            'phrase_length': 'Longitud de la Frase:',
            '12_words': '12 palabras',
            '24_words': '24 palabras',
            'validate_phrase': 'Validar Frase',
            'crypto_password': 'Protección con Contraseña (Opcional):',
            'crypto_password_placeholder': 'Introduce una contraseña para cifrar la información de tu monedero...',
            'crypto_password_help': 'Añadir una contraseña cifrará la información de tu monedero para mayor seguridad.',
            'watermark_warning': 'Advertencia: Esta imagen ya contiene datos ocultos. Codificar nuevos datos sobrescribirá los existentes.',
            'crypto_encode_btn': 'Codificar Información del Monedero',
            'crypto_decode_title': 'Decodificar Información del Monedero',
            'crypto_decode_description': 'Extrae información del monedero previamente oculta de una imagen.',
            'crypto_decode_btn': 'Decodificar Información del Monedero',
            
            // Sección de tutorial
            'tutorial_title': 'Tutorial y Guía de Uso',
            'what_is_steg': '¿Qué es la Esteganografía?',
            'steg_definition': 'La esteganografía es la práctica de ocultar información en otros datos no secretos o un objeto físico para evitar la detección. Esta herramienta te permite ocultar mensajes de texto en imágenes.',
            'features': 'Características',
            'feature_text_hiding': 'Ocultamiento de Texto - Oculta cualquier mensaje de texto en una imagen',
            'feature_crypto': 'Protección de Monedero Cripto - Almacena de forma segura tus claves de monedero y frases de recuperación',
            'feature_browser': 'Basado en Navegador - Todas las operaciones ocurren en tu navegador, no se envían datos a ningún servidor',
            'how_to_use': 'Cómo Usar',
            'encoding_instructions': 'Para ocultar un mensaje:',
            'encoding_step1': 'Selecciona la pestaña "Codificar Mensaje"',
            'encoding_step2': 'Sube una imagen (se recomienda formato PNG)',
            'encoding_step3': 'Introduce tu texto secreto',
            'encoding_step4': 'Haz clic en "Codificar" y descarga la imagen resultante',
            'decoding_instructions': 'Para extraer un mensaje:',
            'decoding_step1': 'Selecciona la pestaña "Decodificar Mensaje"',
            'decoding_step2': 'Sube la imagen que contiene el mensaje oculto',
            'decoding_step3': 'Haz clic en "Decodificar" para revelar el texto oculto',
            'crypto_instructions': 'Para proteger un monedero cripto:',
            'crypto_step1': 'Selecciona la pestaña "Monedero Cripto"',
            'crypto_step2': 'Introduce tu clave privada o frase de recuperación',
            'crypto_step3': 'Sube una imagen para codificar tu información confidencial',
            
            // Consideraciones de seguridad
            'security_considerations': 'Consideraciones de Seguridad',
            'security_warning': 'Advertencias de Seguridad Importantes:',
            'security_warning1': 'Esta herramienta no cifra tus datos, solo los oculta. Cualquier persona con acceso a la imagen y conocimiento de esteganografía podría potencialmente extraer tu mensaje.',
            'security_warning2': 'Nunca compartas imágenes esteganográficas que contengan información sensible en redes sociales o plataformas públicas, ya que la compresión de imagen podría destruir los datos ocultos.',
            'security_warning3': 'Siempre mantén múltiples copias de seguridad de tu información de monedero cripto usando diferentes métodos seguros.',
            'security_warning4': 'Para máxima seguridad, usa esta herramienta en un ordenador sin conexión cuando ocultes información financiera sensible.',
            'security_warning5': 'La herramienta tiene una capacidad limitada para ocultar datos basada en el tamaño de la imagen. Las imágenes más grandes pueden almacenar más datos.',
            
            // Mejores prácticas de seguridad
            'best_practices_title': 'Mejores Prácticas de Seguridad',
            'best_practice1_title': 'Elegir la Imagen Correcta',
            'best_practice1': 'Usa imágenes de alta resolución con patrones complejos o muchos colores para ocultar tus datos más eficazmente. Prefiere el formato PNG sobre JPEG, ya que la compresión JPEG puede destruir los datos ocultos. Evita usar imágenes populares o reconocibles que puedan atraer atención.',
            'best_practice2_title': 'Protección con Contraseña',
            'best_practice2': 'Siempre usa contraseñas fuertes y únicas cuando cifres información sensible. Combina mayúsculas, minúsculas, números y caracteres especiales.',
            'best_practice3_title': 'Almacenamiento y Transmisión Seguros',
            'best_practice3': 'Almacena imágenes esteganográficas en discos cifrados o almacenamiento en la nube seguro con contraseñas fuertes. Al transmitir imágenes esteganográficas, usa canales cifrados como Signal, ProtonMail u otros servicios cifrados de extremo a extremo. Considera usar un canal de transmisión diferente para la contraseña que para la imagen. Elimina los metadatos de las imágenes antes de codificar información sensible para eliminar información de identificación potencial.',
            'best_practice4_title': 'Evitar la Compresión',
            'best_practice4': 'Nunca subas imágenes esteganográficas a redes sociales o plataformas de mensajería que compriman imágenes, ya que probablemente destruirá los datos ocultos.',
            'best_practice5_title': 'Múltiples Copias de Seguridad',
            'best_practice5': 'Siempre mantén múltiples copias de seguridad de tu información sensible usando diferentes métodos, no solo esteganografía.',
            'best_practice6_title': 'Capas Adicionales de Protección',
            'best_practice6': 'Siempre usa la función de protección con contraseña para información sensible. Considera cifrar tu mensaje con PGP u otras herramientas de cifrado antes de ocultarlo en una imagen. Para claves de criptomonedas, usa una frase de contraseña BIP39 (palabra 25) como capa adicional de seguridad. Cambia regularmente las imágenes que usas para almacenar información sensible.',
            
            // Sección de FAQ
            'faq_title': 'Preguntas Frecuentes',
            'faq1_question': '¿Cuántos datos puedo ocultar en una imagen?',
            'faq1_answer': 'La cantidad de datos depende del tamaño de la imagen. Como regla general, puedes ocultar aproximadamente el 10% del tamaño de la imagen en bytes. Por ejemplo, una imagen de 1MB puede ocultar alrededor de 100KB de texto.',
            'faq2_question': '¿La imagen se verá diferente después de ocultar datos?',
            'faq2_answer': 'Cuando se usa esteganografía LSB, los cambios generalmente son imperceptibles para el ojo humano. Sin embargo, un análisis técnico puede detectar modificaciones. Los métodos DCT y Patchwork ofrecen mejor resistencia a la detección.',
            'faq3_question': '¿Qué formatos de imagen funcionan mejor?',
            'faq3_answer': 'PNG es recomendado porque usa compresión sin pérdida. JPEG no es ideal ya que su algoritmo de compresión puede destruir los datos ocultos. BMP y TIFF también funcionan bien pero resultan en tamaños de archivo más grandes.',
            'faq4_question': '¿Es la esteganografía lo mismo que el cifrado?',
            'faq4_answer': 'No. La esteganografía oculta la existencia de los datos, mientras que el cifrado codifica los datos para hacerlos ilegibles. Esta herramienta ofrece ambos: esteganografía para ocultar los datos y protección opcional con contraseña para cifrarlos.',
            'faq5_question': '¿Puedo ocultar archivos que no sean texto?',
            'faq5_answer': 'Esta herramienta está diseñada solo para texto. Para ocultar otros tipos de archivos, deberías convertirlos a texto (por ejemplo, usando codificación Base64) antes de ocultarlos.',
            'faq6_question': '¿Por qué falla la decodificación a veces?',
            'faq6_answer': 'La decodificación puede fallar si: la imagen fue comprimida después de la codificación (por ejemplo, por redes sociales), se usó una contraseña incorrecta, la imagen no contiene datos ocultos, o seleccionaste el algoritmo de esteganografía incorrecto.',
            
            // Guía de solución de problemas
            'troubleshooting_title': 'Guía de Solución de Problemas',
            'issue1_title': 'La codificación falla o produce imágenes corruptas',
            'issue1_solution': 'Intenta usar una imagen diferente, preferiblemente un PNG con mayor resolución. Asegúrate de que tu mensaje no sea demasiado grande para la capacidad de la imagen.',
            'issue2_title': 'La decodificación devuelve datos incomprensibles o ningún dato',
            'issue2_solution': 'Verifica que estás usando la contraseña correcta (si se estableció una). Prueba la opción de algoritmo "Detección Automática". Asegúrate de que la imagen no ha sido modificada o comprimida desde la codificación.',
            'issue3_title': 'El navegador se bloquea durante la codificación/decodificación',
            'issue3_solution': 'Esto puede ocurrir con imágenes o mensajes muy grandes. Intenta usar imágenes más pequeñas o dividir tu mensaje en partes más pequeñas.',
            'issue4_title': 'La validación de la frase de recuperación falla',
            'issue4_solution': 'Asegúrate de que todas las palabras estén correctamente escritas y provengan de la lista de palabras BIP39. Verifica que has seleccionado la longitud correcta de frase (12 o 24 palabras).',
            'issue5_title': 'La imagen descargada no contiene el mensaje oculto',
            'issue5_solution': 'Asegúrate de haber descargado la imagen después de la codificación, no la original. Intenta codificar nuevamente y prueba la decodificación antes de compartir la imagen.',
            
            // Pie de página
            'footer_text': 'Esta herramienta funciona completamente en tu navegador. Tus imágenes y textos nunca se suben a ningún servidor.',
            'copyright_text': '© 2023-2024 cloak.',
            'buymeacoffee_text': '☕ Invítame a un café',
            'language_selector': 'Idioma:'
        },
        
        // Deutsch
        'de': {
            // Allgemein
            'app_title': 'cloak: ein besseres Bild-Steganographie-Tool',
            'app_description': 'Verstecken Sie Textnachrichten in Bildern oder extrahieren Sie versteckten Text aus Bildern. Alle Operationen werden in Ihrem Browser ausgeführt, es werden keine Daten hochgeladen.',
            
            // Tabs
            'tab_about': 'Warum Besser',
            'tab_encode': 'Nachricht Codieren',
            'tab_decode': 'Nachricht Decodieren',
            'tab_crypto': 'Krypto-Wallet',
            'tab_tutorial': 'Tutorial',
            'tab_faq': 'FAQ',
            
            // About-Bereich
            'about_title': 'Warum cloak ein besseres Bild-Steganographie-Tool ist',
            'about_subtitle': 'Das sicherste, funktionsreichste und benutzerfreundlichste Steganographie-Tool online verfügbar',
            'feature_security_title': 'Maximale Sicherheit',
            'feature_security_desc': 'Alle Operationen finden in Ihrem Browser statt. Keine Daten werden jemals auf einen Server hochgeladen, was vollständige Privatsphäre und Sicherheit gewährleistet.',
            'feature_multilang_title': 'Mehrsprachige Unterstützung',
            'feature_multilang_desc': 'Verfügbar in 8 Sprachen einschließlich Englisch, Chinesisch, Französisch, Japanisch, Spanisch, Deutsch und Russisch.',
            'feature_algorithms_title': 'Mehrere Algorithmen',
            'feature_algorithms_desc': 'Unterstützt LSB-, DCT- und Patchwork-Steganographie-Algorithmen mit automatischer Erkennung für maximale Kompatibilität.',
            'feature_password_title': 'Passwortschutz',
            'feature_password_desc': 'Optionale Passwort-Verschlüsselung fügt eine zusätzliche Sicherheitsebene zu Ihren versteckten Nachrichten hinzu.',
            'feature_crypto_title': 'Krypto-Wallet-Unterstützung',
            'feature_crypto_desc': 'Spezialisierte Funktionen zum sicheren Verstecken von Kryptowährungs-Private-Keys und Wiederherstellungsphrasen.',
            'feature_usability_title': 'Einfach zu verwenden',
            'feature_usability_desc': 'Intuitive Benutzeroberfläche mit Drag-and-Drop-Unterstützung, Echtzeit-Validierung und umfassenden Tutorials.',
            'comparison_title': 'Warum cloak über andere Tools wählen?',
            'comparison_feature_header': 'Funktion',
            'comparison_cloak_header': 'cloak',
            'comparison_others_header': 'Andere Tools',
            'comparison_browser_based': 'Browser-basiert',
            'comparison_no_upload': 'Kein Daten-Upload',
            'comparison_multi_algo': 'Mehrere Algorithmen',
            'comparison_crypto_support': 'Krypto-Wallet-Unterstützung',
            'comparison_multilang': 'Mehrsprachig',
            'comparison_free': 'Kostenlos & Open Source',
            'cta_title': 'Bereit loszulegen?',
            'cta_description': 'Beginnen Sie sicher Ihre Nachrichten zu verstecken mit dem fortschrittlichsten verfügbaren Steganographie-Tool.',
            'cta_encode': 'Codierung starten',
            'cta_tutorial': 'Tutorial ansehen',
            
            // Codierungsbereich
            'encode_title': 'Eine Nachricht in einem Bild verstecken',
            'encode_description': 'Wählen Sie ein Bild aus, geben Sie den Text ein, den Sie verstecken möchten, und klicken Sie dann auf die Schaltfläche "Codieren". Speichern Sie das generierte Bild, es wird Ihre versteckte Nachricht enthalten.',
            'select_image': 'Bild auswählen:',
            'drop_message': 'Ziehen Sie das Bild hierher oder klicken Sie, um eine Datei auszuwählen',
            'secret_message': 'Geheime Nachricht:',
            'secret_message_placeholder': 'Geben Sie den zu versteckenden Text ein...',
            'password_protection': 'Passwortschutz (Optional):',
            'password_placeholder': 'Geben Sie ein Passwort ein, um Ihre Nachricht zu verschlüsseln...',
            'password_help': 'Das Hinzufügen eines Passworts verschlüsselt Ihre Nachricht für zusätzliche Sicherheit.',
            'show_password': 'Anzeigen',
            'hide_password': 'Verbergen',
            'steg_algorithm': 'Steganographie-Algorithmus:',
            'algo_lsb': 'LSB (Least Significant Bit)',
            'algo_dct': 'DCT (Diskrete Kosinus-Transformation)',
            'algo_patchwork': 'Patchwork',
            'algo_auto': 'Automatische Erkennung',
            'auto_clear': 'Sensible Daten nach der Codierung automatisch löschen',
            'encode_btn': 'Codieren',
            'encoding_result': 'Codierungsergebnis',
            'download_btn': 'Bild Herunterladen',
            
            // Decodierungsbereich
            'decode_title': 'Versteckte Nachricht Extrahieren',
            'decode_description': 'Wählen Sie ein Bild mit einer versteckten Nachricht aus und klicken Sie dann auf die Schaltfläche "Decodieren", um den versteckten Text zu extrahieren.',
            'decode_password': 'Passwort (falls erforderlich):',
            'decode_password_placeholder': 'Geben Sie das Passwort ein, wenn die Nachricht verschlüsselt ist...',
            'decode_btn': 'Decodieren',
            'check_watermark': 'Auf versteckte Inhalte prüfen',
            'decoding_result': 'Decodierungsergebnis',
            'copy_btn': 'Text kopieren',
            'generate_qr': 'QR-Code generieren',
            'download_qr': 'QR-Code herunterladen',
            
            // Krypto-Wallet-Bereich
            'crypto_title': 'Krypto-Wallet-Schutz',
            'crypto_description': 'Verstecken Sie Ihre privaten Schlüssel oder Recovery-Phrasen für Kryptowährungen sicher in einem Bild. Teilen Sie diese Bilder niemals auf öffentlichen Plattformen.',
            'select_type': 'Typ auswählen:',
            'private_key': 'Privater Schlüssel',
            'recovery_phrase': 'Recovery-Phrase (12/24 Wörter)',
            'private_key_label': 'Privater Schlüssel:',
            'private_key_placeholder': 'Geben Sie Ihren privaten Schlüssel ein...',
            'recovery_phrase_label': 'Recovery-Phrase:',
            'phrase_length': 'Phrasenlänge:',
            '12_words': '12 Wörter',
            '24_words': '24 Wörter',
            'validate_phrase': 'Phrase validieren',
            'crypto_password': 'Passwortschutz (Optional):',
            'crypto_password_placeholder': 'Geben Sie ein Passwort ein, um Ihre Wallet-Informationen zu verschlüsseln...',
            'crypto_password_help': 'Das Hinzufügen eines Passworts verschlüsselt Ihre Wallet-Informationen für zusätzliche Sicherheit.',
            'watermark_warning': 'Warnung: Dieses Bild enthält bereits versteckte Daten. Das Codieren neuer Daten wird diese überschreiben.',
            'crypto_encode_btn': 'Wallet-Informationen codieren',
            'crypto_decode_title': 'Wallet-Informationen decodieren',
            'crypto_decode_description': 'Extrahieren Sie zuvor versteckte Wallet-Informationen aus einem Bild.',
            'crypto_decode_btn': 'Wallet-Informationen decodieren',
            
            // Tutorial-Bereich
            'tutorial_title': 'Tutorial und Bedienungsanleitung',
            'what_is_steg': 'Was ist Steganographie?',
            'steg_definition': 'Steganographie ist die Praxis, Informationen in anderen nicht geheimen Daten oder einem physischen Objekt zu verstecken, um die Erkennung zu vermeiden. Dieses Tool ermöglicht es Ihnen, Textnachrichten in Bildern zu verstecken.',
            'features': 'Funktionen',
            'feature_text_hiding': 'Text-Verstecken - Verstecken Sie beliebige Textnachrichten in einem Bild',
            'feature_crypto': 'Krypto-Wallet-Schutz - Speichern Sie Ihre Wallet-Schlüssel und Recovery-Phrasen sicher',
            'feature_browser': 'Browser-basiert - Alle Operationen finden in Ihrem Browser statt, es werden keine Daten an einen Server gesendet',
            'how_to_use': 'Bedienungsanleitung',
            'encoding_instructions': 'Um eine Nachricht zu verstecken:',
            'encoding_step1': 'Wählen Sie den Tab "Nachricht Codieren"',
            'encoding_step2': 'Laden Sie ein Bild hoch (PNG-Format empfohlen)',
            'encoding_step3': 'Geben Sie Ihren geheimen Text ein',
            'encoding_step4': 'Klicken Sie auf "Codieren" und laden Sie das resultierende Bild herunter',
            'decoding_instructions': 'Um eine Nachricht zu extrahieren:',
            'decoding_step1': 'Wählen Sie den Tab "Nachricht Decodieren"',
            'decoding_step2': 'Laden Sie das Bild mit der versteckten Nachricht hoch',
            'decoding_step3': 'Klicken Sie auf "Decodieren", um den versteckten Text anzuzeigen',
            'crypto_instructions': 'Um ein Krypto-Wallet zu schützen:',
            'crypto_step1': 'Wählen Sie den Tab "Krypto-Wallet"',
            'crypto_step2': 'Geben Sie Ihren privaten Schlüssel oder Ihre Recovery-Phrase ein',
            'crypto_step3': 'Laden Sie ein Bild hoch, um Ihre vertraulichen Informationen zu codieren',
            
            // Sicherheitsüberlegungen
            'security_considerations': 'Sicherheitsüberlegungen',
            'security_warning': 'Wichtige Sicherheitshinweise:',
            'security_warning1': 'Dieses Tool verschlüsselt Ihre Daten nicht, es versteckt sie nur. Jeder mit Zugang zum Bild und Kenntnissen über Steganographie könnte potenziell Ihre Nachricht extrahieren.',
            'security_warning2': 'Teilen Sie niemals steganographische Bilder, die sensible Informationen enthalten, in sozialen Medien oder öffentlichen Plattformen, da die Bildkompression die versteckten Daten zerstören könnte.',
            'security_warning3': 'Bewahren Sie immer mehrere Sicherungskopien Ihrer Krypto-Wallet-Informationen mit verschiedenen sicheren Methoden auf.',
            'security_warning4': 'Für maximale Sicherheit verwenden Sie dieses Tool auf einem Offline-Computer, wenn Sie sensible Finanzinformationen verstecken.',
            'security_warning5': 'Das Tool hat eine begrenzte Kapazität zum Verstecken von Daten basierend auf der Bildgröße. Größere Bilder können mehr Daten speichern.',
            
            // Sicherheits-Best-Practices
            'best_practices_title': 'Sicherheits-Best-Practices',
            'best_practice1_title': 'Das richtige Bild wählen',
            'best_practice1': 'Verwenden Sie hochauflösende Bilder mit komplexen Mustern oder vielen Farben, um Ihre Daten effektiver zu verstecken. Bevorzugen Sie das PNG-Format gegenüber JPEG, da die JPEG-Kompression versteckte Daten zerstören kann. Vermeiden Sie die Verwendung beliebter oder erkennbarer Bilder, die Aufmerksamkeit erregen könnten.',
            'best_practice2_title': 'Passwortschutz',
            'best_practice2': 'Verwenden Sie immer starke und einzigartige Passwörter, wenn Sie sensible Informationen verschlüsseln. Kombinieren Sie Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen.',
            'best_practice3_title': 'Sichere Speicherung und Übertragung',
            'best_practice3': 'Speichern Sie steganographische Bilder auf verschlüsselten Festplatten oder sicherem Cloud-Speicher mit starken Passwörtern. Verwenden Sie bei der Übertragung steganographischer Bilder verschlüsselte Kanäle wie Signal, ProtonMail oder andere Ende-zu-Ende-verschlüsselte Dienste. Erwägen Sie, einen anderen Übertragungskanal für das Passwort als für das Bild zu verwenden. Entfernen Sie Metadaten aus Bildern, bevor Sie sensible Informationen codieren, um potenzielle Identifikationsinformationen zu eliminieren.',
            'best_practice4_title': 'Kompression vermeiden',
            'best_practice4': 'Laden Sie niemals steganographische Bilder auf soziale Medien oder Messaging-Plattformen hoch, die Bilder komprimieren, da dies wahrscheinlich die versteckten Daten zerstören wird.',
            'best_practice5_title': 'Mehrfache Sicherungen',
            'best_practice5': 'Bewahren Sie immer mehrere Sicherungskopien Ihrer sensiblen Informationen mit verschiedenen Methoden auf, nicht nur mit Steganographie.',
            'best_practice6_title': 'Zusätzliche Schutzschichten',
            'best_practice6': 'Verwenden Sie immer die Passwortschutzfunktion für sensible Informationen. Erwägen Sie, Ihre Nachricht mit PGP oder anderen Verschlüsselungstools zu verschlüsseln, bevor Sie sie in einem Bild verstecken. Verwenden Sie für Kryptowährungsschlüssel eine BIP39-Passphrase (25. Wort) als zusätzliche Sicherheitsebene. Wechseln Sie regelmäßig die Bilder, die Sie zum Speichern sensibler Informationen verwenden.',
            
            // FAQ-Bereich
            'faq_title': 'Häufig gestellte Fragen',
            'faq1_question': 'Wie viele Daten kann ich in einem Bild verstecken?',
            'faq1_answer': 'Die Datenmenge hängt von der Bildgröße ab. Als Faustregel können Sie etwa 10% der Bildgröße in Bytes verstecken. Zum Beispiel kann ein 1MB-Bild etwa 100KB Text verstecken.',
            'faq2_question': 'Wird das Bild nach dem Verstecken von Daten anders aussehen?',
            'faq2_answer': 'Bei Verwendung der LSB-Steganographie sind die Änderungen für das menschliche Auge in der Regel nicht wahrnehmbar. Eine technische Analyse kann jedoch Modifikationen erkennen. DCT- und Patchwork-Methoden bieten besseren Widerstand gegen Erkennung.',
            'faq3_question': 'Welche Bildformate funktionieren am besten?',
            'faq3_answer': 'PNG wird empfohlen, da es verlustfreie Kompression verwendet. JPEG ist nicht ideal, da sein Kompressionsalgorithmus versteckte Daten zerstören kann. BMP und TIFF funktionieren ebenfalls gut, führen aber zu größeren Dateien.',
            'faq4_question': 'Ist Steganographie dasselbe wie Verschlüsselung?',
            'faq4_answer': 'Nein. Steganographie verbirgt die Existenz der Daten, während Verschlüsselung die Daten unlesbar macht. Dieses Tool bietet beides: Steganographie zum Verstecken der Daten und optionalen Passwortschutz zum Verschlüsseln.',
            'faq5_question': 'Kann ich andere Dateien als Text verstecken?',
            'faq5_answer': 'Dieses Tool ist nur für Text konzipiert. Um andere Dateitypen zu verstecken, sollten Sie sie vor dem Verstecken in Text umwandeln (z.B. mit Base64-Kodierung).',
            'faq6_question': 'Warum schlägt die Decodierung manchmal fehl?',
            'faq6_answer': 'Die Decodierung kann fehlschlagen, wenn: das Bild nach der Kodierung komprimiert wurde (z.B. durch soziale Medien), ein falsches Passwort verwendet wurde, das Bild keine versteckten Daten enthält oder Sie den falschen Steganographie-Algorithmus ausgewählt haben.',
            
            // Fehlerbehebungsleitfaden
            'troubleshooting_title': 'Fehlerbehebungsleitfaden',
            'issue1_title': 'Die Kodierung schlägt fehl oder erzeugt beschädigte Bilder',
            'issue1_solution': 'Versuchen Sie, ein anderes Bild zu verwenden, vorzugsweise ein PNG mit höherer Auflösung. Stellen Sie sicher, dass Ihre Nachricht nicht zu groß für die Kapazität des Bildes ist.',
            'issue2_title': 'Die Decodierung gibt unverständliche Daten oder keine Daten zurück',
            'issue2_solution': 'Überprüfen Sie, ob Sie das richtige Passwort verwenden (falls eines festgelegt wurde). Probieren Sie die Algorithmusoption "Automatische Erkennung". Stellen Sie sicher, dass das Bild seit der Kodierung nicht verändert oder komprimiert wurde.',
            'issue3_title': 'Der Browser stürzt während der Kodierung/Decodierung ab',
            'issue3_solution': 'Dies kann bei sehr großen Bildern oder Nachrichten auftreten. Versuchen Sie, kleinere Bilder zu verwenden oder Ihre Nachricht in kleinere Teile aufzuteilen.',
            'issue4_title': 'Die Validierung der Recovery-Phrase schlägt fehl',
            'issue4_solution': 'Stellen Sie sicher, dass alle Wörter korrekt geschrieben sind und aus der BIP39-Wortliste stammen. Überprüfen Sie, ob Sie die richtige Phrasenlänge (12 oder 24 Wörter) ausgewählt haben.',
            'issue5_title': 'Das heruntergeladene Bild enthält nicht die versteckte Nachricht',
            'issue5_solution': 'Stellen Sie sicher, dass Sie das Bild nach der Kodierung heruntergeladen haben, nicht das Original. Versuchen Sie, erneut zu kodieren und testen Sie die Decodierung, bevor Sie das Bild teilen.',
            
            // Fußzeile
            'footer_text': 'Dieses Tool läuft vollständig in Ihrem Browser. Ihre Bilder und Texte werden niemals auf einen Server hochgeladen.',
            'copyright_text': '© 2023-2024 cloak.',
            'buymeacoffee_text': '☕ Spendiere mir einen Kaffee',
            'language_selector': 'Sprache:'
        },
        
        // Русский
        'ru': {
            // Общее
            'app_title': 'cloak: улучшенный инструмент стеганографии изображений',
            'app_description': 'Скрывайте текстовые сообщения в изображениях или извлекайте скрытый текст из изображений. Все операции выполняются в вашем браузере, данные не загружаются.',
            
            // Вкладки
            'tab_about': 'Почему Лучше',
            'tab_encode': 'Кодировать Сообщение',
            'tab_decode': 'Декодировать Сообщение',
            'tab_crypto': 'Крипто Кошелек',
            'tab_tutorial': 'Руководство',
            'tab_faq': 'Часто Задаваемые Вопросы',
            
            // Раздел About
            'about_title': 'Почему cloak - лучший инструмент стеганографии изображений',
            'about_subtitle': 'Самый безопасный, функциональный и удобный инструмент стеганографии, доступный онлайн',
            'feature_security_title': 'Максимальная безопасность',
            'feature_security_desc': 'Все операции происходят в вашем браузере. Никакие данные никогда не загружаются на сервер, обеспечивая полную конфиденциальность и безопасность.',
            'feature_multilang_title': 'Многоязычная поддержка',
            'feature_multilang_desc': 'Доступен на 8 языках, включая английский, китайский, французский, японский, испанский, немецкий и русский.',
            'feature_algorithms_title': 'Множественные алгоритмы',
            'feature_algorithms_desc': 'Поддерживает алгоритмы стеганографии LSB, DCT и Patchwork с автоматическим определением для максимальной совместимости.',
            'feature_password_title': 'Защита паролем',
            'feature_password_desc': 'Дополнительное шифрование паролем добавляет дополнительный уровень безопасности к вашим скрытым сообщениям.',
            'feature_crypto_title': 'Поддержка крипто-кошелька',
            'feature_crypto_desc': 'Специализированные функции для безопасного скрытия приватных ключей криптовалют и фраз восстановления.',
            'feature_usability_title': 'Простота использования',
            'feature_usability_desc': 'Интуитивный интерфейс с поддержкой перетаскивания, проверкой в реальном времени и подробными руководствами.',
            'comparison_title': 'Почему выбрать cloak вместо других инструментов?',
            'comparison_feature_header': 'Функция',
            'comparison_cloak_header': 'cloak',
            'comparison_others_header': 'Другие инструменты',
            'comparison_browser_based': 'Браузерный',
            'comparison_no_upload': 'Без загрузки данных',
            'comparison_multi_algo': 'Множественные алгоритмы',
            'comparison_crypto_support': 'Поддержка крипто-кошелька',
            'comparison_multilang': 'Многоязычный',
            'comparison_free': 'Бесплатный и открытый',
            'cta_title': 'Готовы начать?',
            'cta_description': 'Начните безопасно скрывать ваши сообщения с самым продвинутым доступным инструментом стеганографии.',
            'cta_encode': 'Начать кодирование',
            'cta_tutorial': 'Посмотреть руководство',
            
            // Раздел кодирования
            'encode_title': 'Скрыть Сообщение в Изображении',
            'encode_description': 'Выберите изображение, введите текст, который вы хотите скрыть, затем нажмите кнопку "Кодировать". Сохраните сгенерированное изображение, оно будет содержать ваше скрытое сообщение.',
            'select_image': 'Выбрать Изображение:',
            'drop_message': 'Перетащите изображение сюда или нажмите, чтобы выбрать файл',
            'secret_message': 'Секретное Сообщение:',
            'secret_message_placeholder': 'Введите текст для скрытия...',
            'password_protection': 'Защита Паролем (Опционально):',
            'password_placeholder': 'Введите пароль для шифрования вашего сообщения...',
            'password_help': 'Добавление пароля зашифрует ваше сообщение для дополнительной безопасности.',
            'show_password': 'Показать',
            'hide_password': 'Скрыть',
            'steg_algorithm': 'Алгоритм Стеганографии:',
            'algo_lsb': 'LSB (Наименее Значимый Бит)',
            'algo_dct': 'DCT (Дискретное Косинусное Преобразование)',
            'algo_patchwork': 'Лоскутный',
            'algo_auto': 'Автоматическое Определение',
            'auto_clear': 'Автоматически очищать конфиденциальные данные после кодирования',
            'encode_btn': 'Кодировать',
            'encoding_result': 'Результат Кодирования',
            'download_btn': 'Скачать Изображение',
            
            // Раздел декодирования
            'decode_title': 'Извлечь Скрытое Сообщение',
            'decode_description': 'Выберите изображение со скрытым сообщением, затем нажмите кнопку "Декодировать", чтобы извлечь скрытый текст.',
            'decode_password': 'Пароль (если требуется):',
            'decode_password_placeholder': 'Введите пароль, если сообщение зашифровано...',
            'decode_btn': 'Декодировать',
            'check_watermark': 'Проверить на скрытое содержимое',
            'decoding_result': 'Результат Декодирования',
            'copy_btn': 'Копировать Текст',
            'generate_qr': 'Создать QR-код',
            'download_qr': 'Скачать QR-код',
            
            // Раздел крипто кошелька
            'crypto_title': 'Защита Крипто Кошелька',
            'crypto_description': 'Безопасно скрывайте ваши приватные ключи или фразы восстановления криптовалюты в изображении. Никогда не делитесь этими изображениями на публичных платформах.',
            'select_type': 'Выберите тип:',
            'private_key': 'Приватный Ключ',
            'recovery_phrase': 'Фраза Восстановления (12/24 слова)',
            'private_key_label': 'Приватный Ключ:',
            'private_key_placeholder': 'Введите ваш приватный ключ...',
            'recovery_phrase_label': 'Фраза Восстановления:',
            'phrase_length': 'Длина фразы:',
            '12_words': '12 слов',
            '24_words': '24 слова',
            'validate_phrase': 'Проверить фразу',
            'crypto_password': 'Защита паролем (Опционально):',
            'crypto_password_placeholder': 'Введите пароль для шифрования информации о вашем кошельке...',
            'crypto_password_help': 'Добавление пароля зашифрует информацию о вашем кошельке для дополнительной безопасности.',
            'watermark_warning': 'Предупреждение: Это изображение уже содержит скрытые данные. Кодирование новых данных перезапишет их.',
            'crypto_encode_btn': 'Кодировать Информацию о Кошельке',
            'crypto_decode_title': 'Декодировать Информацию о Кошельке',
            'crypto_decode_description': 'Извлеките ранее скрытую информацию о кошельке из изображения.',
            'crypto_decode_btn': 'Декодировать Информацию о Кошельке',
            
            // Раздел руководства
            'tutorial_title': 'Руководство и Инструкция по Использованию',
            'what_is_steg': 'Что Такое Стеганография?',
            'steg_definition': 'Стеганография — это практика скрытия информации в других несекретных данных или физическом объекте для избежания обнаружения. Этот инструмент позволяет вам скрывать текстовые сообщения в изображениях.',
            'features': 'Функции',
            'feature_text_hiding': 'Скрытие Текста - Скрывайте любые текстовые сообщения в изображении',
            'feature_crypto': 'Защита Крипто Кошелька - Безопасно храните ключи кошелька и фразы восстановления',
            'feature_browser': 'На Основе Браузера - Все операции происходят в вашем браузере, данные не отправляются на сервер',
            'how_to_use': 'Инструкция по Использованию',
            'encoding_instructions': 'Чтобы скрыть сообщение:',
            'encoding_step1': 'Выберите вкладку "Кодировать Сообщение"',
            'encoding_step2': 'Загрузите изображение (рекомендуется формат PNG)',
            'encoding_step3': 'Введите ваш секретный текст',
            'encoding_step4': 'Нажмите "Кодировать" и скачайте полученное изображение',
            'decoding_instructions': 'Чтобы извлечь сообщение:',
            'decoding_step1': 'Выберите вкладку "Декодировать Сообщение"',
            'decoding_step2': 'Загрузите изображение со скрытым сообщением',
            'decoding_step3': 'Нажмите "Декодировать", чтобы отобразить скрытый текст',
            'crypto_instructions': 'Чтобы защитить крипто кошелек:',
            'crypto_step1': 'Выберите вкладку "Крипто Кошелек"',
            'crypto_step2': 'Введите ваш приватный ключ или фразу восстановления',
            'crypto_step3': 'Загрузите изображение для кодирования вашей конфиденциальной информации',
            
            // Соображения Безопасности
            'security_considerations': 'Соображения Безопасности',
            'security_warning': 'Важные предупреждения о безопасности:',
            'security_warning1': 'Этот инструмент не шифрует ваши данные, он только скрывает их. Любой, имеющий доступ к изображению и знания о стеганографии, потенциально может извлечь ваше сообщение.',
            'security_warning2': 'Никогда не делитесь стеганографическими изображениями, содержащими конфиденциальную информацию, в социальных сетях или на публичных платформах, так как сжатие изображений может уничтожить скрытые данные.',
            'security_warning3': 'Всегда храните несколько резервных копий информации о вашем крипто кошельке с использованием различных безопасных методов.',
            'security_warning4': 'Для максимальной безопасности используйте этот инструмент на офлайн-компьютере при скрытии конфиденциальной финансовой информации.',
            'security_warning5': 'Инструмент имеет ограниченную емкость для скрытия данных в зависимости от размера изображения. Более крупные изображения могут хранить больше данных.',
            
            // Лучшие Практики Безопасности
            'best_practices_title': 'Лучшие Практики Безопасности',
            'best_practice1_title': 'Выбор правильного изображения',
            'best_practice1': 'Используйте изображения высокого разрешения со сложными узорами или множеством цветов для более эффективного скрытия данных. Предпочитайте формат PNG вместо JPEG, так как сжатие JPEG может уничтожить скрытые данные. Избегайте использования популярных или узнаваемых изображений, которые могут привлечь внимание.',
            'best_practice2_title': 'Защита паролем',
            'best_practice2': 'Всегда используйте сильные и уникальные пароли при шифровании конфиденциальной информации. Комбинируйте заглавные и строчные буквы, цифры и специальные символы.',
            'best_practice3_title': 'Безопасное хранение и передача',
            'best_practice3': 'Храните стеганографические изображения на зашифрованных жестких дисках или в безопасном облачном хранилище с сильными паролями. При передаче стеганографических изображений используйте зашифрованные каналы, такие как Signal, ProtonMail или другие сервисы с сквозным шифрованием. Рассмотрите возможность использования другого канала передачи для пароля, отличного от изображения. Удаляйте метаданные из изображений перед кодированием конфиденциальной информации, чтобы устранить потенциальную идентификационную информацию.',
            'best_practice4_title': 'Избегайте сжатия',
            'best_practice4': 'Никогда не загружайте стеганографические изображения в социальные сети или на платформы обмена сообщениями, которые сжимают изображения, так как это, вероятно, уничтожит скрытые данные.',
            'best_practice5_title': 'Множественные резервные копии',
            'best_practice5': 'Всегда храните несколько резервных копий вашей конфиденциальной информации с использованием различных методов, не только стеганографии.',
            'best_practice6_title': 'Дополнительные слои защиты',
            'best_practice6': 'Всегда используйте функцию защиты паролем для конфиденциальной информации. Рассмотрите возможность шифрования вашего сообщения с помощью PGP или других инструментов шифрования перед его скрытием в изображении. Для ключей криптовалюты используйте парольную фразу BIP39 (25-е слово) в качестве дополнительного уровня безопасности. Регулярно меняйте изображения, которые вы используете для хранения конфиденциальной информации.',
            
            // Раздел FAQ
            'faq_title': 'Часто Задаваемые Вопросы',
            'faq1_question': 'Сколько данных я могу скрыть в изображении?',
            'faq1_answer': 'Количество данных зависит от размера изображения. Как правило, вы можете скрыть около 10% от размера изображения в байтах. Например, изображение размером 1МБ может скрыть около 100КБ текста.',
            'faq2_question': 'Будет ли изображение выглядеть иначе после скрытия данных?',
            'faq2_answer': 'При использовании стеганографии LSB изменения обычно не заметны для человеческого глаза. Однако технический анализ может обнаружить модификации. Методы DCT и Patchwork обеспечивают лучшую устойчивость к обнаружению.',
            'faq3_question': 'Какие форматы изображений работают лучше всего?',
            'faq3_answer': 'Рекомендуется PNG, так как он использует сжатие без потерь. JPEG не идеален, так как его алгоритм сжатия может уничтожить скрытые данные. BMP и TIFF также хорошо работают, но приводят к более крупным файлам.',
            'faq4_question': 'Стеганография — это то же самое, что и шифрование?',
            'faq4_answer': 'Нет. Стеганография скрывает существование данных, в то время как шифрование делает данные нечитаемыми. Этот инструмент предлагает оба: стеганографию для скрытия данных и опциональную защиту паролем для шифрования.',
            'faq5_question': 'Могу ли я скрывать другие файлы, кроме текста?',
            'faq5_answer': 'Этот инструмент предназначен только для текста. Чтобы скрыть другие типы файлов, вам следует преобразовать их в текст перед скрытием (например, с помощью кодирования Base64).',
            'faq6_question': 'Почему декодирование иногда не удается?',
            'faq6_answer': 'Декодирование может не удаться, если: изображение было сжато после кодирования (например, через социальные сети), использовался неверный пароль, изображение не содержит скрытых данных, или вы выбрали неправильный алгоритм стеганографии.',
            
            // Руководство по устранению неполадок
            'troubleshooting_title': 'Руководство по Устранению Неполадок',
            'issue1_title': 'Кодирование не удается или создает поврежденные изображения',
            'issue1_solution': 'Попробуйте использовать другое изображение, предпочтительно PNG с более высоким разрешением. Убедитесь, что ваше сообщение не слишком велико для емкости изображения.',
            'issue2_title': 'Декодирование возвращает непонятные данные или не возвращает данные',
            'issue2_solution': 'Проверьте, используете ли вы правильный пароль (если он был установлен). Попробуйте опцию алгоритма "Автоматическое Определение". Убедитесь, что изображение не было изменено или сжато после кодирования.',
            'issue3_title': 'Браузер зависает во время кодирования/декодирования',
            'issue3_solution': 'Это может происходить при очень больших изображениях или сообщениях. Попробуйте использовать изображения меньшего размера или разделить ваше сообщение на более мелкие части.',
            'issue4_title': 'Проверка фразы восстановления не удается',
            'issue4_solution': 'Убедитесь, что все слова написаны правильно и взяты из списка слов BIP39. Проверьте, выбрали ли вы правильную длину фразы (12 или 24 слова).',
            'issue5_title': 'Загруженное изображение не содержит скрытого сообщения',
            'issue5_solution': 'Убедитесь, что вы загрузили изображение после кодирования, а не оригинал. Попробуйте закодировать снова и проверьте декодирование перед тем, как делиться изображением.',
            
            // Нижний колонтитул
            'footer_text': 'Этот инструмент работает полностью в вашем браузере. Ваши изображения и тексты никогда не загружаются на какой-либо сервер.',
            'copyright_text': '© 2023-2024 cloak.',
            'buymeacoffee_text': '☕ Угостите меня кофе',
            'language_selector': 'Язык:'
        }
    },
    
    /**
     * 初始化多语言支持
     */
    init: function() {
        // 从本地存储中获取保存的语言设置
        const savedLanguage = localStorage.getItem('preferred_language');
        if (savedLanguage && this.supportedLanguages[savedLanguage]) {
            this.currentLanguage = savedLanguage;
        } else {
            // 尝试从浏览器语言设置中检测语言
            const browserLang = navigator.language.split('-')[0];
            if (this.supportedLanguages[browserLang]) {
                this.currentLanguage = browserLang;
            }
        }
        
        // 添加语言选择器到页面
        this.addLanguageSelector();
        
        // 应用当前语言翻译
        this.applyTranslations();
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
    changeLanguage: function(langCode) {
        if (this.supportedLanguages[langCode]) {
            // 保存新的语言选择到本地存储
            this.currentLanguage = langCode;
            localStorage.setItem('preferred_language', langCode);

            // 保持顶部语言下拉状态与当前语言一致
            const languageSelect = document.getElementById('language-select');
            if (languageSelect && languageSelect.value !== langCode) {
                languageSelect.value = langCode;
            }

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
        const translations = this.translations[this.currentLanguage];
        return translations && translations[key] ? translations[key] : key;
    },
    
    /**
     * 应用翻译到页面元素
     */
    applyTranslations: function() {
        // 更新页面标题
        document.title = this.t('app_title');
        
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
