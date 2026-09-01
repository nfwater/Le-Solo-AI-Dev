// X 推文转 PDF（Scriptable 版）
// 无需签名，无需导入快捷指令

const TEXT = {
  invalid: "剪贴板里没有有效的 X 链接\n需要包含 /status/数字",
  fetching: "正在获取推文…",
  fail: "失败：",
};

async function showAlert(title, message) {
  const a = new Alert();
  a.title = title;
  a.message = message;
  a.addAction("好");
  await a.present();
}

async function main() {
  const link = Pasteboard.paste().trim();
  const id = (link.match(/status\/(\d+)/) || [])[1];
  if (!id) {
    await showAlert("提示", TEXT.invalid);
    return;
  }

  console.log(TEXT.fetching);

  let tweet;
  try {
    const req = new Request(`https://api.vxtwitter.com/status/${id}`);
    tweet = await req.loadJSON();
    if (!tweet || !tweet.text) throw new Error("推文不存在");
  } catch (e) {
    await showAlert("错误", TEXT.fail + e.message);
    return;
  }

  const photos = (tweet.media_extended || []).filter((m) => m.type === "image");
  let imgs = "";
  for (const p of photos) {
    try {
      const imgReq = new Request(p.url);
      const b64 = Data.fromData(await imgReq.load()).toBase64String();
      imgs += `<img src="data:image/jpeg;base64,${b64}">`;
    } catch {
      imgs += `<p style="color:#999">[图片加载失败]</p>`;
    }
  }

  const esc = (s) =>
    String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
body{font-family:-apple-system,sans-serif;padding:32px;max-width:620px;margin:0 auto;color:#111}
.name{font-size:20px;font-weight:700}.handle{color:#666;font-size:14px;margin-top:4px}
.content{font-size:16px;line-height:1.6;white-space:pre-wrap;margin:20px 0}
img{max-width:100%;display:block;margin:16px 0;border-radius:8px}
.footer{color:#999;font-size:12px;margin-top:24px;border-top:1px solid #eee;padding-top:12px}
</style></head><body>
<div class="name">${esc(tweet.user_name)}</div>
<div class="handle">@${esc(tweet.user_screen_name)}</div>
<div class="content">${esc(tweet.text)}</div>
${imgs}
<div class="footer">来源：${esc(tweet.tweetURL)}<br>发布时间：${esc(tweet.date)}</div>
</body></html>`;

  const fm = FileManager.iCloud();
  const dir = fm.joinPath(fm.documentsDirectory(), "X-PDF");
  if (!fm.isDirectory(dir)) fm.createDirectory(dir, true);
  const htmlPath = fm.joinPath(dir, `tweet_${id}.html`);
  fm.writeString(htmlPath, html);

  Safari.open(fm.fileURL(htmlPath));

  const done = new Alert();
  done.title = "下一步";
  done.message =
    "页面已在 Safari 打开\n\n点 Safari 底部分享按钮 → 打印 → 双指放大预览 → 再点分享 → 存储到文件\n\n即可得到 PDF";
  done.addAction("知道了");
  await done.present();
}

await main();
