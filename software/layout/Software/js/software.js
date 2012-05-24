$(document).ready(function () {

var $scr = $("#gallery img"),
    $thumbs = $("#thumbnails a");

$scr.hide();
$thumbs.click(function () {
  $scr.hide();
  $("#"+$(this).attr("data-img")).show();
  
});
});
