//REPLACE MAIN HANDLEBAR HEADER INFO WITH:
//<meta charset="UTF-8">
//<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
//<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
//<script src="http://code.jquery.com/jquery-latest.js"></script>
//<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"></script>
//<link rel="stylesheet" href="/css/style.css" type="text/css" /> 
//<title>TITLE</title>
//<script src="/js/client.js"></script>
//<script src="/js/categoryDD.js"></script>

//PUT THE FOLLOWING IN INDEX HANDLEBAR HTML:  
//<div id='div_999' data-catID = '' class='catButton text-center'></div>
//<script>getCategories(999)</script>

$(document).ready(function() 
{
    $(".populateCategoryDropdown").on("click", getDDCat);

    function getDDCat()
    {
        if ($(".listHolder").text() == "Select Category")
        {
            $.get("/api/category", function(data)
            {
                var options = '';
                $.each(data, function(key, val) 
                {
                    options += "<option value='" + val.id + "'>" + val.categoryName + "</option>";
                });
                //console.log(options)
                $(".listHolder").replaceWith(options);    
            });
        };
    };

    function getCategories(linkID)
    {
        $.get("/api/category", function(data)
        {
            //console.log(data)
            var dropDownList = ""; 
            $.each(data,function(key,val) 
            {
                dropDownList += "<li><a class = 'dropdown-item_" + linkID + "' id='" + val.id + "' href='#' data-linkID='" + linkID + "'>" + val.categoryName + "</a></li>"
            });
            
            const dropDownCode = `<div class='dropdown mr-1"'>
            <button id= 'buttonID_${linkID}' class='btn btn-primary  dropdown-toggle' type='button' data-toggle='dropdown' data-offset="10,10">Select Category</button>
            <div class='dropdown-menu'>
            <ul>
            ${dropDownList}
            </ul>
            </div>`

            //INSERT HTML
            $("#div_" + linkID).append(dropDownCode);

            // //LISTENER FOR THE ACTUAL BUTTON
            $('#dropdownMenuButton').on('show.bs.dropdown');
    
            //LISTENER FOR THE DROP-DOWN LIST WITHIN THE BUTTON
            $('.dropdown-item_' + linkID).on('click', function ()
            {
                var linkID = $(this).attr("data-linkID")
                var catID = $(this).attr('id');

                if (linkID === "999")
                {
                    console.log("for div_" + linkID + ", the selected catID is " + catID);
                    $("#div_" + linkID).attr('data-catID', catID); 
                }
                else
                {
                    console.log("for linkID " + linkID + ", the selected catID is " + catID);
                    $("#linkID_" + linkID).attr('data-catID', catID);  
                };
                
                return;
            });
        });
    };
});

