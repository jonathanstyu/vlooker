var $ = require('jquery'); 
var _ = require('underscore'); 

var Parser = function (indexArray, lookupArray) {
  this.indexArray = indexArray; 
  this.lookupArray = lookupArray; 
  
  // execution function
  // indexCol :: Int = the column in indexArray where the indices are 
  // lookupCol :: Int = the column in lookupArray where you look for the indices
  // cols to append :: Array = what you want to join on to the index
  this.vlookup = function (indexCol, lookupCol, colsToAppend) {
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