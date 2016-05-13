var EXPORTED_SYMBOLS = ['boxes_template', 'fileHTMLTemplate']

boxes_template = "<div class='box grd-row txt--center brdr--dark-gray animated bounceIn' id='drop-<%= boxid %>'>\
<h4 class='txt--center'>Drop Sheet <%= boxid %> Here. XLS, XLSX Accepted</h4>\
</div>"

fileHTMLTemplate = "<table class='grd-row'>\
<tr>\
<th>File Name</th>\
<td><%= fileName %></td>\
</tr>\
\
<tr>\
<th>File Size</th>\
<td><%= fileSize %></td>\
</tr>\
\
<tr>\
<th>Last Modified</th>\
<td><%= dateLastModified %></td>\
</tr>\
\
<tr>\
<th>Data Type</th>\
<td><%= dataType %></td>\
</tr>\
</table><hr>"

xlsDivContainer = "<div class='grd-row' id='xls-<%= sheetName %>'>\
</div>"