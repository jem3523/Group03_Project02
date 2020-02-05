// Set up MySQL connection.
var mysql = require("mysql");
var pw = require("./security");

//the if statement allows for a JAWSDB setup during the heroku deployment
if (process.env.JAWSDB_URL)
{
  var connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else
{
  var connection = mysql.createConnection(
  {
    host: "localhost",
    port: 3306,
    user: "root",
    password: pw,
    database: "jason_db"
  });
}


connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
