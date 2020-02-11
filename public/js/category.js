$(document).ready(function()

//function buildDeleteLinkListener() 
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
