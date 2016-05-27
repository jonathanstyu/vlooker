var $ = require('jquery'); 
var jQuery = require('jquery'); 
var _ = require('underscore'); 
require('datatables.net')(); 
require("./app_javascripts/notifications");
require("./app_javascripts/file");
require("./helpers/html_templates");
require("./helpers/box_drag");
require('XLSX'); 
const ipcRenderer = require('electron').ipcRenderer;
var Parser = require("./app_javascripts/vlook");

$(document).ready(function () {
  
  _.each(['index', 'lookup'], function (divID) {
    var dataTableTemplate = _.template(datatabletemplate)
    $('#content').append(dataTableTemplate({
      divID: divID
    }));
    $('.data-table').dataTable()
  })
  
  // var index = [["er", "3535"], ["pikachu", "4745"], ["squirtable", "6"]]
  // var lookup = [["3535", "dog", 'cat', 'adam'], ["6", "flip", 'iphone', 'blip']]
  // var vlooker = new Parser(index, lookup)
  //
  // vlooker.vlookup(1, 0, 1)
})