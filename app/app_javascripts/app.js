// window.$ = window.jQuery = require("./app_javascripts/jquery");
var $ = require('jquery'); 
var _ = require('underscore'); 
require("./app_javascripts/notifications");
require("./helpers/html_templates");

$(document).ready(function () {
  
  var compiled = _.template(boxes_template)
  $('#container').html(compiled)
    
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