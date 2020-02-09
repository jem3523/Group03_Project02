$(document).ready(function() 
{
 $("#selectCatButton").on("click", selectButton);

  function selectButton(event) {

      event.preventDefault();

      var enterCatId= $("#selectCategory option:selected").attr("value");

      var catPath = "/category/" + enterCatId;

      console.log(catPath);

      $.get(catPath);

    };
});