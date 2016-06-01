const ipcRenderer = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog; 
const screen = require('electron').screen; 

// Required libraries 
var $ = require('../helpers/jquery.min.js'); 
var _ = require('../helpers/underscore-min.js'); 
var fs = require('fs') // for CSV parsing
var FileAPI = require('file-api') // for dealing with files
var File = FileAPI.File // for file data
// var XLSX = require('XLSX') // parsing XLSX + XLS
var Baby = require('../helpers/babyparse.js');  // parsing CSV
var CSV = require('../helpers/csv.min.js');  // parsing CSV pt 2
var Parser = require("./vlook"); // Vlookup functionality

// for exporting to App.js and others
var EXPORTED_SYMBOLS = ['handleExcelfile', 'handleCSVfile']

// Handles parsing
var mainParser = new Parser(); 

// Indicates Column Append Mode
var colAppendMode = false; 

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

// broad function that ties together all the UI-related code + checks the Parser
render = function () {
  var arrayIndexPairs = _.zip([mainParser.indexArray, mainParser.lookupArray], ['index', 'lookup']); 
  _.each(arrayIndexPairs, function (arrayIndexPair) {
    buildTable(arrayIndexPair[0], arrayIndexPair[1]); 
  })
  
  if (mainParser.indexArray.length > 0) {
    $('#uploadindex').addClass('completed')
  }
  
  if (mainParser.lookupArray.length > 0) {
    $('#uploadlookup').addClass('completed')
  }
  
  if (mainParser.vlookupOptions['indexCol'] != null) {
    $('#selectindex').addClass('completed')
  }
  
  if (mainParser.vlookupOptions['lookupCol'] != null) {
    $('#selectlookup').addClass('completed')
    
    // add the col append button, and only one
    if ($('#lookup-append').length == 0) {
      $('#buttons-lookup').append("<button class='btn lookup-button' id='lookup-append'>Select Append Col</button>")
    }
  }
  
  if (mainParser.vlookupOptions['colsToAppend'].length > 0) {
    $('#selectaddCols').addClass('completed')
  }
  
  
  // if the vlookup parser has all of its options ready, then we can run the vlookup
  mainParser.checkStatus()
  if (mainParser.vlookupOptions['ready'] && $('#lookup-start').length == 0) {
    // console.log("button enabled!")
    $('#buttons-lookup').append("<a href='#lookup-start' class='btn' id='lookup-start'>Start Lookup</a>")
  } else {
    // console.log("button stays disabled")
    $('#lookup-start').remove()
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
    if (mainParser.vlookupOptions[sheetClassification + 'Col'] != null && headerIndex === mainParser.vlookupOptions[sheetClassification + 'Col']) {
      // for selecting index/lookup cols
      
      $("#" + sheetClassification + " tbody").append(templatedRows({
        headerName: headerSet[0],
        headerDataType: typeof headerSet[1],
        headerIndex: headerIndex, 
        className: sheetClassification + '-clicked'
      }));
    } else if (sheetClassification == 'lookup' && _.contains(mainParser.vlookupOptions['colsToAppend'], headerIndex)) {
      // specific only to the lookup sheet, the columns to append are colored 
      
      $("#" + sheetClassification + " tbody").append(templatedRows({
        headerName: headerSet[0],
        headerDataType: typeof headerSet[1],
        headerIndex: headerIndex, 
        className: sheetClassification + '-clicked-append'
      }));
    } else {
      // covers the normal situation, no formatting
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
}; 

var openDialogSave = function (data) {
  dialog.showSaveDialog({
    title: "saved_file",
    filters: [
      {name: "CSV", extensions: ['csv']}
    ]
  }, function (fileName) {
    fs.writeFile(fileName, data, function (error) {
      console.log(error)
    })
  })
}

// action functions based on clicks - add a sheet
$(document).on('click', '.add-button', function (event) {
  openDialogPicker(event.target.id); 
  render(); 
})

// Deleting a sheet also removes the completed categories for selecting columns
$(document).on('click', '.delete-button', function (event) {
  mainParser.removeArray(event.target.id); 
  $('#upload' + event.target.id).removeClass('completed')
  $('#select' + event.target.id).removeClass('completed')
  
  if (event.target.id == 'lookup') {
    $('#lookup-append').remove()
  }
  
  render(); 
})

// Behavior for any click on a table, selecting a column to append/etc. 
$(document).on('click', '.data-table', function (event) {
  console.log()
  if (event.target.class == 'table-head') {
    return
  }
  // the split is to parse the ID, which is classified as "row-[int]"
  
  // if we are in column append mode, then we need to route data to the column append of the parser
  if (colAppendMode) {
    mainParser.updateOptions('colsToAppend', parseInt(event.target.id.split('-')[1]))
  } else {
    var tabletype = $(this).closest('table').attr('id')
    
    mainParser.updateOptions(tabletype + 'Col', parseInt(event.target.id.split('-')[1])); 
  }
  
  render(); 
})

// Entering column append mode
$(document).on('click', '#lookup-append', function (event) {
  colAppendMode = !colAppendMode; 
  render(); 
})


// start the lookup, and open the modal 
$(document).on('click', '#lookup-start', function (event) {
  mainParser.vlookup(); 
  
  // hide the lookup/index content for now and let's show the modal
  var modalHTML = _.template(modaltemplate)
  
  $('#content').hide(); 
  $('#main-container').append(modalHTML({
    results: mainParser.finalResultArray
  }))
})

// Download the CSV from results
$(document).on('click', '.dl-button', function (event) {
  // Finalresultarray check is for length
  if (mainParser.finalResultArray.length > 0) {
    openDialogSave(new CSV(mainParser.finalResultArray).encode())
  }
})


// dimiss the modal 
$(document).on('click', '.dismiss-modal-button', function (event) {
  //Empty the completed modal and let's bring back the previous table content
  $('#completed-modal').empty(); 
  $('#content').show(); 
})

// Tied to keyboard shortcuts
ipcRenderer.on('uploadIndexFile', function () {
  openDialogPicker("index"); 
})

ipcRenderer.on('uploadLookupFile', function () {
  openDialogPicker("lookup"); 
})