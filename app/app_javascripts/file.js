var EXPORTED_SYMBOLS = ['fileHTMLTemplate']

fileHTMLTemplate = "<table class='grd-row-col-2-6 p2'>\
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