// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app, Menu, globalShortcut } from 'electron';
import { devMenuTemplate } from './helpers/menu_templates/dev_menu_template';
import { editMenuTemplate } from './helpers/menu_templates/edit_menu_template';
import { viewMenuTemplate } from './helpers/menu_templates/view_menu_template';
import { windowMenuTemplate } from './helpers/menu_templates/window_menu_template';
import { dataMenuTemplate } from './helpers/menu_templates/data_menu_template';

import createWindow from './helpers/window';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow;

// This is for setting menus on the tray/right click
var setApplicationMenu = function () {
    var menus = [editMenuTemplate, windowMenuTemplate, dataMenuTemplate];
    if (env.name !== 'production') {
      menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// if (env.name !== 'production') {
//     require('electron-reload')(__dirname)
// }

app.on('ready', function () {
    setApplicationMenu();

    var mainWindow = createWindow('main', {
        width: 1000,
        height: 600
    });

    mainWindow.loadURL('file://' + __dirname + '/app.html');

    if (env.name !== 'production') {
        mainWindow.openDevTools();
    }
    
});

app.on('window-all-closed', function () {
    app.quit();
});
