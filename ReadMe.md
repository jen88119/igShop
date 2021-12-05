# Search for IG post

這是一個讓使用者可以自動儲存並搜尋IG貼文的瀏覽器擴充元件。

## Inroduction

* 透過chrome extension讓使用者可以選擇自己要蒐集的帳號(僅限自己有觀看權限的帳號)貼文
* 將選擇的帳號中所有的貼文匯入MongoDB
* 定時查看是否有新貼文。
* 在newTab中提供搜尋介面，讓使用者搜尋自己蒐集的貼文

## Architecture

* Chrome Extension
  * 提供介面搜尋貼文、新增/刪除/查看目標帳號
* Python FastAPI Web Server
  * 將Chrome Extension爬取到的貼文資料透過Web Server將資料送至DB
  * 透過Web Server將DB中的帳號/貼文資料傳回前端介面顯示

## User Interface

<img src="/Users/zihuanxu/Desktop/截圖 2021-11-07 下午1.34.06.png" alt="截圖 2021-11-07 下午1.34.06" style="zoom: 50%;" />

<img src="/Users/zihuanxu/Desktop/截圖 2021-11-07 下午1.40.32.png" alt="截圖 2021-11-07 下午1.40.32" style="zoom:25%;" />

