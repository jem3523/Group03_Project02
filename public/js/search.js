$(document).ready(function() 
{
  $('#searchButton').on('click', function ()
  {
    event.preventDefault();

    var searchInput = $("#searchInput").val().trim();

    if (!searchInput )
    {console.log ("No key word for search has been entered.")}
    else
    {
      $("#searchResultList").empty();

      $.get("/youtube/" + searchInput)
      .then (function(results)
        {
          for (var i = 0; i < results.length; i++) 
          {
            var label = results[i].snippet.title;
            var vURL= "https://youtu.be/" + results[i].id.videoId;
            var resultLink = "<a href='" + vURL + "' target='_blank'>" + label + "</a>";
            var buttonLink = "<button data-url='" + vURL + "' data-label='" + label + "' class='addButton btn btn-primary'>Add</button>"
            
            $("#searchResultList").append("<div>" + buttonLink + "  " + resultLink + "</div><br>");
          };
      });
    };
	});

  var selectedLinks = [];

  $(document).on("click", ".addButton", function()
  {
    var selectedLink = {"url": $(this).data("url"), "label": $(this).data("label"), "catID": null}
    selectedLinks.push(selectedLink);

    $("#selectionList").empty();
    $("#selectionList").append("<h3>Selected Links</h3>");

    var options = "<option>Select Category</option>";

    $.get("/api/category", function(data)
    {
        
        $.each(data, function(key, val) 
        {
          options += "<option value='" + val.id + "'>" + val.categoryName + "</option>";
        });
        console.log("within get: " + options)
        return options;
    })
    .then(function()
    {
      for (var j=0; j < selectedLinks.length; j++)
      {
        var resultLink = "<a id='linkID_" + j + "' data-catID = '' href='" + selectedLinks[j].url + "' target='_blank'>" + selectedLinks[j].label + "</a>";
        resultLink += "<div>";
        resultLink += "<select id ='selectID_" + j + "' data-holdID ='" + j + "' class='form-control'>";
        resultLink += options;
        resultLink += "</select></div>";
        
        $("#selectionList").append("<div>" + resultLink + "</div><br>");

        $("#selectID_" + j).on('click', function ()
        {
          //THIS LINE IS BROKEN!!
          //THE LISTENER IS EXPECTING "j" to be passed in.  I need hard-coded during listener creation.
          var catID = $("#selectID_" + j + " option:selected").attr("value");
          console.log ("listener engaged: " + catID);
          $("#linkID_" + j).attr('data-catID', catID);  
          //selectedLinks[j].catID = $(selectID).attr("value");
        });
      };
    
      var instructions = "<p>Be sure to click the Save button to add your selection list to your chosen categories.</p>"
      instructions += "<button id='saveButton' class='btn btn-primary' type='submit'>Save Selections</button>"
      $("#selectionList").append(instructions);

      //IMPORTANT NOTE! This listener is embedded inside the .addbutton listener because the Save button does not yet exist until created as part of .addbutton
      $('#saveButton').on('click', function ()
      {
        for (var x = 0; x < selectedLinks.length; x++)
        {
          var newLink = 
          {
            linkURL : selectedLinks[x].url,
            label : selectedLinks[x].label,
            //categoryTbId : selectedLinks[x].catID
            categoryTbId : $("#linkID_" + x).attr('data-catID'),
          }

          console.log(newLink);

          $.post("/api/link", newLink, function()
          {
            selectedLinks = [];
            window.location.href = "/";
          }); 
        };
      });
    });
  });
});


