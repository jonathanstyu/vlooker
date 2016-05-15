var EXPORTED_SYMBOLS = ['boxes_template', 'fileHTMLTemplate', 'datatabletemplate', 'dataRowTemplate']

boxes_template = "<div class='box grd-row txt--center brdr--dark-gray animated bounceIn' id='drop-<%= boxid %>'>\
<h4 class='txt--center'>Drop Sheet <%= boxid %> Here. XLS, XLSX Accepted</h4>\
</div>"

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

datatabletemplate = "<div class='grd-row-col-2-6' id='<%= divID %>'>\
<p class='txt--center'><%= divID %></p>\
<table id='<%= divID %>-table'>\
<thead><tr>\
<th class='txt--center'>Header Name</th>\
<th class='txt--center'>Data Type</th>\
</tr></thead>\
<tbody></tbody>\
</table></div>"

dataRowTemplate = "<tr>\
<td><%= headerName %></td>\
<td><%= headerDataType %></td>\
</tr>"