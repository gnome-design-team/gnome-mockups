$(document).ready(function () {

  var $scr = $("#gallery img"),
      $thumbs = $("#thumbnails a");


  $thumbs.click(function () {
    $scr.hide();
    $("#"+$(this).attr("data-img")).show();
   
  });
  $scr.hide();
  $thumbs[0].click();
});
