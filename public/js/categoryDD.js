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
    };
});
