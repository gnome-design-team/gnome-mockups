BOXES = {
  boxes: [ {
    id: "alli",
    label: "Alli's Computer",
    thumbnail: "img/boxes/alli-thumb.png",
    fullscreen: "img/boxes/alli.jpg",
    running: true
  }, {
    id: "research",
    label: "OS Research",
    thumbnail: "img/boxes/research-thumb.png",
    fullscreen: "img/boxes/research.jpg",
    running: false
  }],
  os: ['fedora','ubuntu','windows','osx','unknown'],
  addBox: function () { //create new box
  },
  deleteBox: function () { // delete a box
  }
}


$.fn.renderBoxes = function () {
  var $container;
  
  $container = $(this).empty();
  $.each(BOXES.boxes, function (i,box) {
    var running;
    
    running = box.running ? "running" : "";
    $("<div></div>")
      .attr("id", box.id)
      .addClass("box-contain")
      .append("<div class='box'>").children()
      .css("background-image", box.thumbnail)
      .parent()
      .append("<div class='label'>"+box.label+"</div>")
      .appendTo($container);
  });
}


$(document).ready(function () {
  $("#content").renderBoxes();
});
