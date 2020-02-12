//this function opens and collapses the sidebar

$('#toggle').on('click', function () {
    //alert('test');
    $('aside').toggleClass('opened').toggleClass('closed');
    $('section').toggleClass('opened').toggleClass('closed');
    $('#toggle').toggleClass('opened').toggleClass('closed');
    $('#toggle i').toggleClass('fa-arrow-circle-left').toggleClass('fa-arrow-circle-right');
});