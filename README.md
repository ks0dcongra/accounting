# 老爸的私房錢
讓老爸新增、修改與刪除「支出紀錄」。

### 操作流程
1.從github複製本專案

```
git clone https://github.com/ks0dcongra/expense-tracker.git
```

2.進入專案資料夾

```
cd expense-tracker
```

3.下載本專案需要用到的套件
```
npm install
```

4.開啟程式
```
npm run start 
```

5.根據.envexample的說明把FACEBOOK_ID && FACEBOOK_SECRET 用字串的方式填入passport.js
```
同標題
```

6.打開瀏覽器網址列輸入 http://localhost:3000/
```
CMD顯示 `Express is running on http://localhost:3000` 即啟動完成
```

## 主要功能列表
### 使用者 (老爸) 可以：

1. 註冊帳號
  - 註冊之後，可以登入/登出
  - 只有登入狀態的使用者可以看到 app 內容，否則一律被導向登入頁
2. 在首頁一次瀏覽所有支出的清單
3. 使用者只能看到自己建立的資料
4. 在首頁看到所有支出清單的總金額
5. 新增一筆支出 (資料屬性參見下方規格說明)
6. 編輯支出的屬性 (一次只能編輯一筆)
7. 刪除任何一筆支出 (一次只能刪除一筆)
8. 根據「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和

## 系統截圖
![首頁](https://github.com/ks0dcongra/expense-tracker/blob/master/public/img/record.jpg)

## Acknowledgments
* AlphaCamp

