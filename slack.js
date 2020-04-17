const SLACK_HOOK_URL = process.env.SLACK_HOOK_URL;

const notify = (msg) => {
  if (!SLACK_HOOK_URL) {
    return; // do nothing
  }

  var request = require("request");
  var options = {
    uri: SLACK_HOOK_URL,
    headers: {
      "Content-type": "application/json",
    },
    json: {
      text: msg,
    },
  };
  request.post(options, function (error, response, body) {});
};

module.exports = {
  notify: notify,
};
