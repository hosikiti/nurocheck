const URL = process.env.URL;
const puppeteer = require("puppeteer-core");
const NoticeMessage = "Nuro光の予約ができるようになったかも！";
const slack = require("./slack");
const chromium = require("chromium");

const check = async () => {
  const browser = await puppeteer.launch({
    executablePath: chromium.path,
  });
  const page = await browser.newPage();
  await page.goto(URL);
  await page.waitFor(3000);
  await page.click("input#input");
  await page.waitFor(3000);

  const el = await page.$(".var-01");
  if (!el) {
    slack.notify(NoticeMessage);
    await browser.close();
  } else {
    const message = await (await el.getProperty("textContent")).jsonValue();
    if (
      message.indexOf(
        "混雑のため、表示可能な期間内に、ご予約可能な時間帯がありません"
      ) < 0
    ) {
      slack.notify(NoticeMessage);
    } else {
      slack.notify("予約不可です orz...");
    }
  }
  await browser.close();
};

module.exports = check;
