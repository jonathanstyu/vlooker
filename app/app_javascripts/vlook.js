var $ = require('jquery'); 
var _ = require('underscore'); 
var EXPORTED_SYMBOLS = ['VLook']

VLook = function (search_key, range, index, is_sorted) {
  this.search_key = search_key; 
  this.range = range; 
  // this.index = index;
  this.is_sorted = is_sorted; 
}