$(document).ready(function () {

var $scr = $("#gallery img"),
    $thumbs = $("#thumbnails a");

$scr.hide();
$thumbs.click(function (i) {
  console.log(this,i);
  
});
});
