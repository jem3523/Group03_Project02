var db = require("../models");

module.exports = function(app) {
  
//GET: category route
  //Include property for db.link_tb in findAll query,
  //Set value to an array of the model we include in a left outer join
  app.get("/api/category", function(req, res) {
    db.category_tb.findAll({
      include: [db.link_tb]
    }).then(function(dbcategory_tb) {
      res.json(dbcategory_tb);
    });
  });

  //Get: category 
  app.get("/api/category/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.link_tb
    db.category_tb.findOne({
      where: {
        id: req.params.id
      },
      include: [db.link_tb]
    }).then(function(dbcategory_tb) {
      res.json(dbcategory_tb);
    });
  });

  app.post("/api/category", function(req, res) {
    db.category_tb.create(req.body).then(function(dbcategory_tb) {
      res.json(dbcategory_tb);
    });
  });

  app.delete("/api/authors/:id", function(req, res) {
    db.category_tb.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbcategory_tb) {
      res.json(dbcategory_tb);
    });
  });

};
