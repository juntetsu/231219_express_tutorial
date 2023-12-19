// expressを呼び出す
const express = require("express");
// appにexpressを代入し、インスタンスを作成する
const app = express();
// PORTを指定する
const PORT = 3000;

// 第1引数にエンドポイント、第2引数にコールバック関数を指定する
app.get("/", (req, res) => {
  // console.log("Hello Express!");
  // res.sendでレスポンスを返す
  // res.send("こんにちは、Express!");
  // res.sendStatus(500)
  // res.sendStatus(404)
  // res.status(404).send("ページが見つかりません")
  res.status(404).json({ message: "ページが見つかりません" });
});

app.get("/user", (req, res) => {
  res.send("ユーザーです")
})
app.get("/user/info", (req, res) => {
  res.send("ユーザー情報です")
})


// expressを使ってサーバーを立てる
app.listen(PORT, () => console.log("サーバーが起動しました"));
