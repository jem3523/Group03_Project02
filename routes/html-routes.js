var path = require("path");
var db = require("../models");

module.exports = function(app) 
{
  app.get("/", function(req, res) 
  {
    db.link_tb.findAll({}).then (function (response)
    {
    //console.log (response);
    return res.render("index", { dataFromDB: response });
    });
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