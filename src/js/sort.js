$(document).ready(function() {
  $("#select-zone, #drop-zone").sortable({
    connectWith: ".connect-list",
    dropOnEmpty: true

  }).disableSelection();
});