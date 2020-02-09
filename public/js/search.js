$(document).ready(function() 
{
  $('#searchButton').on('click', function ()
  {
    event.preventDefault();
    $("#searchResultList").empty();

    var searchInput = $("#searchInput").val().trim();


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
	});

  var selectedLinks = [];

  $(document).on("click", ".addButton", function()
  {
    var selectedLink = {"url": $(this).data("url"), "label": $(this).data("label"), "catID": null}
    selectedLinks.push(selectedLink);

    $("#selectionList").empty();
    $("#selectionList").append("<h3>Selected Links</h3>");

    for (var j=0; j < selectedLinks.length; j++)
    {
      var resultLink = "<a id='linkID_" + j + "' data-catID = '' href='" + selectedLinks[j].url + "' target='_blank'>" + selectedLinks[j].label + "</a>";
      resultLink += "<div>";
      resultLink += "<select id='linkID_" + j + "' class='form-control populateCategoryDropdown'>";
      resultLink += "<option class='listHolder'>Select Category</option></select>";
      resultLink += "</div>";

      $("#selectionList").append("<div>" + resultLink + "</div><br>");
      
      //$("#selectionList").append("<div id='div_" + j + "' class='catButton'>" + resultLink + "</div><br>");
      //getCategories(j);
      
    };
   

    var instructions = "<p>Be sure to click the Save button to add your selection list to your chosen categories.</p>"
    instructions += "<button id='saveButton' class='btn btn-primary' type='submit'>Save Selections</button>"
    $("#selectionList").append(instructions);

    //IMPORTANT NOTE! This listener is embedded inside the .addbutton listener because the Save button does not yet exist until created as part of .addbutton
    $('#saveButton').on('click', function ()
    {
      for (var x = 0; x < selectedLinks.length; x++)
      {
        $("#linkID_" + x).attr('data-catID');

        var newLink = 
        {
          linkURL : selectedLinks[x].url,
          label : selectedLinks[x].label,
          categoryTbId : $("#linkID_" + x).attr('data-catID'),
          //categoryTbId : selectedLinks[x].catID
        }

        console.log(newLink);

        $.post("/api/posts", newLink, function()
        {
          selectedLinks = [];
          window.location.href = "/";
        }); 
      };
    });
  });
});


