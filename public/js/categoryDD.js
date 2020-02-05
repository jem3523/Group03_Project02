//assumes a getALL route called "/category"

//REPLACE MAIN HANDLEBAR HEADER INFO WITH:
//<meta charset="UTF-8">
//<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
//<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
//<script src="http://code.jquery.com/jquery-latest.js"></script>
//<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"></script>
//<link rel="stylesheet" href="/css/style.css" type="text/css" /> 
//<title>TITLE</title>
//<script src="/js/client.js"></script>

//PUT THE FOLLOWING IN MAIN HANDLEBAR BODY:
//<script src="/js/categoryDD.js"></script>
//<script>getCategories()</script>

//PUT THE FOLLOWING IN INDEX HANDLEBAR HTML:  
//<div class='catButton text-center'></div>

function getCategories() 
{
    $.get("/category", function(data) 
    {
        var dropDownList = ""; 
        $.each(data,function(key,val) 
        {
            dropDownList += "<li><a class = 'dropdown-item' id='" + key + "' href='#'>" + val.categoryName + "</a></li>"
        });
        
        const dropDownCode = `<div class='dropdown mr-1"'>
        <button class='btn btn-default dropdown-toggle' type='button' data-toggle='dropdown' data-offset="10,10">Select Category</button>
        <div class='dropdown-menu'>
        <ul>
        ${dropDownList}
        </ul>
        </div>`

        //INSERT HTML
        $(".catButton").append(dropDownCode);

        //LISTENERS
		$('#dropdownMenuButton').on('show.bs.dropdown');
		$('.dropdown-item').on('click', function ()
		{
            var catID = $(this).attr('id');
            console.log("selected catID: " + catID);
            return catID;
		});
    });
};
