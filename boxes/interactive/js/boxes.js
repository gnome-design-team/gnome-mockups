BOXES = {
  boxes: [ {
    id: "alli",
    label: "Alli's Computer",
    thumbnail: "img/boxes/allis-thumb.png",
    fullscreen: "img/boxes/allis.jpg",
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
    id: "osx",
    label: "Mac OS X",
    thumbnail: "img/boxes/osx-thumb.png",
    fullscreen: "img/boxes/osx.jpg",
    running: true
  }, {
    id: "gaming",
    label: "Gaming Box",
    thumbnail: "img/boxes/gaming-thumb.png",
    fullscreen: "img/boxes/gaming.jpg",
    running: false
  }],
  os: ['fedora','ubuntu','windows','osx','unknown'],
  addBox: function () { //create new box
    this.boxes.push({
      id: "box"+this.boxes.length,
      label: "Nouveau Box (placeholder)",
      thumbnail: "img/boxes/new-thumb.png",
      fullscreen: "img/boxes/new.jpg",
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
    var suspended;
    
    suspended = box.running ? "" : "suspended";
    $("<div></div>")
      .attr("id", box.id)
      .addClass("box-contain")
      .append("<div class='box'>").children()
      .append("<span></span>")
      .append("<img src='"+box.thumbnail+"'>")
      .addClass(suspended)
      .parent()
      .append("<div class='label'>"+box.label+"</div>")
      .appendTo($container);
  });
}

enterSelectMode = function () {
  var $toolbar;
  var $previous = $(this);
  
  $toolbar = $("#toolbar-main");
  $toolbar.addClass('selectmode');
  $toolbar.empty().append("<button id='doneselecting'>");
}

$(document).ready(function () {
  $("#content").renderBoxes();
  $("#new_box").click(function () {
    BOXES.addBox();
  });
  $("#select").click(enterSelectMode);
});
