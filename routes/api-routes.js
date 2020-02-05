var db = require("../models");

module.exports = function(app) 
{
  //add a new entry to the table
  app.post("/", function(req, res) 
  {
    db.link_tb.create(req.body)
    .then(function(result) 
    {
      res.json(result);
    });
  });

  //delete an entry from the table
  app.delete("/:id", function(req, res) 
  {
    db.link_tb.destroy(
    {
    where: {id: req.params.id}
    })
    .then(function(result) 
    {
    res.json(result);
    });
  });


  //DELETE THIS AFTER TESTING
    app.get("/category", function(req, res) 
    {
      db.category_tb.findAll({})
      .then(function(results) 
      {
        res.json(results);
      });
    });
};