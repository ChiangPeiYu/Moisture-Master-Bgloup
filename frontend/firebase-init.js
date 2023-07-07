// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYiv1Cm1BbyOdH7DF0SAhJMAd60vVnCEI",
    authDomain: "b-group2.firebaseapp.com",
    projectId: "b-group2",
    storageBucket: "b-group2.appspot.com",
    messagingSenderId: "962975740135",
    appId: "1:962975740135:web:5db623dd383608c0e1b242",
    measurementId: "G-168TQ879HC"
};

firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();

const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const dataCollection = firebase.firestore().collection("sensorData");

dataCollection.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        const temperature = data.temperature;
        const humidity = data.humidity;

        temperatureElement.innerText = temperature + '°C';
        humidityElement.innerText = humidity + '%';
    });
});