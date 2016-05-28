var $ = require('jquery'); 
var _ = require('underscore'); 
var Baby = require('BabyParse') // parsing CSV

var Parser = function () {
  this.indexArray = []; 
  this.lookupArray = []; 
  
  this.vlookupOptions = {
    'indexCol': null,
    'lookupCol': null,
    'colsToAppend': null,
    'ready': false
  }
  
  // helper functions to populate/clear arrays to search for
  this.populateIndexArray = function (indexArray) {
    this.indexArray = Baby.parse(indexArray).data; 
  }
  
  this.populateLookupArray = function (lookupArray) {
    this.lookupArray = Baby.parse(lookupArray).data; 
  }
  
  this.removeArray = function (identifier) {
    if (identifier == 'index') {
      this.indexArray = []; 
      this.vlookupOptions['indexCol'] = null; 
    } else {
      this.lookupArray = []; 
      this.vlookupOptions['lookupCol'] = null; 
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
    
    var indexCol = this.vlookupOptions['indexCol']
    var lookupCol = this.vlookupOptions['lookupCol']
    var colsToAppend = this.vlookupOptions['colsToAppend']
    
    var populatedHash = prepareLookupHash(lookupCol); 
    var mergedArrays = searchAndAppend(indexCol, populatedHash, colsToAppend)
    console.log(populatedHash)
    console.log(mergedArrays)
  }
  
  // Indexes the lookupArray using the LookupColumn variable
  var prepareLookupHash = function (lookupCol) {
    var lookupHash = {};
    _.each(lookupArray, function (row, rowIndex) {
      lookupHash[row[lookupCol]] = rowIndex; 
    }); 
    
    return lookupHash; 
  }
  
  // for each item in index array, search and append from lookupCol 
  var searchAndAppend = function (indexCol, lookupHash, colsToAppend) {
    var resultArray = indexArray.slice(0);
    
    _.each(resultArray, function (row, rowIndex) {
      var searchResult = lookupHash[row[indexCol]]
      // searchResult uses hash to find row[indexCol], the indexing item
      if (searchResult >= 0) {
        // if success, then take the ColstoAppend factor to join onto the end of the row
        row.push(lookupArray[searchResult][colsToAppend]); 
      }
    }); 
    
    return resultArray; 
  }
  
}

module.exports = Parser; 