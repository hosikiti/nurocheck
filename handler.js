const slack = require("./slack");

module.exports = async (event, context) => {
  const result = {
    status: "Nuro check done!",
  };

  slack.notify("slack message test!!");

  context.status(200).succeed(result);
};
