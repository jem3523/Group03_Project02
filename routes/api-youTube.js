var axios = require ("axios");
//APIKEY is stored as a variable in Heroku; for localhost, a security file is required and is NOT part of the git package
var apiKey = process.env.APIKEY || require ("../security");


module.exports = function(app)
{
    app.get("/youtube/:searchInput", function(req, res) 
    {
        var searchInput = req.params.searchInput;
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + searchInput + "&key=" + apiKey;
        console.log(queryURL);

        axios
        .get(queryURL)
        .then(function(response) 
        {
            //console.log(response.data.items);
            res.json(response.data.items);
        });
    });
};
