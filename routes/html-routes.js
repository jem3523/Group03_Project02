var path = require("path");
var db = require("../models");

module.exports = function(app) {
  //Routes handling the HTML page that the user gets sent to

  //index (home) route: 
  app.get("/", function(req, res) {
    return res.render("index");
  });


  //youTube search route: 
  app.get("/search", function(req, res) {
    return res.render("search");
  });
  

  //Enter link (manually) route:
  app.get("/edit", function(req, res) {
    return res.render("edit");
  });


  //Manage categories route:
  app.get("/manage", function(req, res) {
    return res.render("manage");
  });
  

  //category route (displays the links associated with a chosen category): 
  app.get("/category/:id", function(req, res) {
    console.log("finding links for: " + req.params.id)
    db.category_tb.findOne({
      where: {
        id: req.params.id
      },
      include: [db.link_tb],
    })
    .then(function(dbcategory_tb) {
      //console.log(dbcategory_tb)
      console.log ("links found")
      res.render("category", {
        name: dbcategory_tb.categoryName, 
        //.map is essential to arrays for sequelize
        links: dbcategory_tb.link_tbs.map(link => link.get({ plain: true }))
      })
    });
    
});
}