var PORT = process.env.PORT || 8080;
var db = require("./models");

var express = require("express");
var app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//UPDATE THE ROUTE LIST!
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync({ force: true })
.then(function() 
{
  app.listen(PORT, function() 
  {
    console.log("App listening on PORT " + PORT);
  });
});
