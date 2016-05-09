var $ = require('jquery'); 
var _ = require('underscore'); 
require("./app_javascripts/notifications");
require("./app_javascripts/file");
require("./helpers/html_templates");
require('XLSX')

$(document).ready(function () {
  
  var compiledBoxes = _.template(boxes_template)
  $('#bodycontainer').html(compiledBoxes)
  XLSX.readFile()
    
  $(".box").on('dragenter', function (e) {
    e.preventDefault(); 
    e.stopPropagation(); 
    $(this).addClass('bg--blue fnt--white')
    return false; 
  })
  
  $(".box").on('dragover', function (e) {
    e.preventDefault(); 
    e.stopPropagation(); 
    return false; 
  })
  
  $(".box").on('dragleave', function (e) {
    e.preventDefault(); 
    e.stopPropagation(); 
    $(this).removeClass('bg--blue fnt--white')
    return false; 
  })
  
  $(".box").on('drop', function (e) {
    e.preventDefault(); 
    e.stopPropagation();
    var file = e.originalEvent.dataTransfer.files[0]; 
    console.log(file)
    var compiledTable = _.template(fileHTMLTemplate)
    $(this).find('div.content').html(compiledTable({
      fileName: file.name,
      fileSize: file.size,
      dateLastModified: file.lastModifiedDate, 
      dataType: file.type, 
      path: file.path
    }))
    return false; 
    })
    
})