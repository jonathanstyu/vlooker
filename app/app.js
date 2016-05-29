var $ = require('./helpers/jquery.min.js'); 
var _ = require('./helpers/underscore-min.js');
// require("./helpers/notifications.js");
// require("./helpers/file.js");
// require("./helpers/html_templates");
// const ipcRenderer = require('electron').ipcRenderer;
// var Parser = require("./helpers/vlook.js");

$(document).ready(function () {

  _.each(['index', 'lookup'], function (divID) {
    var dataTableTemplate = _.template(datatabletemplate)
    $('#content').append(dataTableTemplate({
      divID: divID
    }));
  })

})
