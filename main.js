const { app, BrowserWindow } = require('electron')
const exec = require('child_process').exec;

let win;
function execute(command, callback) {
  exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
};

function tekrarla() {
  setInterval(function () {
    execute('python3 oku.py', (output) => {
        if (output.length >= 8) {
          if (win.webContents.getTitle() == "Müşteri Ekle") {  
            win.webContents.executeJavaScript("s = document.getElementById('kartUID');for(let i=0;i<s.options.length;i++){if(s.options[i].innerText=='" + output + "'){s.selectedIndex = i;break;}}", false)
          }else if(win.webContents.getTitle() == "Kart Ekle"){
            win.webContents.executeJavaScript("document.getElementById('kartUID').value='"+output+"'",false)
          }
        }
    });
  }, 2100);
}

function createWindow() {
  win = new BrowserWindow({
    title:'Gülkent Kart',
    width: 1280,
    height: 800,
    resizable: false,
    autoHideMenuBar:true
  })

  win.loadURL('http://34.72.128.32:1414/')
}

app.whenReady().then(function () { createWindow(); tekrarla(); })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});

win.on('page-title-updated', (evt) => {
  evt.preventDefault();
});