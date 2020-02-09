$(document).ready(function() 
{
 $("#saveLinkButton").on("click", saveLinkButton);

  function saveLinkButton(event) {

      event.preventDefault();

      var enterURL= $("#input1").val().trim();
      var enterLabel= $("#input2").val().trim();
      var enterCatId= $("#input3 option:selected").attr("value");

      console.log(enterLabel);
      console.log(enterURL);
      console.log(enterCatId);

      var newLink = {linkURL: enterURL, label: enterLabel, categoryTbId: enterCatId}; 
      $.post("/api/link", newLink, function() 
      {
        location.reload();
      });
    };
});