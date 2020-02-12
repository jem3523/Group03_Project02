$(document).ready(function() 
{
  //listener for new category entry submit button
 $("#saveCatButton").on("click", saveButton);

  function saveButton(event) {

    event.preventDefault();

    var category= $("#newCategory").val().trim();
    console.log("adding: " + category);

    //check to make sure the field is populated
    if (!category)
    {console.log ("No new category entered.")}
    else
    {
      var newCat = {categoryName: category}; 
      $.post("/api/category", newCat, function()
      {
        location.reload();
      });
    }
  }

 //listener for delete category button
 $("#deleteCatButton").on("click", deleteButton);
  
  function deleteButton(event) {

    event.preventDefault();

    //grabs the categoryID from the dynamically-populated drop-down list
    var thisCatID= $("#deleteCategory option:selected").attr("value");
    console.log("deleting: " + thisCatID)

    //check to make sure the field is populated
    if (!thisCatID)
    {console.log ("No category to delete has been entered.")}
    else
    {
      $.ajax({
          url: "/api/category/" + thisCatID,
          type: "DELETE",
          success: function() {
            location.reload();
          }
      });
    }
  }

  //listener for edit category button
  $("#editCatButton").on("click", editButton);
  
  function editButton(event) {

    event.preventDefault();

    //grabs the categoryID from the dynamically-populated drop-down list
    var thisCatID= $("#editCategory option:selected").attr("value");

    //check to make sure the field is populated
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
    }
  }
});