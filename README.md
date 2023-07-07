# Moisture-Master-Bgloup
# monosparta B組溫溼度感測器
# 溫濕度監控系統 README

這個專案是一個溫濕度監控系統，我們使用以下方式來開發和實現：

## 技術選擇

- 硬體：我們使用樹莓派（Raspberry Pi）和溫濕度感測器來收集溫濕度數據。

- 通訊協定：我們使用 MQTT（Message Queuing Telemetry Transport）作為通訊協定，透過 MQTT 將溫濕度數據從樹莓派傳送到後端 API。

- 後端開發：我們使用 Node.js 作為後端開發語言，使用 Express.js 框架來建立後端 API。

- 雲端連接：我們使用 Firebase 作為雲端平台，通過 Firebase 提供的服務將樹莓派的溫濕度數據連接到前端應用程式。

- 前端開發：我們使用 HTML、CSS 和 JavaScript 開發網頁前端，使用 Firebase JavaScript SDK 來連接 Firebase 後端並即時顯示溫濕度數據。

- 圖表繪製：我們使用有趣的折現圖表庫來繪製溫濕度的歷史變化圖表。

## 步驟

1. 準備硬體：確保您擁有樹莓派和兼容的溫濕度感測器。

2. 連接感測器：按照感測器的連接指南，將溫濕度感測器連接到樹莓派。

3. 安裝所需軟體：在樹莓派上安裝相應的軟體，包括 MQTT 客戶端和相關的 Node.js 庫。

4. 後端開發：使用 Node.js 和 Express.js 框架，開發後端 API 來接收並處理樹莓派傳送的溫濕度數據。

5. MQTT 連接：在樹莓派上建立 MQTT 連接，將溫濕度數據通過 MQTT 協定傳送到後端 API。

6. 雲端連接：使用 Firebase 的 JavaScript SDK，在後端 API 中將溫濕度數據傳送到 Firebase。

7. 前端開發：使用 HTML、CSS 和 JavaScript，開發網頁前端來連接 Firebase，並即時顯示溫

濕度數據。

8. 圖表繪製：使用圖表庫，在前端應用程式中繪製溫濕度的歷史變化圖表。

## 網頁連結
https://testdht-4odhv9vnp1gz.vercel.app/

## 參考資源

以下是一些相關資源，可供您深入研究和學習使用的技術和工具：

- [樹莓派官方網站](https://www.raspberrypi.org/)
- [MQTT 官方網站](http://mqtt.org/)
- [Node.js 官方網站](https://nodejs.org/)
- [Express.js 文件](https://expressjs.com/)
- [Firebase 文件](https://firebase.google.com/docs)
- [Chart.js 官方網站](https://www.chartjs.org/)

