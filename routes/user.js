const express = require("express");
const router = express.Router();

// router.use(mylogger)

router.get("/", mylogger, (req, res) => {
  res.send("ユーザーです");
});
router.get("/info", (req, res) => {
  res.send("ユーザー情報です");
});

router.get("/:id", (req, res) => {
  res.send(`${req.params.id}のユーザー情報を取得しました`)
})

//　ミドルウェア
function mylogger(req, res, next) {
  // アクセスされたパス名を出力する
  console.log(req.originalUrl);

  // 次のミドルウェアに処理を渡す記述
  next();
}

// routerをモジュールとして扱う準備
module.exports = router;