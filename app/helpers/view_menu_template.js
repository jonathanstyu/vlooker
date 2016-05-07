import { app, BrowserWindow } from 'electron';

export var viewMenuTemplate = {
  label: 'View',
  submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.reload();
        }
      }
    ]
}