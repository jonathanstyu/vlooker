var EXPORTED_SYMBOLS = ['fileHTMLTemplate', 'datatabletemplate', 'dataRowTemplate', 'modaltemplate']

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
</div>\
<div class='divider'></div>\
<table id='<%= divID %>' class='table table-striped data-table'>\
<thead><tr>\
<th class='txt--center'>Header Name</th>\
<th class='txt--center'>Data Type</th>\
</tr></thead>\
<tbody></tbody>\
</table></div>"

dataRowTemplate = "<tr class='<%= className %>'>\
<td id='header-<%=headerIndex%>'><%= headerName %></td>\
<td id='datatype-<%=headerIndex%>'><%= headerDataType %></td>\
</tr>"

modaltemplate = "<div class='column col-6 animated fadeInDown' id='completed'>\
<p class='txt--center'>Completed Lookup Mapping</p>\
<div class='btn-group btn-group-block pb-10' id='completed-buttons'>\
<button class='btn dl-button'>Download</button>\
</div>\
<div class='divider'></div>\
<table id='completed' class='table table-striped data-table'>\
<thead><tr>\
<th class='txt--center'>Header Name</th>\
<th class='txt--center'>Data Type</th>\
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