const ipcRenderer = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog; 
var fs = require('fs'); 
var XLSX = require('XLSX')
var EXPORTED_SYMBOLS = ['handleUploadedFiles', 'findFilesWithPath']

handleUploadedFiles = function (filenames) {
  var file = new File(filenames[0]); 
  var compiledTable = _.template(fileHTMLTemplate);
  $('#bodycontainer').html(compiledTable({
    fileName: file.name,
    fileSize: file.size,
    dateLastModified: file.lastModifiedDate,
    dataType: file.type,
    path: file.path
  }))
}

findFilesWithPath = function (filenames) {
  _.each(filenames, function (filename) {
    var workbook = XLSX.readFile(filename)
    console.log(workbook)
  })
}

ipcRenderer.on('uploadFile', function () {
  dialog.showOpenDialog({
    filters: [
      {name: "Sheets", extensions: ['xls', 'xlsx']}
    ], 
    properties: ['openFile', 'multiSelections']
  }, function(filenames){
    findFilesWithPath(filenames)
  }) // close the dialog.showOpenDialog
})

