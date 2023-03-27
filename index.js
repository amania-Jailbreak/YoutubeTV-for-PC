const { app, BrowserWindow, BrowserView } = require('electron')

const path = require('path')
var userAgent = 'Mozilla/5.0 (SMART-TV; Create By CasioTweaks) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36'
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 605,kiosk: true, 'fullscreen': true,frame:false,
    webPreferences: {
      preload: path.join(__dirname,'preload.js'),
      enableRemoteModule: true
    }
  })
  mainWindow.setMenuBarVisibility(false);
  //mainWindow.loadURL(rootUrl, { userAgent: userAgent }).
  mainWindow.loadFile("./html/index.html")
  mainWindow.openDevTools();
  let view = new BrowserView()
  mainWindow.setBrowserView(view)
  let winWidth = mainWindow.getBounds().width
  let winHeight = mainWindow.getBounds().height
  let viewHeight = winHeight - 24
  view.setBounds({ x: 0, y: 0, width: winWidth, height: winHeight })
  view.webContents.loadURL('https://www.youtube.com/tv', { userAgent: userAgent })
  mainWindow.on('resize', () => {
    if (mainWindow.isFullScreen()) {
      // フルスクリーンのときの処理
      let winWidth = mainWindow.getBounds().width
      let winHeight = mainWindow.getBounds().height
      let viewHeight = winHeight - 24
      view.setBounds({ x: 0, y: 0, width: winWidth, height: winHeight })
    } else {
      // フルスクリーンでないときの処理
      let winWidth = mainWindow.getBounds().width
      let winHeight = mainWindow.getBounds().height
      let viewHeight = winHeight - 24
      view.setBounds({ x: 0, y: 24, width: winWidth, height: viewHeight })
    }

  })
  const ipcMain = require('electron').ipcMain;
  ipcMain.handle("button3", () => {
    mainWindow.close()
    // or
    // mainWindow.maximize();
  });

  view.webContents.on('close', () => {
    // BrowserWindowを閉じる
    mainWindow.close()
  })
  mainWindow.setAlwaysOnTop(true, "screen-saver")

}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
