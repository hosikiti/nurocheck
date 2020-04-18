const checker = require("./checker");
const slack = require("./slack");
const fs = require("fs");
const puppeteer = require("puppeteer");
var getos = require("getos");

module.exports = async (event, context) => {
  getos(function (e, os) {
    if (e) return console.log(e);

    if (context) {
      context.status(200).succeed(os);
    } else {
      console.log("os", os);
    }
  });

  // const result = {
  //   status: "Nuro check done!",
  // };

  // context.status(200).succeed(result);
};
