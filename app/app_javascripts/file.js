const ipcRenderer = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog; 
const screen = require('electron').screen; 

// Required libraries 
var fs = require('fs') // for CSV parsing
var FileAPI = require('file-api') // for dealing with files
var File = FileAPI.File // for file data
var XLSX = require('XLSX') // parsing XLSX + XLS
var Baby = require('BabyParse') // parsing CSV
var Parser = require("./vlook"); // Vlookup functionality

// for exporting to App.js and others
var EXPORTED_SYMBOLS = ['handleExcelfile', 'handleCSVfile']

// Handles parsing
var mainParser = new Parser(); 

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
      
      // Big ugly hack so that I can handle populate the arrays
      if (sheetClassification == "index") {
        mainParser.populateIndexArray(data)
      } else {
        mainParser.populateLookupArray(data)
      }
      render(); 
    }
  })
}

// broad function that ties together all the UI-related code
render = function () {
  var arrayIndexPairs = _.zip([mainParser.indexArray, mainParser.lookupArray], ['index', 'lookup']); 
  _.each(arrayIndexPairs, function (arrayIndexPair) {
    buildTable(arrayIndexPair[0], arrayIndexPair[1]); 
  })
  
  if (mainParser.indexArray.length > 0) {
    $('#uploadindex').addClass('active')
  }
  
  if (mainParser.lookupArray.length > 0) {
    $('#uploadlookup').addClass('active')
  }
  
  if (mainParser.vlookupOptions['indexCol']) {
    $('#selectindex').addClass('active')
  }
  
  if (mainParser.vlookupOptions['lookupCol']) {
    $('#selectlookup').addClass('active')
  }
  
}

// helper function to build the table interface
buildTable = function (parsedData, sheetClassification) {
  if (parsedData == []) {
    return
  }
  
  var zippedHeaders = _.zip(parsedData[0], parsedData[1])
  $("#" + sheetClassification + " tbody").empty()
  _.each(zippedHeaders, function (headerSet, headerIndex) {
    var templatedRows = _.template(dataRowTemplate)
    
    //this rather tortured if-else adds a clicked class to the clicked row in the mainParser's options using the if-else to determine whether the option isn't a null + whether the header in question is == to the option's number
    if (mainParser.vlookupOptions[sheetClassification + 'Col'] && headerIndex == mainParser.vlookupOptions[sheetClassification + 'Col']) {
      $("#" + sheetClassification + " tbody").append(templatedRows({
        headerName: headerSet[0],
        headerDataType: typeof headerSet[1],
        headerIndex: headerIndex, 
        className: sheetClassification + '-clicked'
      }));
    } else {
      $("#" + sheetClassification + " tbody").append(templatedRows({
        headerName: headerSet[0],
        headerIndex: headerIndex, 
        headerDataType: typeof headerSet[1],
        className: ''
      }));
    } 
  });
  
}

// Shared code to select and upload a data file
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

// action functions based on clicks 
$(document).on('click', '.add-button', function (event) {
  openDialogPicker(event.target.id); 
  render(); 
})

$(document).on('click', '.delete-button', function (event) {
  mainParser.removeArray(event.target.id); 
  render(); 
})

$(document).on('click', '#index.data-table', function (event) {
  // the split is to parse the ID, which is classified as "row-[int]"
  mainParser.updateOptions('indexCol', parseInt(event.target.id.split('-')[1])); 
  render();  
})

$(document).on('click', '#lookup.data-table', function (event) {
  // the split is to parse the ID, which is classified as "row-[int]"
  mainParser.updateOptions('lookupCol', parseInt(event.target.id.split('-')[1]))
  render(); 
})

// Tied to keyboard shortcuts
ipcRenderer.on('uploadIndexFile', function () {
  openDialogPicker("index"); 
})

ipcRenderer.on('uploadLookupFile', function () {
  openDialogPicker("lookup"); 
})