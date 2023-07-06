const mqtt = require('mqtt');
const express = require('express');

const app = express();

const client = mqtt.connect('mqtt://192.168.168.88:1883');
client.subscribe('msg/test');

let mqttMessage = ''; // 儲存訊息

client.on('message', (topic, message) => {
    console.log('已收到訊息', message.toString());
  // 在這裡進行資料處理和相應的操作

  // 將資料存儲到資料庫、發送到其他連接的客戶端等等

  mqttMessage = message.toString(); // 更新最新的 MQTT 訊息
});

app.get('/data', (req, res) => {
  res.send(mqttMessage); // 回傳最新的 MQTT 訊息
});

app.listen(3000, () => {
    console.log('PORT:3000');
});
