PTEMPLATE = ['Home', 'Documents', 'Events', '2015', 'GUADEC Team Reports'];

MENU = ['Open in new Window', 'Open in New Tab', '', 'Move to…', 'Copy to…', 
        'Add to Bookmarks', 'Rename…', '', 'Properties'];

PATH = {
  dirs: [],

  addDir: function () {
    if (PTEMPLATE[this.dirs.length]) {
      this.dirs.push(PTEMPLATE[this.dirs.length]);
      this.active = this.dirs.length-1;
    } 
    if (!PTEMPLATE[this.dirs.length]) {
      $("#add").attr("disabled","true");
    }
  },

  active: 0,

  setActive: function ($x) {
    if ($x.children('a').length) {
      this.active = $x.index;
      $x.addClass('active')
        .siblings().removeClass('active');
    }
  },

  forkFromActive: function () {
  },

  renderOut: function ($pb) {
    //console.log($pb,this.dirs);
    var h = [],
    b = '';
    
    $.each(PATH.dirs, function (i,dir) {
      h.push('<li');
      if (i==PATH.active) { h.push(' class="active"'); }
      h.push('><a href="#" class="hasPopover">'+PATH.dirs[i]+'</a></li>');
      if (PTEMPLATE[i+1]) {
        h.push(' <li><span class="divider">/</span></li> ');
      }
    });

    $pb.html(h.join(''));
  }
};

$( document ).ready(function() {
  var $hb = $("#headerbar"),
      $pb = $("#pathbar"),
      buttonwhitespace = 235;

  $('#pathbar').on("contextmenu", ".hasPopover", function (ev) {
    /* bind an event to elements to be created */
    $('.hasPopover').webuiPopover({
      trigger: 'manual',
      animation: 'gnomeslide',
      placement: 'bottom',
      dismissible: false, // Handled in $(body), below
      content: function () {
        var html='<ul>';
        $.each(MENU, function (i,item) {
          html += "<li><a href='#'>"+item+"</a></li>";
        });
        html+="</ul>";
        return html;
      }
    });
  
    $(this).webuiPopover('toggle');

    $('.webui-popover-content a').click(function () {
      /* clicking on any menutiem dismisses the popover */
      $('.hasPopover').webuiPopover('hide');
    });

    ev.preventDefault();
  });

  $pb.css("width", $hb.width() - buttonwhitespace); //set pathbar width

  $("#add").click(function () {
    PATH.addDir();
    PATH.renderOut($("ul.pathbar"));
  });

  $("#add").click(); //first item (Home) should be visible

  $(window).resize(function () {
    $pb.css('width', $hb.width() - buttonwhitespace); //set pathbar width
  });

  $(document).on('mousedown', function (ev) {
    // Check if the origin is part of an actual popover
    var match = $(ev.target).closest('.hasPopover,.webui-popover').length > 0

    if (!match) {
      $('.hasPopover').webuiPopover('hide');
    }
    
  }).contextmenu(function (ev) {
    // Hiding the context menu outside of the page
    ev.preventDefault();
  });
  
  $('#pathbar').on('mousedown', function (ev) {
  // set menu as active
    //console.log($(ev.target).closest('li').siblings())
    PATH.setActive($(ev.target).closest('li'));
  });
});
