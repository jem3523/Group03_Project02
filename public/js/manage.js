$(document).ready(function() 
{
  //listener for new entry submit button (based on button ID)
 $("#saveCatButton").on("click", saveButton);

  function saveButton(event) {

      event.preventDefault();

      var category= $("#newCategory").val().trim();
      console.log("adding: " + category);

      var newCat = {categoryName: category}; 
      $.post("/api/category", newCat, function()
      {
        location.reload();
      });
  };

 $("#deleteCatButton").on("click", deleteButton);
  
  function deleteButton(event) {

    event.preventDefault();

    var thisCatID= $("#deleteCategory option:selected").attr("value");
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