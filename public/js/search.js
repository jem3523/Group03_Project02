$(document).ready(function() 
{
  //listener for the youTube search button (takes key words, send them through API, and returns links)
  $('#searchButton').on('click', function ()
  {
    event.preventDefault();

    var searchInput = $("#searchInput").val().trim();

    //check to make sure the field is populated
    if (!searchInput )
    {console.log ("No key word for search has been entered.")}
    else
    {
      $("#searchResultList").empty();

      $.get("/youtube/" + searchInput)
      .then (function(results)
        {
          //add instructions, clear any list that may already be rendered and render the new list
          $("#selectedTitle").remove();
          $("#searchResultList").prepend("<p>Click to view the video in a new tab. To select, simply click the Add button.</p>");
          //$("#selectionList").empty();
          $("#selectionList").prepend("<h3 id ='selectedTitle'>Selected Links</h3>");
          $("#instructions").remove();
          $("#saveButton").remove();

          var instructions = "<p id= 'instructions'>Be sure to click the Save button to add your selection list to your chosen categories.</p>"
          instructions += "<button id='saveButton' class='btn btn-primary' type='submit'>Save Selections</button>"

          $("#instructionBlock").append(instructions);
          
          //loop through the returned youTube data and create a link and an "add" button for each one
          for (var i = 0; i < results.length; i++) 
          {
            var label = results[i].snippet.title;
            var vURL= "https://youtu.be/" + results[i].id.videoId;

            //add a unique class to link and button so that they can be easily deleted when chosen to add to the selected list
            //also embed all required data in the button (linkId,url,label) so that it can be pulled to create the seleted link and category when chosen to add to the selected list
            var resultLink = "<a href='" + vURL + "' target='_blank' class='link_" + i + "'>" + label + "</a>";
            var buttonLink = "<button id='" + i + "' data-url='" + vURL + "' data-label='" + label + "' class='link_" + i + " addButton btn btn-primary'>Add</button>"
            
            //now add the link and button for each returned youTube link to the page
            $("#searchResultList").append("<div>" + buttonLink + "  " + resultLink + "</div><br>");
          }
      });
    }
	});

  var selectedLinks = [];

  //listener for dynamically created add button for each link (listener cannot be created until the actual link/button have been created)
  $(document).on("click", ".addButton", function()
  {
    event.preventDefault();

    //get the data hiden in the button
    var linkID = $(this).attr("id");
    var url = $(this).data("url");
    var label = $(this).data("label");

    //push the known data in an array; the catID will be gathered later
    var selectedLink = {"linkID": linkID,"url": url, "label": label, "catID": null}
    selectedLinks.push(selectedLink);

    console.log(selectedLinks)

    //remove the original link and add button (link is essentially being moved to the selected list)
    $(".link_" + linkID).remove();

    //create an option as a placeholder. While not perfect (because the DD requires two clicks for two different funtions),
    //it makes the user experience a little less confusing
    var options = "<option>Select Category</option>";

    //this function is similar to the one in categoryDD.js, which creates an options list based on a DB pull,
    //but because multiple category drop-downs (and associatedlisteners) are on this page, it requires unique lines of code
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
      //create a link with an empty catID. When the catID is selected from the drop-down, it is stored in the actual link until all links have been
      //given a category and the "save" button pushed.
      //this is because the array cannot be accessed within this function
      var resultLink = "<a id='linkID_" + linkID + "' data-catID = '' href='" + url + "' target='_blank'>" + label + "</a>";
      resultLink += "<div>";
      resultLink += "<select id ='selectID_" + linkID + "' class='form-control'>";
      resultLink += options;
      resultLink += "</select></div>";
      
      $("#selectionList").append("<div>" + resultLink + "</div><br>");


      //listener for dynamically created category drop-down (listener cannot be created until the actual link/button have been created)
      $("#selectID_" + linkID).on('click', function ()
      {
        var catID = $("#selectID_" + linkID + " option:selected").attr("value");

        console.log ("listener engaged: " + catID);

        $("#linkID_" + linkID).attr('data-catID', catID);

      });


      //listener for save button that saves all selected links to the database (listener cannot be created until the actual link/button have been created)
      $('#saveButton').on('click', function ()
      {
        event.preventDefault();

        for (var x = 0; x < selectedLinks.length; x++)
        {
          var newLink = 
          {
            linkURL : selectedLinks[x].url,
            label : selectedLinks[x].label,
            //grabs the catID from the link where it was stored after selected in the drop-down
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


