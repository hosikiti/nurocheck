const checker = require("./checker");
const slack = require("./slack");

module.exports = async (event, context) => {
  await checker.check();

  const result = {
    status: "Nuro check done!",
  };

  context.status(200).succeed(result);
};
