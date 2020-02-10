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
});
