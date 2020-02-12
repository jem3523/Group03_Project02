var db = require("../models");

module.exports = function(app) {
  
  //GET: get all links associated with a category
  app.get("/api/link", function(req, res) {
    var query = {};
    console.log(req.query.category_id)
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
  
  //POST: save a new link
  app.post("/api/link", function(req, res) {
    console.log(req.body)
    db.link_tb.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  //DELETE: delete a link (stretch goal)
  app.delete("/api/link/:id", function(req, res) {
    db.link_tb.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  //PUT: route for updating link info (stretch goal)
  app.put("api/link", function (req, res) {
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