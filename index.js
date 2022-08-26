const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exportExcel, exportJson, handleData } = require("./main");

function test() {
  console.log("dmm");
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.webContents.openDevTools();

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      // ipcMain.handle("showData", handleData);
      ipcMain.handle("dialog:showData", test);

      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
