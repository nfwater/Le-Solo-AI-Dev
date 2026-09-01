# X 推文转 PDF

将 X（Twitter）图文推文分享链接转为可分享的 PDF 文件。**仅处理文字和图片，不含视频。**

## 推荐：Safari 网页版（无需导入快捷指令）

iPhone **不支持导入未签名的 `.shortcut` 文件**（会提示「不支持导入未签名的快捷指令文件」）。

请改用网页版：

**https://nfwater.github.io/Le-Solo-AI-Dev/**

1. iPhone Safari 打开上面链接（可添加到主屏幕）
2. 在 X App **复制链接**
3. 网页点 **粘贴链接** → **生成 PDF**
4. 保存或分享 PDF

---

## 快捷指令版（需 Mac 签名后才能导入）

以下 `.shortcut` 文件在未签名时，**无法在 iPhone 上直接导入**。

若有 Mac，可在终端签名后再传到 iPhone：

```bash
shortcuts sign --mode anyone --input X-Tweet-To-PDF.shortcut --output signed.shortcut
```

## 安装（iPhone / iPad）

1. 在 iPhone 上打开本目录中的 **`X推文转PDF.shortcut`** 文件  
   - 可从 GitHub 下载后存到「文件」App  
   - 或通过 AirDrop / iCloud 传到手机  
2. 轻点文件，系统会打开「快捷指令」并提示 **添加**  
3. 点 **添加快捷指令** 即可

> **说明：** Apple 对快捷指令文件有签名限制。若提示「无法导入」或「未签名」，请见下方 [无法导入？](#无法导入)。

## 使用方法

### 方式 A：复制链接后运行（推荐）

1. 在 X App 中打开推文 → **分享** → **复制链接**
2. 运行快捷指令 **X推文转PDF**
3. 在分享面板中选择：**存储到“文件”** / **AirDrop** / **微信** 等

### 方式 B：从分享菜单运行

安装后可在 X 的分享菜单中找到此快捷指令（已配置接收 URL）。

## 支持范围

| 支持 | 不支持 |
|------|--------|
| 公开推文 | 需登录才能查看的推文 |
| 正文文字 | 视频内容 |
| 1–4 张图片 | 纯 Spaces / 直播 |

## 无法导入？

Apple 从 iOS 15 起要求快捷指令文件经签名才能通过链接一键导入。若 `.shortcut` 无法直接添加，可尝试：

1. **用 Mac 签名（推荐）**  
   在 Mac 终端执行（需登录 iCloud）：
   ```bash
   shortcuts sign --mode anyone --input X推文转PDF.shortcut --output X推文转PDF-已签名.shortcut
   ```
   将签名后的文件传到 iPhone 再导入。

2. **从「文件」App 打开**  
   部分系统版本仍允许在「文件」中直接打开未签名的 `.shortcut`。

3. **自行编译**（开发者）  
   ```bash
   npx -y scpl-cli ios-shortcuts/X推文转PDF.scpl -o X推文转PDF.shortcut
   ./ios-shortcuts/build-shortcut.sh
   ```

## 技术说明

- 通过 [FxTwitter API](https://docs.fxembed.com/api/introduction/) 获取推文正文与图片
- 本地拼接 HTML 后生成 PDF，数据不经过第三方服务器（除 FxTwitter 拉取推文）

## 文件说明

| 文件 | 说明 |
|------|------|
| `X推文转PDF.shortcut` | 可直接导入 iOS 的快捷指令文件 |
| `X推文转PDF.scpl` | 源代码（ScPL 格式） |
| `build-shortcut.sh` | 从源码重新编译脚本 |
