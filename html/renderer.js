const windowControls = window.windowControls

// HTML要素にイベントリスナーを追加する
document.getElementById('button2').addEventListener('click', windowControls.handleMaximize)
document.getElementById('button1').addEventListener('click', windowControls.handleMinimize)
document.getElementById('button3').addEventListener('click', windowControls.handleClose)