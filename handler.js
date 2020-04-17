const checker = require("./checker");
const slack = require("./slack");
const fs = require("fs");
const chromium = require("chromium");
const puppeteer = require("puppeteer-core");

module.exports = async (event, context) => {
  try {
    console.log("LAUNCH CHROME!!!");
    const PUPPETEER_OPTIONS = {
      executablePath: chromium.path,
      headless: true,
      args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--timeout=30000",
        "--no-first-run",
        "--no-sandbox",
        "--no-zygote",
        "--single-process",
        "--proxy-server='direct://'",
        "--proxy-bypass-list=*",
        "--deterministic-fetch",
      ],
    };

    const browser = await puppeteer.launch(PUPPETEER_OPTIONS);

    // // await checker.check();
    context.status(200).succeed({
      status: "done",
    });
  } catch (err) {
    context.status(200).succeed({
      status: "Browser failed" + `[path: ${chromium.path}]` + String(err),
    });
    return;
  }

  // const result = {
  //   status: "Nuro check done!",
  // };

  // context.status(200).succeed(result);
};
