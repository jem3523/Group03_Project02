//Routes for displaying and saving data to the DB

var db = require("../models");

module.exports = function(app) {
  
  //GET: category route, for getting all categories
  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.category_id) {
      query.CategoryId = req.query.category_id;
    }
    //Include property for model we want to include (db.category)
    db.link_tb.findAll({
      where: query,
      include: [db.category_tb]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  
  //POST: category route, for saving a new entry
  app.post("/api/posts", function(req, res) {
    db.link_tb.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  //DELETE: link, an entry from the table
  app.delete("/api/posts/:id", function(req, res) {
    db.link_tb.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  //PUT: route for updating posts
  //! Available for later if we need it.
  app.put("api/posts", function (req, res) {
    db.link_tb.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
        res.json(dbPost);
      });
  });
};