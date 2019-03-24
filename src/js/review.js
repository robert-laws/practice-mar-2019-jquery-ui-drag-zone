$(function() {
  var classRawUrl = window.location.href.slice(window.location.href.indexOf("=") + 1);

  $("#selections").val(classRawUrl);

  var classUrl = classRawUrl.split("+");
  var classCount = classUrl.length;

  $("#class-submit").click(function() {
    if(formValidate($(this))) {
      var classId = saveClass();
      if(classId > 0) {
        $(location).attr("href", "confirmation.html?cid=" + classID);
      } else {
        console.log("class id was not saved.");
      }
    } else {
      $("#form-errors").html("<strong>Please fix the errors highlighted above</strong>").addClass("alert-text");
    }
  });

  $("#course-date").datepicker({
    showButtonPanel: true,
    currentText: "Today"
  });

  $("#course-time").timepicker({ // built using jquery.timepicker - http://jonthornton.github.io/jquery-timepicker/
    "scrollDefault": "now",
    "step": 10
  });

  $.getJSON("assets/data/instruction.json")
    .done(function(items) {
      var order = 1;
      var instructionItems = items["instruction"];
      for(var j = 0; j < classCount; j++) {
        for(var i = 0; i < instructionItems.length; i++) {
          classFromUrl = parseFloat(classUrl[j].split("-")[0]);
          currentInstructionListing = instructionItems[i]["id"];
          if(classFromUrl == currentInstructionListing) {
            console.log(instructionItems[i]["title"] + " " + order);
            var addInstruction = $("<h4>" + instructionItems[i]["title"] + " -> " + order + "</h4>");
            $("#your-class").append(addInstruction);
            order++;
          }
        }
      }
    })

  
});

function formValidate(element) {
  var isValid = true;
  var myFormID = "#" + element.parent().attr("id");

  $.each($(myFormID).children(".validate-this"), function(key, value) {
    if($(value).val() == "") {
      isValid = false;
      $(value).addClass("alert");
    } else {
      $(value).removeClass("alert");
    }
  })

  return isValid;
}

function saveClass() {
  var savedId = 0;
  var request;
  var $form = $("#new-class");
  var $inputs = $form.find("input");
  var serializedData = $form.serialize();
  request = $.ajax({
    url: "../assets/form/build-class.php",
    type: "post",
    data: serializedData
  });

  request.done(function (response, textStatus, jqXHR){
    savedId = response;
    // Log a message to the console
    console.log("Success, it worked!");
  });

  request.fail(function (jqXHR, textStatus, errorThrown){
    // Log the error to the console
    console.error(
        "The following error occurred: " + textStatus, errorThrown
    );
  });

  return savedId;
}