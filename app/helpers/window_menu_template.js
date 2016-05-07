import { app, BrowserWindow } from 'electron';

export var windowMenuTemplate = {
  label: 'Window',
  role: 'window',
  submenu: [
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    }, // close the close window 
    {
      label: 'Toggle Full Screen',
      accelerator: (function() {
        if (process.platform == 'darwin')
          return 'Ctrl+Command+F';
        else
          return 'F11';
      })(),
      click: function(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
      }
    }, // close the toggle window button 
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    } // close the close snippet
  ]
}