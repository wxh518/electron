const {BrowserWindow, app} = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 400
    })
    win.loadURL('http://localhost:5173/')
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
        {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'dar-win')
    {
        app.quit()
    }
})