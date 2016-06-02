var EXPORTED_SYMBOLS = ['fileHTMLTemplate', 'datatabletemplate', 'dataRowTemplate', 'modaltemplate', 'emptyStateTemplate']

fileHTMLTemplate = "<table class='data-set grd-row'>\
<tr>\
<th>File Name</th>\
<th>File Size</th>\
<th>Data Type</th>\
</tr>\
\
<tr>\
<td><%= fileName %></td>\
<td><%= fileSize %></td>\
<td><%= dataType %></td>\
</tr>\
</table><hr>"

datatabletemplate = "<div class='column col-6 p2' id='<%= divID %>'>\
<p class='txt--center'><%= divID %></p>\
<div class='btn-group btn-group-block pb-10' id='buttons-<%= divID %>'>\
<button class='btn delete-button' id='<%= divID %>'>Delete</button>\
<button class='btn add-button' id='<%= divID %>'>Add</button>\
<% if (divID == 'lookup') { %>\
  <button class='btn lookup-button' id='lookup-append'>Append Cols</button>\
  <button class='btn' id='lookup-start'>Start Lookup</button>\
<% } %>\
</div>\
<div class='divider'></div>\
<table id='<%= divID %>' class='table table-striped data-table'>\
<thead><tr>\
<th class='txt--center'>Header Name</th>\
<th class='txt--center'>Data Type</th>\
</tr></thead>\
<tbody></tbody>\
</table>\
<div id='<%= divID %>-content-support'></div>\
</div>"

dataRowTemplate = "<tr class='<%= className %>'>\
<td id='header-<%=headerIndex%>'><%= headerName %></td>\
<td id='datatype-<%=headerIndex%>'><%= headerDataType %></td>\
</tr>"

modaltemplate = "<div class='column col-6 animated fadeInDown' id='completed-modal'>\
<div class='toast toast-success'>\
  <button class='btn btn-clear float-right'></button>\
  Completed Lookup Mapping\
</div><hr>\
<div class='btn-group btn-group-block pb-10' id='completed-buttons'>\
<button class='btn dismiss-modal-button'>Dismiss</button>\
<button class='btn dl-button'>Download</button>\
</div>\
<div class='divider'></div>\
<table id='completed' class='table table-striped'>\
<thead><tr>\
<th class='table-head'>Header Name</th>\
<th class='table-head'>Data Type</th>\
</tr></thead>\
<tbody>\
<% for (var i = 0; i < results.length; i++) { %>\
<tr>\
<td><%= results[i][0] %></td>\
<td><%= results[i][1] %></td>\
</tr>\
<% } %>\
</tbody>\
</table></div>"
  
emptyStateTemplate = "<div class='empty'>\
  <i class='icon icon-people'></i>\
  <p class='empty-title'>Upload a Sheet</p>\
  <p class='empty-meta'>CSVs supported only right now.</p>\
</div>"