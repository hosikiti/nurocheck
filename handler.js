const checker = require("./checker");
const slack = require("./slack");
const fs = require("fs");
const puppeteer = require("puppeteer");
var getos = require("getos");
const childProcess = require("child_process");

module.exports = async (event, context) => {
  const spawn = childProcess.spawn("apk", [
    "add --no-cache nss freetype freetype-dev harfbuzz ca-certificates ttf-freefont",
  ]);

  spawn.stdout.on("data", (data) => {
    console.log("STDOUT", data.toString()); // Stream
  });
  spawn.stderr.on("data", (data) => {
    console.log("STDERR", data.toString()); // Stream
  });
  spawn.on("close", (code) => {
    console.log("CODE", code);
  });
  context.status(200).succeed({ result: true });

  // const result = {
  //   status: "Nuro check done!",
  // };

  // context.status(200).succeed(result);
};
