const ipcRenderer = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog; 
const screen = require('electron').screen; 

// Required libraries 
var fs = require('fs') // for CSV parsing
var FileAPI = require('file-api') // for dealing with files
var File = FileAPI.File // for file data
var XLSX = require('XLSX') // parsing XLSX + XLS
var Baby = require('BabyParse') // parsing CSV

// for exporting to App.js and others
var EXPORTED_SYMBOLS = ['handleExcelfile', 'handleCSVfile']

// functions 

// Function that creates a File and the information panel 
var createFile = function (filename) {
  return file = new File({
    path: filename,
    jsdom: true
  })
}

// Disabled for now
handleExcelfile = function (filename, sheetClassification) {
  createFile(filename)
  var workbook = XLSX.readFile(filename)
  console.log(workbook)
}

// sheetClassifiction variable lets me know where to go
handleCSVfile = function (filename, sheetClassification) {
  var csvFile = createFile(filename)
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) {
      console.log(err)
    } else {
      buildTable(Baby.parse(data), sheetClassification)
    }
  })
}

// build the rows
buildTable = function (parsedData, sheetClassification) {
  // console.log(parsedData.data)
  // _.each(parsedData.data[0], function (rowCell) {
  //   console.log(rowCell)
  // })
    var zippedHeaders = _.zip(parsedData.data[0], parsedData.data[1])
  _.each(zippedHeaders, function (headerSet) {
    var templatedRows = _.template(dataRowTemplate)
    $("#" + sheetClassification + " tbody").append(templatedRows({
      headerName: zippedHeaders[0],
      headerDataType: typeof zippedHeaders[1]
    }))
  })
}

// Shared code 
var openDialogPicker = function (sheetClassification) {
  dialog.showOpenDialog({
    filters: [
      // Disable XLSX for now becaus I just don't wanna deal with it
      // {name: "Excel", extensions: ['xls', 'xlsx']},
      {name: "CSV", extensions: ['csv']}
    ], 
    // add 'multiSelections' if you want multi files
    properties: ['openFile']
  }, function(filenames){
    _.each(filenames, function (filename) {
      if (filename.search('.csv') > 0) {
        handleCSVfile(filename, sheetClassification)
      } else if (filename.search('.xls') > 0 || filename.search('.xlsx') > 0) {
        handleExcelfile(filename, sheetClassification)
      } else {
        console.log("not available")
      }
    })
  }) // close the dialog.showOpenDialog  
}

// Tied to keyboard shortcuts
ipcRenderer.on('uploadIndexFile', function () {
  openDialogPicker("idx"); 
})

ipcRenderer.on('uploadLookupFile', function () {
  openDialogPicker("lookup"); 
})

