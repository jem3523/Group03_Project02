$(document).ready(function() 
{
  //listener for new entry submit button (based on button ID)
 $("#saveCatButton").on("click", saveButton);

  function saveButton(event) {

    event.preventDefault();

    var category= $("#newCategory").val().trim();
    console.log("adding: " + category);

    if (!category)
    {console.log ("No new category entered.")}
    else
    {
      var newCat = {categoryName: category}; 
      $.post("/api/category", newCat, function()
      {
        location.reload();
      });
    };
  };


 $("#deleteCatButton").on("click", deleteButton);
  
  function deleteButton(event) {

    event.preventDefault();

    var thisCatID= $("#deleteCategory option:selected").attr("value");
    console.log("deleting: " + thisCatID)

    if (!thisCatID)
    {console.log ("No category to delete has been entered.")}
    else
    {
      $.ajax({
          url: "/api/category/" + thisCatID,
          type: "DELETE",
          success: function(result) {
            location.reload();
          }
      });
    };
  };


  $("#editCatButton").on("click", editButton);
  
  function editButton(event) {

    event.preventDefault();

    var thisCatID= $("#editCategory option:selected").attr("value");

    if (!thisCatID)
    {console.log ("No category to edit has been entered.")}
    else
    {
      console.log("editing: " + thisCatID)
      var updatedCatName = 
      {
        categoryName: $("#editCategoryText").val().trim(),
        id: thisCatID
      };

      console.log(updatedCatName);

      $.ajax({
        url: "/api/category",
        method: "PUT",
        data: updatedCatName
      })
        .then(function() {
          location.reload();
        });
    };
  };
});