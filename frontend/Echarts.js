// 創建ECharts圖表
var chart = echarts.init(document.getElementById('chart-container'));

// 定義圖表配置選項
var option = {
    grid: { // 
        containLabel: true,
        left: '5%',
        right: '5%',
        top: '10%',
        bottom: '10%',
    },
    title: { //標題
        text: '溫濕度歷史變化統計圖表'
    },
    legend: { //圖表數據title
        top: 'auto',
        bottom: 0,
        data: ['溫度', '濕度']
    },
    xAxis: { //x軸
        type: 'category', //表示 X 軸以類別方式呈現 (因為這些數據樣本不是連續的數字或時間序列，而是具有特定的類別標籤。)
        data: [] // 根據實際數據填入對應的 x 軸數據
    },
    yAxis: [{ //y軸
            type: 'value', //表示 y 軸左邊以數值方式呈現
            name: '溫度',
            position: 'left', //顯示位置
            axisLabel: { //axisLabel.formatter設定刻度數值的格式化方式
                formatter: '{value}°C'
            }
        },
        {
            type: 'value', //表示 y 軸右邊以數值方式呈現
            name: '百分比',
            position: 'right', //顯示位置
            axisLabel: { //axisLabel.formatter設定刻度數值的格式化方式
                formatter: '{value}%'
            }
        }
    ],
    series: [{ //數據設定
            name: '溫度',
            type: 'line',
            data: [], // 根據實際數據填入對應的溫度數據
            yAxisIndex: 0
        },
        {
            name: '濕度',
            type: 'bar',
            data: [], // 根據實際數據填入對應的濕度數據
            yAxisIndex: 1
        }
    ]
};

// 將上面設定應用於圖表顯示
chart.setOption(option);

// 監聽firebase數據變化
firebase.firestore().collection('sensorData').orderBy('timestamp', 'desc') // 根據讀取時間升續排列
    .limit(20) // 限制取得筆數
    .onSnapshot(function(querySnapshot) { //監聽 Firestore 中 "sensorData" 的變化
        //創建兩個空的，負責存溫度和濕度
        var temperatureData = [];
        var humidityData = [];

        querySnapshot.forEach(function(doc) {
            var data = doc.data();
            var temperature = data.temperature;
            var humidity = data.humidity;

            temperatureData.push(temperature);
            humidityData.push(humidity);
        });

        // 更新圖表資料
        chart.setOption({
            grid: { // 
                containLabel: true,
                left: '5%',
                right: '5%',
                top: '15%',
                bottom: '10%',
            },
            legend: { //圖表數據title
                top: 'auto',
                bottom: 0,
                data: ['溫度', '濕度']
            },
            xAxis: {
                data: temperatureData // 顯示溫度
            },
            series: [{
                    name: '溫度',
                    data: temperatureData, // 更新溫度
                    type: 'line'
                },
                {
                    name: '濕度',
                    data: humidityData, // 更新濕度
                    type: 'bar'
                }
            ]
        });
    });

// 畫面大小變化更新圖表
window.addEventListener('resize', function() {
    chart.resize();
});

/* // 創建一個變數來保存監聽器
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