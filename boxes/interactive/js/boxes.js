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
  }, {
    id: "win8",
    label: "Windows 8 Developer Preview",
    thumbnail: "img/boxes/win8-thumb.png",
    fullscreen: "img/boxes/win8.jpg",
    running: false
  }, {
    id: "research",
    label: "OS Research",
    thumbnail: "img/boxes/research-thumb.png",
    fullscreen: "img/boxes/research.jpg",
    running: false
  }, {
    id: "box4",
    label: "Anonymouse Box",
    thumbnail: "img/boxes/anonymouse-thumb.png",
    fullscreen: "img/boxes/anonymous.jpg",
    running: false
  }, {
    id: "box5",
    label: "Anonymouse Box",
    thumbnail: "img/boxes/anonymouse-thumb.png",
    fullscreen: "img/boxes/anonymous.jpg",
    running: false
  }, {
    id: "box6",
    label: "Anonymouse Box",
    thumbnail: "img/boxes/anonymouse-thumb.png",
    fullscreen: "img/boxes/anonymous.jpg",
    running: false
  }, {
    id: "box7",
    label: "Anonymouse Box",
    thumbnail: "img/boxes/anonymouse-thumb.png",
    fullscreen: "img/boxes/anonymous.jpg",
    running: false
  }, {
    id: "box8",
    label: "Anonymouse Box",
    thumbnail: "img/boxes/anonymouse-thumb.png",
    fullscreen: "img/boxes/anonymous.jpg",
    running: false
  }, {
    id: "box9",
    label: "Anonymouse Box",
    thumbnail: "img/boxes/anonymouse-thumb.png",
    fullscreen: "img/boxes/anonymous.jpg",
    running: false
  }, {
    id: "box10",
    label: "Anonymouse Box",
    thumbnail: "img/boxes/anonymouse-thumb.png",
    fullscreen: "img/boxes/anonymous.jpg",
    running: false
  }, {
    id: "box11",
    label: "Anonymouse Box",
    thumbnail: "img/boxes/anonymouse-thumb.png",
    fullscreen: "img/boxes/anonymous.jpg",
    running: false
  }, {
    id: "box12",
    label: "Anonymouse Box",
    thumbnail: "img/boxes/anonymouse-thumb.png",
    fullscreen: "img/boxes/anonymous.jpg",
    running: false
  }, {
    id: "box13",
    label: "Anonymouse Box",
    thumbnail: "img/boxes/anonymouse-thumb.png",
    fullscreen: "img/boxes/anonymous.jpg",
    running: false
  }, {
    id: "box14",
    label: "Anonymouse Box",
    thumbnail: "img/boxes/anonymouse-thumb.png",
    fullscreen: "img/boxes/anonymous.jpg",
    running: false
  }, {
    id: "box15",
    label: "Anonymouse Box",
    thumbnail: "img/boxes/anonymouse-thumb.png",
    fullscreen: "img/boxes/anonymous.jpg",
    running: false
  }, {
    id: "box16",
    label: "Anonymouse Box",
    thumbnail: "img/boxes/anonymouse-thumb.png",
    fullscreen: "img/boxes/anonymous.jpg",
    running: false
  }, {
    id: "box17",
    label: "Anonymouse Box",
    thumbnail: "img/boxes/anonymouse-thumb.png",
    fullscreen: "img/boxes/anonymous.jpg",
    running: false
  }],
  os: ['fedora','ubuntu','windows','osx','unknown'],
  addBox: function () { //create new box
    this.boxes.push({
      id: "box"+this.boxes.length,
      label: "Anonymous",
      thumbnail: "img/boxes/anonymous-thumb.png",
      fullscreen: "img/boxes/anonymous.jpg",
      running: false
    });
    $("#content").renderBoxes();
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
      .addClass(running)
      .parent()
      .append("<div class='label'>"+box.label+"</div>")
      .appendTo($container);
  });
}


$(document).ready(function () {
  $("#content").renderBoxes();
  $("#new_box").click(function () {
    BOXES.addBox();
  });
});
