const {app, BrowserWindow} = require('electron');
const path = require('path');

function crearVentanaPrincipal(){
    let ventanaPrincipal = new BrowserWindow({
        width: 400,
        height: 800,
        icon:"icon.ico",
        webPreferences: {
            preload: path.join(__dirname, 'js/preload.js'),
            nodeIntegration: true
        }
    })
    ventanaPrincipal.setMenu(null);
    ventanaPrincipal.loadFile('index.html');
}

app.whenReady().then(crearVentanaPrincipal);

app.on('window-all-closed', function(){
    // if(process.platform == 'darwin'){
        app.quit();
    // }
})

app.on('activate', function(){
    if(BrowserWindow.getAllWindows().length === 0){
        crearVentanaPrincipal();
    }
})