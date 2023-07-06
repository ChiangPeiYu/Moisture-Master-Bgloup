// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYiv1Cm1BbyOdH7DF0SAhJMAd60vVnCEI", //識別Firebase的金鑰，驗證Firebase的存取權限。
    authDomain: "b-group2.firebaseapp.com", //Firebas的 身份驗證（authentication）域名（domain），處理使用者身份驗證。
    projectId: "b-group2", //識別Firebase的專案。
    storageBucket: "b-group2.appspot.com", //Firebase的儲存桶（storage bucket），儲存與檔案相關的資料，圖片、影片等。
    messagingSenderId: "962975740135", //Firebase的訊息發送識別碼（sender ID），處理通知（push notification）。
    appId: "1:962975740135:web:5db623dd383608c0e1b242", //Firebase的唯一識別碼（App ID）。
    measurementId: "G-168TQ879HC" //Firebase的測量識別碼（measurement ID），整合Firebase分析（analytics）。
};

firebase.initializeApp(firebaseConfig); //初始化firebase
const analytics = firebase.analytics(); //初始化Firebase Analytics(Firebase的分析服務，用於追蹤使用情況和統計數據)

const temperatureElement = document.getElementById("temperature"); //取得HTML名為"temperature"的id，用於顯示溫度的區域。
const humidityElement = document.getElementById("humidity"); //取得HTML名為"humidity"的id，用於顯示溫度的區域。
const dataCollection = firebase.firestore().collection("sensorData"); //firebase.firestore()指向Firestore的資料庫，使用collection("sensorData")方法來取得名為“sensorData”的資料。

dataCollection.onSnapshot((snapshot) => { //使用onSnapshot監聽dataCollection中的數據變化。有變化發生時，會觸發函式。
    snapshot.docChanges().forEach((change) => { //snapshot.docChanges()用於取得變化，取得後使用forEach()，根據變化執行相應的操作。
        const data = change.doc.data(); //從變化中取得資料
        const temperature = data.temperature; //從資料中取得溫度值
        const humidity = data.humidity; //從資料中取得濕度值

        temperatureElement.innerText = temperature + '°C'; //將溫度值設置為temperatureElement元素的內容，更新網頁上的溫度。
        humidityElement.innerText = humidity + '%'; //將濕度值設置為temperatureElement元素的內容，更新網頁上的濕度。
    });
});

/* // 創一個變數保存讀取數據
var unsubscribe = dataCollection.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        const temperature = data.temperature;
        const humidity = data.humidity;

        temperatureElement.innerText = temperature + '°C';
        humidityElement.innerText = humidity + '%';
    });
});

// 在使用者離開頁面時停止讀取
window.addEventListener('beforeunload', function() {
    unsubscribe(); // 呼叫 unsubscribe 函數停止讀取
}); */