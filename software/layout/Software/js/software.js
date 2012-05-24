$(document).ready(function () {

var $scr = $("#gallery img"),
    $thumbs = $("#thumbnails a");

$scr.hide();
$thumbs.click(function () {
  console.log($($(this).attr("id")));
  
});
});
