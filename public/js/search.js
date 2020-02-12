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
          $("#searchResultList").prepend("<p>Click to view the video in a new tab. To select, simply click the Add button.</p>");
          $("#selectionList").empty();
          $("#selectionList").append("<h3>Selected Links</h3>");

          var instructions = "<p>Be sure to click the Save button to add your selection list to your chosen categories.</p>"
          instructions += "<button id='saveButton' class='btn btn-primary' type='submit'>Save Selections</button>"

          $("#instructionBlock").append(instructions);
          
          for (var i = 0; i < results.length; i++) 
          {
            var label = results[i].snippet.title;
            var vURL= "https://youtu.be/" + results[i].id.videoId;
            var resultLink = "<a href='" + vURL + "' target='_blank' class='link_" + i + "'>" + label + "</a>";
            var buttonLink = "<button id='" + i + "' data-url='" + vURL + "' data-label='" + label + "' class='link_" + i + " addButton btn btn-primary'>Add</button>"
            
            $("#searchResultList").append("<div>" + buttonLink + "  " + resultLink + "</div><br>");
          }
      });
    }
	});

  var selectedLinks = [];

  $(document).on("click", ".addButton", function()
  {
    event.preventDefault();

    var linkID = $(this).attr("id");
    var url = $(this).data("url");
    var label = $(this).data("label");

    var selectedLink = {"linkID": linkID,"url": url, "label": label, "catID": null}
    selectedLinks.push(selectedLink);

    console.log(selectedLinks)

    $(".link_" + linkID).remove();

    var options = "<option>Select Category</option>";

    $.get("/api/category", function(data)
    {
        
        $.each(data, function(key, val) 
        {
          options += "<option value='" + val.id + "'>" + val.categoryName + "</option>";
        });
        //console.log("within get: " + options)
        return options;
    })
    .then(function()
    {
      var resultLink = "<a id='linkID_" + linkID + "' data-catID = '' href='" + url + "' target='_blank'>" + label + "</a>";
      resultLink += "<div>";
      resultLink += "<select id ='selectID_" + linkID + "' data-holdID ='" + linkID + "' class='form-control'>";
      resultLink += options;
      resultLink += "</select></div>";
      
      $("#selectionList").append("<div>" + resultLink + "</div><br>");


      //CUSTOM LISTEREN FOR EACH ADDED LINK
      $("#selectID_" + linkID).on('click', function ()
      {
        var catID = $("#selectID_" + linkID + " option:selected").attr("value");

        console.log ("listener engaged: " + catID);

        $("#linkID_" + linkID).attr('data-catID', catID);

      });


      //IMPORTANT NOTE! This listener is embedded inside the .addbutton listener because the Save button does not yet exist until created as part of .addbutton
      $('#saveButton').on('click', function ()
      {
        event.preventDefault();

        for (var x = 0; x < selectedLinks.length; x++)
        {
          var newLink = 
          {
            linkURL : selectedLinks[x].url,
            label : selectedLinks[x].label,
            categoryTbId : $("#linkID_" + selectedLinks[x].linkID).attr('data-catID')
          }

          $.post("/api/link", newLink, function()
          {
            console.log(newLink);
          }); 
        }
          selectedLinks = [];
          window.location.href = "/";
      });
    });
  });
});


