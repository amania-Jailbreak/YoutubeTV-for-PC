// Modules to control application life and create native browser window
const { app, BrowserWindow} = require('electron');
const fs = require('fs');

const createWindow = () => {
  // Create the browser window.
  var userAgent = 'Mozilla/5.0 (SMART-TV; Create By CasioTweaks) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36'
  const mainWindow = new BrowserWindow({
    width: 600, height: 800, kiosk: true, 'fullscreen': true, 'frame': false,
    webPreferences: {
      enableRemoteModule: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL('https://www.youtube.com/tv', { userAgent: userAgent });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})
app.on('ready', () => {
  const easyList = fs.readFileSync('./easylist.txt', 'utf8').split('\n');
  const { session } = require('electron');
  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    if (easyList.some((pattern) => details.url.match(pattern))) {
      console.log(`広告をブロックしました: ${details.url}`);
      const blockingResponse = {
        cancel: true
      };

      callback(blockingResponse);
    } else {
      callback({});
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  app.quit();
})
