var EXPORTED_SYMBOLS = ['boxes_template', 'fileHTMLTemplate']

boxes_template = "<div class='box grd-row txt--center brdr--dark-gray animated bounceIn' id='drop-<%= boxid %>'>\
<h4 class='txt--center'>Drop Sheet <%= boxid %> Here. XLS, XLSX Accepted</h4>\
</div>"

fileHTMLTemplate = "<table class='grd-row p1 fnt--white'>\
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
\
<tr>\
<th>Path</th>\
<td><%= path %></td>\
</tr>\
\
</table>"