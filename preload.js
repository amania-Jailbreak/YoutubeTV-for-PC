const { contextBridge, remote } = require('@electron/remote')

// ウィンドウを最大化する関数
const handleMaximize = () => {
  const win = remote.getCurrentWindow()
  if (win.isMaximized()) {
    win.unmaximize()
  } else {
    win.maximize()
  }
}

// ウィンドウを最小化する関数
const handleMinimize = () => {
  remote.getCurrentWindow().minimize()
}

// ウィンドウを閉じる関数
const handleClose = () => {
  remote.getCurrentWindow().close()
}

contextBridge.exposeInMainWorld('windowControls', {
  handleMaximize,
  handleMinimize,
  handleClose
})