const checker = require("./checker");
const slack = require("./slack");
const fs = require("fs");

module.exports = async (event, context) => {
  try {
    const chromium = require("chromium");
    const { execFile } = require("child_process");
    // await checker.check();

    execFile(chromium.path, ["https://google.com"], (err, stdout, stderr) => {
      context.status(200).succeed({
        path: chromium.path,
        exists: fs.existsSync(chromium.path),
        stdout: stdout,
        stderr: stderr,
        err: err,
      });
      return;
      console.log("Hello Google!", err);
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
