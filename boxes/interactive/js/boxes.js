var BOXES = {
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
    $("#content").renderBoxes(this);
  },
  deleteBox: function (id) { // delete boxes
    id = parseInt(id);
    //console.log('removing ',id);
    this.boxes.splice(id,1);
  }
};

var TEMPBOXES = {};

$.fn.renderBoxes = function (BOXES) {
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

$.fn.sensitivize = function ($content) {
    if($content.length>0) {
      $(this).removeAttr('disabled');
    } else {
      //console.log('disabling', this);
      $(this).attr('disabled','disabled');

    }
}

$.fn.notify = function (options,callback) {
  
  $container = $(this);
  $container.empty().append(options.button,'<span>'+options.message+'</span><div class="closebutton"></div>').fadeIn(200);
  $container.oneTime(options.duration,"noteTimer",function () {
    $(this).fadeOut(500,function () {
      $(this).empty();
      if (callback) { callback(); };
    });
  });
  return this;
  //console.log(options.message,options.button);
}

enterSelectMode = function (selected) {
  var $toolbar, $previous, $content,
  $notify = $("#notify");
  
  //hide notification
  $notify.stopTime("noteTimer");
  $notify.hide(500);
  $toolbar = $("#toolbar-main");
  $previous = $toolbar.children().clone();//clone all content, but keep container for bubbling events
  //content
  $content = $("#content").children();
  $content.each(function (i) {
    $(this).find('.box').append("<input type='checkbox' name='boxes'>").click(function (e) {
      var $check;
      $check = $("input[type='checkbox']",this);
      //console.info($check);
      if(!$(e.target).is($check)) {
        if($check.attr('checked')) {
          $check.removeAttr('checked');
        } else {
          $check.attr('checked','checked');
        }
      }
      $(".action").sensitivize($(":checked", $content));
    });
  });
  if(selected) {
    //if called by longpress
  }
  //toolbar
  $toolbar.addClass('selectmode');
  $toolbar.empty().append("<button id='doneselecting' class='fr'>Done</button>").find('#doneselecting')
    .click(function () {
      //cancel selection and return to previous toolbar
      $toolbar.removeClass('selectmode').children().replaceWith($previous);
      $content.find('.box').unbind('click').find("input").remove();
    }).end().append("<button id='delete_box' class='fl action'>Delete</button>").find('#delete_box')
      .click(function () {
        var $notify = $("#notify"),
        $undobutton = {};
        TEMPBOXES = jQuery.extend(true, {}, BOXES); //clone the box set temporarily for undo

        //pretend to delete selected boxes
        $undobutton = $('<button id="undo-remove">Undo</button>').click(function () {
          //undo boxes removal
          BOXES = jQuery.extend(true, {}, TEMPBOXES); //roll back the previous BOXES object
          //unhide hidden
          $content.filter(":hidden").show(500);
          $notify.stopTime("noteTimer");
          $notify.fadeOut(500, function () {
            $notify.empty();
          });
        });
        $toolbar.removeClass('selectmode').children().replaceWith($previous); //restore toolbar
        
        $(":checked",$content).parents("div.box-contain").each(function () {
          var id = $(this).index();

          BOXES.deleteBox(id);
          $(this).hide(500);
        });
        $content.find('.box').unbind('click').find("input").remove(); //remove checkboxes after iterating through checked
        $notify.notify({
            'message':  'Box(es) successfully deleted.',
            'button':  $undobutton,
            'duration': 5000
           }, function () {
             //deletion was actually performed
           });
      });
  $(".action").sensitivize($(":checked", $content));
}

$(document).ready(function () {
  $("#content").renderBoxes(BOXES);
  $("#toolbar-main").on("click", "#new_box", function (event) {
    BOXES.addBox();
  }).on("click","#select",enterSelectMode);
});
