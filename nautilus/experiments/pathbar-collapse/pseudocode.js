PTEMPLATE = ['Documents', 'Events', '2015', 'GUADEC Team Reports'];
MENU = ['Open in new Window', 'Open in New Tab', 'Move to…', 'Copy to…', 
        'Add to Bookmarks', 'Rename…', 'Properties'];
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
  setActive: function () {
  },
  forkFromActive: function () {
  },
  renderOut: function ($pb) {
    //console.log($pb,this.dirs);
    var h = [],
    b = '';
    
    $.each(PATH.dirs, function (i,dir) {
      h.push('<li><a href="#">'+PATH.dirs[i]+'</a></li>');
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
  $(document).click(function () {
    $('.hasPopover').webuiPopover('hide');
  };
  $('.hasPopover').webuiPopover({
    trigger: 'manual',
    animation: 'gnomeslide',
    placement: 'bottom',
    content: function () {
      var html='<ul>';
      $.each(MENU, function (i,item) {
        html += "<li>"+item+"</li>";
      });
      html+="</ul>";
      return html;
    }
  });
  $('.hasPopover').contextmenu(function () {
    $(this).webuiPopover('show');
    return false;
  });
  $pb.css("width", $hb.width() - buttonwhitespace);
  $("#add").click(function () {
    PATH.addDir();
    PATH.renderOut($("ul.pathbar"));
  });
  $(window).resize(function () {
    $pb.css("width", $hb.width() - buttonwhitespace);
  });
});
