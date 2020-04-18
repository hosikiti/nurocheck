const checker = require("./checker");
const slack = require("./slack");
const fs = require("fs");
const puppeteer = require("puppeteer");

module.exports = async (event, context) => {
  try {
    console.log("LAUNCH CHROME!!!");

    const PUPPETEER_OPTIONS = {
      // executablePath: chromium.path,
      // headless: true,
      args: [
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        // "--timeout=30000",
        // "--no-first-run",
        // "--no-zygote",
        // "--single-process",
        // "--proxy-server='direct://'",
        // "--proxy-bypass-list=*",
        // "--deterministic-fetch",
      ],
    };

    const browser = await puppeteer.launch(PUPPETEER_OPTIONS);
    const page = await browser.newPage();
    await page.goto("https://www.google.com");
    console.log("title", await page.title());
    process.exit(0);
    return;

    // const { execFile } = require("child_process");

    // execFile(chromium.path, ["--version"], (err) => {
    //   console.log("Hello Google!", err);
    // });

    // // await checker.check();
    // context.status(200).succeed({
    //   status: "done",
    // });
  } catch (err) {
    console.error(err);
    return;
  }

  // const result = {
  //   status: "Nuro check done!",
  // };

  // context.status(200).succeed(result);
};
