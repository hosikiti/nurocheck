const URL = process.env.URL;
const puppeteer = require("puppeteer");
const NoticeMessage = "Nuro光の予約ができるようになったかも！";
const slack = require("./slack");

const check = async (chromePath) => {
  console.log("open browser");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  console.log("goto url");
  await page.goto(URL);
  await page.waitFor(3000);
  console.log("click element");
  await page.waitForSelector("input#input", { timeout: 10000 });
  await page.click("input#input");
  page.waitFor(3000);
  console.log("check message...");
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
  console.log("browser close done");
};

module.exports = {
  check: check,
};
