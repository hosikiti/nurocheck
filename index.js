const URL = process.env.URL;
const SLACK_HOOK_URL = process.env.SLACK_HOOK_URL;
const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);
  await page.waitFor(3000);
  await page.click("input#input");
  await page.waitFor(3000);

  const el = await page.$(".var-01");
  if (!el) {
    notifyToSlack("Nuro 光の予約ができるようになったかも...");
    await browser.close();
  } else {
    const message = await (await el.getProperty("textContent")).jsonValue();
    if (message.indexOf("時間帯がありません") >= 0) {
      notifyToSlack("Nuro光の予約は空いていません");
    } else {
      notifyToSlack("Nuro光の予約ができるようになったかも！");
    }
  }
  await browser.close();
})();

const notifyToSlack = (msg) => {
  if (!SLACK_HOOK_URL) {
    return; // do nothing
  }

  var request = require("request");
  var options = {
    uri: SLACK_HOOK_URL,
    headers: {
      "Content-type": "application/json",
    },
    json: {
      text: msg,
    },
  };
  request.post(options, function (error, response, body) {});
};
