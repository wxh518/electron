<script setup lang="ts">
import { appendFile } from 'fs';
import { reactive, ref } from 'vue'

const versions = reactive({ ...window.electron.process.versions })

const title = ref<string>('');
const valueNumber = ref<number>(0);
const onSetTitle = () => {
  console.log('开始发送标题', title.value, window);
  window.api?.setTitle(title.value);
}
const handleIncrement = (event, value: number) => {
  valueNumber.value += value;
  event.sender.send('finish', valueNumber.value)
}
window.api?.incrementNumber(handleIncrement);

const onSendMsg = () => {
  window.api.sendMsg('renderer msg!', handleRecvMessage)
}

const handleRecvMessage = (result: string) => {
  console.log('渲染进程收到主进程的回复啦：', result);
}
</script>

<template>
  <ul class="versions">
    <li class="electron-version">Electron v{{ versions.electron }}</li>
    <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
    <li class="node-version">Node v{{ versions.node }}</li>
    <li class="v8-version">V8 v{{ versions.v8 }}</li>
  </ul>
  <br>
  <label>渲染进程发送消息给主进程</label>
  <input style="width: 200px; height: 30px;" v-model="title">
  <button style="width: 100px; height: 30px;" @click="onSetTitle">设置标题</button>
  <label>渲染进程收到主进程的消息</label>
  <label>{{ valueNumber }}</label>
  <label>渲染进程发送消息给主进程， 并等待主进程返回</label>
  <button @click="onSendMsg">发送信号给主进程，并等待主进程返回</button>
</template>
