PTEMPLATE = ['Home', 'Documents', 'Events', '2015', 'GUADEC Team Reports'];

MENU = ['Open in new Window', 'Open in New Tab', '', 'Move to…', 'Copy to…', 
        'Add to Bookmarks', 'Rename…', '', 'Properties'];

PATH = {
  dirs: [],

  addDir: function () {
    if (PTEMPLATE[this.dirs.length]) {
      this.dirs.push(PTEMPLATE[this.dirs.length]);
    } 
    if (!PTEMPLATE[this.dirs.length]) {
      $("#add").attr("disabled","true");
    }
  },

  active: 2,

  setActive: function () {
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

  $('#pathbar').on("contextmenu", ".hasPopover", function () { /* bind an event to elements to be created */
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

    $(this).webuiPopover('show');

    /* FIXME make it close on clicking anywhere but the popover as well */
    $('.webui-popover-content a').click(function () {
      $('.hasPopover').webuiPopover('hide');
    });
    return false;
  });

  $pb.css("width", $hb.width() - buttonwhitespace);

  $("#add").click(function () {
    PATH.addDir();
    PATH.renderOut($("ul.pathbar"));
  });

  $("#add").click();

  $(window).resize(function () {
    $pb.css('width', $hb.width() - buttonwhitespace);
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
});
