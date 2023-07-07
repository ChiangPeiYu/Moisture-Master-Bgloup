const mqtt = require('mqtt');
const admin = require('firebase-admin');
const express = require('express');

// 初始化 Firebase Admin SDK
const serviceAccount = require('./newKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();

const client = mqtt.connect('mqtt://192.168.168.88:1883');
client.subscribe('msg/test');

client.on('message', (topic, message) => {
    console.log('收到訊息:', message.toString());
  // 在這裡進行資料處理和相應的操作

  // 將資料存儲到 Firebase Cloud Firestore
    const data = JSON.parse(message.toString());
    const temperature = data.temperature;
    const humidity = data.humidity;

  // 假設您的 Firebase Firestore 中已經建立了一個 "sensorData" 的集合
    const db = admin.firestore();
    const sensorDataRef = db.collection('sensorData');

  // 資料存儲到 Firestore 中
    sensorDataRef.add({
    temperature,
    humidity,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
    console.log('傳送成功:', docRef.id);
    })
    .catch((error) => {
    console.error('傳送失敗:', error);
    });
});

app.listen(3000, () => {
    console.log('Port:3000');
});
