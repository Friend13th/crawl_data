const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  showDataInTable: () => ipcRenderer.invoke("dialog:showData"),
});
