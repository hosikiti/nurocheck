const checker = require("./checker");

try {
  checker.check(process.env.CHROME_PATH);
} catch (err) {
  console.error("check error: ", String(err));
  process.exit(1);
}
