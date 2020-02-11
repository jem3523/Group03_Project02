var db = require("../models");

module.exports = function(app) {
  
//GET: all categories
  app.get("/api/category", function(req, res) {
    db.category_tb.findAll({
      include: [db.link_tb]
    }).then(function(dbcategory_tb) {
      res.json(dbcategory_tb);
    });
  });

  //GET: category based on an id
  app.get("/api/category/:id", function(req, res) {
    db.category_tb.findOne({
      where: {
        id: req.params.id
      },
      include: [db.link_tb]
    }).then(function(dbcategory_tb) {
      res.json(dbcategory_tb);
    });
  });

  //POST: a new category
  app.post("/api/category", function(req, res) {
    db.category_tb.create(req.body).then(function(dbcategory_tb) {
      res.json(dbcategory_tb);
    });
  });

  //DELETE: a category (and associated links) based on id
  app.delete("/api/category/:id", function(req, res) {
    db.category_tb.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbcategory_tb) {
      res.json(dbcategory_tb);
    });
  });

  //PUT: edit a category name
  app.put("/api/category", function (req, res) {
    db.category_tb.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbcategory_tb) {
      res.json(dbcategory_tb);
    });
  });
};
