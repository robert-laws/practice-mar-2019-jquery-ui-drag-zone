$(document).ready(function() {
  var sortedIDs = [];
  $("#select-zone, #drop-zone").sortable({
    connectWith: ".connect-list",
    cursor: "pointer",
    handle: ".sort-handle",
    placeholder: "ui-state-highlight",
    dropOnEmpty: true
  }).disableSelection();

  $("#get-items").click(function() {
    var sortedIDs = $( "#drop-zone" ).sortable( "toArray" );
    alert(sortedIDs);
  });
});



