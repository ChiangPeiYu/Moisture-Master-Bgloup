const mqtt = require('mqtt');
const admin = require('firebase-admin');
const express = require('express');
const sql = require('mssql');

// 初始化 Firebase Admin SDK
const serviceAccount = require('./newKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();

// MQTT连接与订阅
const client = mqtt.connect('mqtt://192.168.168.88:1883');
client.subscribe('msg/test');

// SQL Server配置
const sqlConfig = {
    server: 'localhost',
    database: '0530',
    options: {
        trustedConnection: true,
        domain: 'localhost',
        userName: 'OHANDSOMEO\a0970',
    },
};

client.on('message', (topic, message) => {
    console.log('收到訊息:', message.toString());

    // 数据处理
    const data = JSON.parse(message.toString());
    const temperature = data.temperature;
    const humidity = data.humidity;

    // 存储到Firebase Firestore
    const db = admin.firestore();
    const sensorDataRef = db.collection('sensorData');
    sensorDataRef.add({
        temperature,
        humidity,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
        console.log('Firebase Firestore 存儲成功:', docRef.id);
    })
    .catch((error) => {
        console.error('Firebase Firestore 存儲失敗:', error);
    });

    // 存储到SQL Server数据库
    sql.connect(sqlConfig, (err) => {
        if (err) {
            console.error('SQL Server 連接失敗:', err);
            return;
        }
        const request = new sql.Request();
        request.query(`INSERT INTO SensorData (Temperature, Humidity) VALUES (${temperature}, ${humidity})`, (err, result) => {
            if (err) {
                console.error('SQL Server 插入數據失敗:', err);
            } else {
                console.log('SQL Server 插入數據成功');
            }
        });
    });
});

app.listen(3000, () => {
    console.log('Port: 3000');
});
