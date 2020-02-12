//this function is re-used on almost every page to populate the category drop-down. 
//This particular aspect of the process goes out to the DB and collects all of the category IDs and Names.
//It then populate a string consisting of each category within an <option> element, which will be inserted into the drop-down.

$(document).ready(function() 
{
    $("#selectCategory").on("click", getDDCat);
    $("#saveLinks").on("click", getDDCat);
    $("#editCategory").on("click", getDDCat);
    $("#deleteCategory").on("click", getDDCat);

    function getDDCat()
    {
        $.get("/api/category", function(data)
        {
            var options = "<option>Select Category</option>";
            $.each(data, function(key, val) 
            {
                options += "<option value='" + val.id + "'>" + val.categoryName + "</option>";
            });
            console.log(options)
            $(".listHolder").replaceWith(options);    
        });
    }
});
