import { app, BrowserWindow, clipboard } from 'electron';
const storage = require('electron-json-storage')

export var dataMenuTemplate = {
  label: 'Data',
  submenu: [
      {
        label: 'Upload Index File',
        accelerator: 'CmdOrCtrl+I',
        click: function(item, focusedWindow) {
          focusedWindow.webContents.send('uploadIndexFile')
        } // close click // anon function 
      }, // close upload sheet
      {
        label: 'Upload Lookup File', 
        accelerator: 'CmdOrCtrl+L',
        click: function (item, focusedWindow) {
          focusedWindow.webContents.send('uploadLookupFile')
        }
      }, 
      {
        label: 'Download Result File', 
        accelerator: 'CmdOrCtrl+D',
        click: function (item, focusedWindow) {
          focusedWindow.webContents.send('downloadResultFile')
        }
      }
    ]
}