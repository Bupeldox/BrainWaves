const { app, BrowserWindow } = require('electron');
const path = require("path");
const getPath = (fromRoot)=>path.join(__dirname,"../",fromRoot);


const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      autoHideMenuBar: true,
    })
    win.loadFile(getPath('./public/index.html'));
  }

app.on("ready",() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})