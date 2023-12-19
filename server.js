// expressを呼び出す
const express = require("express");
// appにexpressを代入し、インスタンスを作成する
const app = express();
const userRouter = require("./routes/user");
// PORTを指定する
const PORT = 3000;

// ルーティングを設定する
app.use("/user", userRouter);
// app.use("/auth", authRouter);
// app.use("/customer", customerRouter);
// app.use("/products", productsRouter);

// expressを使ってサーバーを立てる
app.listen(PORT, () => console.log("サーバーが起動しました"));
