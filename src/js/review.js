$(function() {
  var classUrl = window.location.href.slice(window.location.href.indexOf("=") + 1).split("+");
  var classCount = classUrl.length;

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
