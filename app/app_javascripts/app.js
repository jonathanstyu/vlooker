window.$ = window.jQuery = require("./app_javascripts/jquery");
window._ = require("./app_javascripts/underscore-min");
require("./app_javascripts/notifications");

$(document).ready(function () {
    
  $(".box").on('dragenter', function (e) {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    $(this).css('border', '2px dashed lightblue')
    return false
  })
  
  $(".box").on('dragover', function (e) {
    e.preventDefault(); 
    e.stopPropagation(); 
  })
  
  $(document).on('drop', function (e) {
    e.defaultPrevented = true
    e.preventDefault(); 
    e.stopPropagation();
    var file = e.originalEvent.dataTransfer.files[0]; 
    console.log("File you dragged is here", file.path); 
  })  
  
})