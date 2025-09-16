# 图片隐写术工具 | Image Steganography Tool

这是一个基于浏览器的图片隐写术工具，可以在图片中隐藏文字信息，或从图片中提取隐藏的文字。所有操作都在浏览器中完成，不会上传任何数据。

This is a browser-based image steganography tool that can hide text messages in images or extract hidden text from images. All operations are performed in your browser, no data is uploaded.

## 功能特点

- 在图片中隐藏文字信息
- 从图片中提取隐藏的文字
- 完全在浏览器中运行，保护隐私
- 响应式设计，适配各种设备

## 技术实现

本项目使用纯HTML、CSS和JavaScript实现，不依赖任何外部库。隐写术的核心原理是利用图片像素的最低有效位(LSB)来存储信息，这种方法对图片的视觉效果影响极小，肉眼几乎无法察觉。

## 本地运行

1. 克隆或下载本仓库
2. 使用任意HTTP服务器提供静态文件服务
   - 例如使用Python：`python -m http.server 8000`
   - 或使用Node.js：`npx serve`
3. 在浏览器中访问对应地址（如 http://localhost:8000）

## Cloudflare Workers部署

### 前提条件

- 拥有Cloudflare账户
- 安装Wrangler CLI工具：`npm install -g @cloudflare/wrangler`

### 部署步骤

1. 登录Wrangler：
   ```
   wrangler login
   ```

2. 编辑`wrangler.toml`文件，填写您的Cloudflare账户信息：
   - `account_id`：您的Cloudflare账户ID
   - `route`：您希望部署的域名路径
   - `zone_id`：您的Cloudflare区域ID

3. 初始化Workers站点：
   ```
   wrangler generate --site
   ```

4. 发布到Cloudflare Workers：
   ```
   wrangler publish
```

## SEO优化指南

本项目已经实施了以下SEO优化措施：

1. **元标签优化**
   - 添加了描述性的title标签
   - 添加了meta description和keywords
   - 实现了Open Graph和Twitter Card标签

2. **结构化数据**
   - 添加了JSON-LD结构化数据，帮助搜索引擎理解网站内容

3. **技术优化**
   - 创建了sitemap.xml和robots.txt
   - 添加了规范链接(canonical URL)
   - 实现了服务器缓存控制
   - 添加了PWA支持

4. **部署后优化建议**
   - 注册Google Search Console和Bing Webmaster Tools
   - 提交sitemap.xml到搜索引擎
   - 监控网站性能和搜索排名
   - 定期更新内容，保持网站活跃
   - 获取高质量的反向链接

5. **性能优化**
   - 压缩图片和CSS/JS文件
   - 启用浏览器缓存
   - 使用CDN加速内容分发

## 使用说明

### 编码（隐藏信息）

1. 点击"编码信息"标签
2. 选择一张图片（建议使用PNG格式）
3. 在文本框中输入要隐藏的信息
4. 点击"编码"按钮
5. 等待处理完成后，点击"下载图片"保存结果

### 解码（提取信息）

1. 点击"解码信息"标签
2. 选择一张包含隐藏信息的图片
3. 点击"解码"按钮
4. 等待处理完成后，隐藏的信息将显示在文本框中
5. 可以点击"复制文字"按钮复制结果

## 注意事项

- 图片必须足够大以容纳所有文字信息
- 建议使用PNG格式，因为JPEG等有损压缩格式可能会破坏隐藏的信息
- 编码后的图片不要进行编辑或压缩，否则可能导致信息丢失

## 隐私声明

本工具完全在浏览器中运行，不会将您的图片或文字信息上传到任何服务器。所有处理都在您的本地设备上完成。