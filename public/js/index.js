$(document).ready(function() 
{
 $("#selectCatButton").on("click", selectButton);

  function selectButton(event) {

    event.preventDefault();

    var enterCatId= $("#selectCategory option:selected").attr("value");

    if(enterCatId == "Select Category")
    {
      var catPath = "/category/" + enterCatId;

      console.log(catPath);

      location.href = catPath;
    }
    else
    {
      console.log ("No category selected")
    }
  }
});