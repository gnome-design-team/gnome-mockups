$(document).ready(function () {

  var $scr = $("#gallery img"),
      $thumbs = $("#thumbnails a");


  $thumbs.click(function () {
    $scr.hide();
    $thumbs.removeClass("selected");
    $("#"+$(this).attr("data-img")).show();
    $(this).addClass("selected");
  });
  $scr.hide();
  $thumbs[0].click();
});
