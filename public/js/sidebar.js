$(document).ready(function() {
  
  //these listeners are for the four nav links in the sidebar
  
  $('#edit').on('click', function () {
    window.location.href = "/edit";
  });

  $('#manage').on('click', function () {
    window.location.href = "/manage";
  });

  $('#search').on('click', function () {
    window.location.href = "/search";
  });

  $('#home').on('click', function () {
    window.location.href = "/";
  });
});
