$(document).ready(function()

//this function deletes the selected link assigned to a specific category
{
  $(".deleteLink").on("click", deleteLink);
  
  function deleteLink (event) 
  {

    event.preventDefault();

    var thisLinkID = $(this).attr("id");
    
    console.log("deleting: linkID " + thisLinkID)

    $.ajax({
        url: "/api/link/" + thisLinkID,
        type: "DELETE",
        success: function() {
          location.reload();
        }
    });
  }
});
