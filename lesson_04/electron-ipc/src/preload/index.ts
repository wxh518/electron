import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  setTitle: (title: string) => {
    console.log('预加载脚本收到标题', title);
    ipcRenderer.send('setTitle', title)
  },
  incrementNumber: (callback) => {
    ipcRenderer.on('increment', callback)
  },
  sendMsg: async (msg: string, callback) => {
    console.log('预加载脚本收到消息', msg);
    const result = await ipcRenderer.invoke('msg', msg);
    callback(result);
  } 
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
