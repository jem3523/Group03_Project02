$(document).ready(function() 

{
  function getCategory() {
      $.get("/api/category", function(data) {

      })
  }
  //listener for new entry submit button (based on button ID)
 $("#savebutton").on("click", saveButton);

  function saveButton(event) {

      event.preventDefault();
      console.log("button works!");
      var category= $("#category").val().trim();
      console.log(category);
      var newPost = {categoryName: category}; //data packet
      $.post("/api/posts", newPost, function() //sending to the REST API endpoint at this address
      {
        window.location.href = "/";
      });
  };

 $("#deletebutton").on("click", deleteButton);
  
  function deleteButton(event) {

    event.preventDefault();

    var thisCatID = $("#div_999").attr('data-catID');
    console.log("deleting: " + thisCatID)

    $.ajax({
        url: "/api/category/" + thisCatID,
        type: "DELETE",
        success: function(result) {
          location.reload();
        }
    });
  };
});