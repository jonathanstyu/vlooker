var $ = require('../helpers/jquery.min.js'); 
var _ = require('../helpers/underscore-min.js'); 
var Baby = require('../helpers/babyparse.js');  // parsing CSV
var CSV = require('../helpers/csv.min.js');  // parsing CSV pt 2

// var $ = require('jquery');
// var _ = require('underscore');
// var Baby = require('BabyParse') // parsing CSV

var Parser = function () {
  this.indexArray = []; 
  this.lookupArray = [];
  this.finalResultArray = []; 
  
  this.vlookupOptions = {
    'indexCol': null,
    'lookupCol': null,
    'colsToAppend': null,
    'ready': false
  }
  
  // helper functions to populate/clear arrays to search for
  this.populateIndexArray = function (indexArray) {
    // this.indexArray = Baby.parse(indexArray).data;
    var csv = new CSV(indexArray, {
      cast: true,
      header: false
    })
    this.indexArray = csv.parse();
  }
  
  this.populateLookupArray = function (lookupArray) {
    // this.lookupArray = Baby.parse(lookupArray).data;
    var csv = new CSV(lookupArray, {
      cast: true,
      header: false
    })
    this.lookupArray = csv.parse();
  }
  
  this.removeArray = function (identifier) {
    if (identifier == 'index') {
      this.indexArray = []; 
      this.vlookupOptions['indexCol'] = null; 
    } else {
      this.lookupArray = []; 
      this.vlookupOptions['lookupCol'] = null;
      this.vlookupOptions['colsToAppend'] = null;
    }
  }
  
  this.resetLookupOptions = function () {
    this.vlookupOptions = {
      'indexCol': null,
      'lookupCol': null,
      'colsToAppend': null,
      'ready': false
    }
  }
  
  // helper function to populate vlookup options and check for readiness
  this.updateOptions = function (identifier, value) {
    this.vlookupOptions[identifier] = value;
    this.checkStatus()
  }
  
  this.checkStatus = function () {
    if (this.vlookupOptions['indexCol'] === null || this.vlookupOptions['lookupCol'] === null || this.vlookupOptions['colsToAppend'] === null) {
      this.vlookupOptions['ready'] = false; 
    } else {
      this.vlookupOptions['ready'] = true; 
    }
  }
  
  // execution function
  // indexCol :: Int = the column in indexArray where the indices are 
  // lookupCol :: Int = the column in lookupArray where you look for the indices
  // cols to append :: Array = what you want to join on to the index
  this.vlookup = function () {
    if (!this.vlookupOptions.ready) {
      return
    }
    // console.log("lookupArray:" + this.lookupArray)
    // console.log("indexArray:" + this.indexArray)
    
    var lookupHash = {};
    var resultArray = this.indexArray.slice(0);
    var indexCol = this.vlookupOptions['indexCol']; 
    var lookupCol = this.vlookupOptions['lookupCol']; 
    var colsToAppend = this.vlookupOptions['colsToAppend']; 
    var that = this; 
    
    // Indexes the lookupArray using the LookupColumn variable
    _.each(this.lookupArray, function (row, rowIndex) {
      lookupHash[row[lookupCol]] = rowIndex; 
    }); 
    
    // for each item in index array, search and append from lookupCol 
    _.each(resultArray, function (row, rowIndex) {
      var searchResult = lookupHash[row[indexCol]]
      // searchResult uses hash to find row[indexCol], the indexing item
      if (searchResult >= 0) {
        // if success, then take the ColstoAppend factor to join onto the end of the row
        row.push(that.lookupArray[searchResult][colsToAppend]); 
      }
    }); 
    
    console.log(resultArray)
    this.finalResultArray = resultArray;
  }   
}

module.exports = Parser; 