const {BrowserWindow, app} = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 300,
        alwaysOnTop: true
    })
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow();
    app.on('active', () => {
        if (BrowserWindow.getAllWindows().length === 0)
        {
            app.quit()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
    {
        app.quit()
    }
})