$(document).ready(function() {
  $('#edit').on('click', function () {
    window.location.href = "/link";
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
