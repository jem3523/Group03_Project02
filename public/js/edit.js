$(document).ready(function() 
{
  //listener for new entry submit button (based on button ID)
 $("#manageButton").on("click", manageButton);

  function manageButton(event) {

      event.preventDefault();
      console.log("button works!");
      var enterURL= $("#input1").val().trim();
      var enterLabel= $("#input2").val().trim();
      console.log(enterLabel);
      console.log(enterURL);
      var newPost = {linkURL: enterURL, label: enterLabel}; 
      $.post("/api/posts", newPost, function() 
      {
        window.location.href = "/";
      });

      
    };


});