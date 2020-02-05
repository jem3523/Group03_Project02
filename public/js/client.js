$(document).ready(function() 
{
  //listener for new entry submit button (based on button ID)
  $("#submitButton").on("click", formSubmit);
 
  function formSubmit(event) 
  {
    event.preventDefault();

    var entryInput =  $("#newLink").val().trim();
    console.log (entryInput);

    if (!entryInput) 
    {
      console.log("No data in input.");
      return
    };

    //create an object of the column name key:value pair
    var newPost = {linkURL: entryInput};

    $.post("/", newPost, function() 
    {
      window.location.href = "/";
    });
  };

  //listener for delete entry buttons (based on button class)
  $(".deleteButton").on("click", deleteName);
 
  function deleteName(event) 
  {
    event.preventDefault();

    //pull the id from the button
    var deleteID = $(this).attr("data-id");
    console.log (deleteID);

    //this requires ajax because there is no jquery shortcut for delete (only get and post)
    $.ajax(
    {
      method: "DELETE",
      url: "/" + deleteID
    })
    .then
    {
      window.location.href = "/";
    };
  };
  
});

//res.redirect("/");
//location.reload();
