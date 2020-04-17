const checker = require("./checker");
const slack = require("./slack");

module.exports = async (event, context) => {
  try {
    // await checker.check();

    const chromium = require("chromium");
    const { execFile } = require("child_process");

    execFile(chromium.path, ["https://google.com"], (err) => {
      console.log("Hello Google!", err);
    });
  } catch (err) {
    context.status(200).succeed({
      status: "Browser failed" + `[path: ${chromium.path}]` + String(err),
    });
    return;
  }

  const result = {
    status: "Nuro check done!",
  };

  context.status(200).succeed(result);
};
