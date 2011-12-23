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
  var $toolbar, $previous, $content;
  
  $toolbar = $("#toolbar-main");
  $previous = $toolbar.children().clone();//clone all content, but keep container for bubbling events
  $content = $("#content").children();
  $content.each(function (i) {
    $(this).find('.box').append("<input type='checkbox' name='boxes'>").click(function (e) {
      //forward the click to the checkbox
      e.stopPropagation()
      console.log('click'); //it somehow triggers twice, what gives?
      var $target = $(e.target);
      if (!$target.is($("input",this))) {
        $("input",this).trigger('click');
      }
    });
  });
  $toolbar.addClass('selectmode');
  $toolbar.empty().append("<button id='doneselecting'>Done</button>").children()
    .click(function () {
      //cancel selection and return to previous toolbar
      $toolbar.removeClass('selectmode').children().replaceWith($previous);
      $content.find('.box').unbind('click').find("input").remove();
    }).append("<button id='delete_box'>Delete</button>").children()
      .click(function () {
        //delete selected boxes
      });
}

$(document).ready(function () {
  $("#content").renderBoxes();
  $("#toolbar-main").on("click", "#new_box", function (event) {
    BOXES.addBox();
  }).on("click","#select",enterSelectMode);
});
