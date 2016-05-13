import { app, BrowserWindow, clipboard } from 'electron';
const storage = require('electron-json-storage')

export var dataMenuTemplate = {
  label: 'Data',
  submenu: [
      {
        label: 'Upload Sheet',
        accelerator: 'CmdOrCtrl+U',
        click: function(item, focusedWindow) {
          focusedWindow.webContents.send('uploadFile')
        } // close click // anon function 
      }, // close upload sheet
      {
        label: 'Other Stuff', 
        accelerator: 'CmdOrCtrl+S',
        click: function (item, focusedWindow) {
          focusedWindow.webContents.send('saveFile')
        }
      }
    ]
}