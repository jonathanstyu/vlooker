var $ = require('jquery'); 
var _ = require('underscore'); 
var XLSX = require('XLSX')
var EXPORTED_SYMBOLS = ['prepareUserInterface']

prepareUserInterface = function () {
    
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
    var compiledTable = _.template(fileHTMLTemplate)
    $(this).find('div.content').html(compiledTable({
      fileName: file.name,
      fileSize: file.size,
      dateLastModified: file.lastModifiedDate, 
      dataType: file.type, 
      path: file.path
    }))
    handleFile(e); 
    return false; 
    })
    
    var handleFile = function (event) {
      var original_file = event.originalEvent.dataTransfer.files[0]; 
      var fReader = new FileReader();

      fReader.onload = function (e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {type: 'binary'})
        console.log(workbook)
      }
      fReader.readAsBinaryString(original_file)
    }
}