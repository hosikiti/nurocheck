const checker = require("./checker");
const slack = require("./slack");

module.exports = async (event, context) => {
  try {
    await checker.check();
  } catch (err) {
    context.status(200).succeed({
      status: "Browser failed" + String(err),
    });
    return;
  }

  const result = {
    status: "Nuro check done!",
  };

  context.status(200).succeed(result);
};
