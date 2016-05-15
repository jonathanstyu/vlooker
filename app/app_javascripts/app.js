var $ = require('jquery'); 
var jQuery = require('jquery'); 
var _ = require('underscore'); 
require('datatables.net')(); 
require("./app_javascripts/notifications");
require("./app_javascripts/file");
require("./app_javascripts/vlook");
require("./helpers/html_templates");
require("./helpers/box_drag");
require('XLSX'); 
const ipcRenderer = require('electron').ipcRenderer;

$(document).ready(function () {
  _.each(['idx', 'lookup', 'result'], function (divID) {
    var dataTableTemplate = _.template(datatabletemplate)
    $('#content').append(dataTableTemplate({
      divID: divID
    })); 
  })
  
  $("table").dataTable()
})