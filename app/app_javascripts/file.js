const ipcRenderer = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog; 

// Required libraries 
var fs = require('fs') // for CSV parsing
var FileAPI = require('file-api') // for dealing with files
var File = FileAPI.File // for file data
var XLSX = require('XLSX') // parsing XLSX + XLS
var Baby = require('BabyParse') // parsing CSV

// for exporting to App.js and others
var EXPORTED_SYMBOLS = ['handleExcelfile', 'handleCSVfile']

// functions 

var createFile = function (filename) {
  var file = new File({
    path: filename,
    jsdom: true
  })
  var compiledTable = _.template(fileHTMLTemplate)
  $('#bodycontainer #start').remove()
  $('#bodycontainer').append(compiledTable({
    fileName: file.name,
    fileSize: file.size / 1000 + ' kb',
    dateLastModified: file.lastModifiedDate, 
    dataType: file.type
  }))
}

handleExcelfile = function (filename) {
  createFile(filename)
  var workbook = XLSX.readFile(filename)
  console.log(workbook)
  // var compiledWorkbook = _.template(xlsDivContainer);
  // $('#data-table').append(compiledTable({
  // }))  
}

handleCSVfile = function (filename) {
  createFile(filename)
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) {
      console.log(err)
    } else {
      var parsed = Baby.parse(data)
      // console.log(parsed.data)
    }
  })
}

ipcRenderer.on('uploadFile', function () {
  dialog.showOpenDialog({
    filters: [
      // Disable XLSX for now becaus I just don't wanna deal with it
      // {name: "Excel", extensions: ['xls', 'xlsx']},
      {name: "CSV", extensions: ['csv']}
    ], 
    properties: ['openFile', 'multiSelections']
  }, function(filenames){
    _.each(filenames, function (filename) {
      if (filename.search('.csv') > 0) {
        handleCSVfile(filename)
      } else if (filename.search('.xls') > 0 || filename.search('.xlsx') > 0) {
        handleExcelfile(filename)
      } else {
        console.log("not available")
      }
    })
  }) // close the dialog.showOpenDialog
})

