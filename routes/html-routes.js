var path = require("path");
var db = require("../models");

module.exports = function(app) {
  //Routes handling the HTML page that the user gets sent to

  //TODO: CONFIRM NAME OF PATHS, js files are not yet created.
  //TODO: named HTML files: selectCat, link, manage, search
  
  //Index route: 
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/selectCat.html"));
    // db.link_tb.findAll({}).then (function (response) {
    // return res.render("index", { dataFromDB: response });
    // });
  });

  //Enter link route:
  app.get("/link", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/link.html"));
  });

  //Manage category route:
  app.get("/manage", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/manage.html"));
  });

  //Stretch goal: Search Youtube route:
  app.get("/search", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/search.html"));
  });
}

//SAMPLE RETURN
// [
//   link_tb {
//     dataValues: 
//     {
//       id: 1,
//       linkURL: 'jason.com',
//       createdAt: 2020-02-04T14:54:15.000Z,
//       updatedAt: 2020-02-04T14:54:15.000Z
//     }
//   },
//   link_tb {
//     dataValues: 
//     {
//       id: 2,
//       linkURL: 'karen.com',
//       createdAt: 2020-02-04T15:31:23.000Z,
//       updatedAt: 2020-02-04T15:31:23.000Z
//     }
//   }
// ]