- [Express（node.js）の基礎](#expressnodejsの基礎)
  - [Express の開発環境の構築](#express-の開発環境の構築)
  - [Express の導入](#express-の導入)
  - [get メソッドを使ってみる](#get-メソッドを使ってみる)
    - [ブラウザ上に文字を出力させる](#ブラウザ上に文字を出力させる)
    - [サーバーステータスを表示させる](#サーバーステータスを表示させる)
  - [エンドポイントを変更してみる（ルート）](#エンドポイントを変更してみるルート)
  - [routes フォルダでユーザー情報を管理する](#routes-フォルダでユーザー情報を管理する)
    - [1. router/user.js 作成](#1-routeruserjs-作成)
    - [2. server.js に記述　　](#2-serverjs-に記述)
    - [3. ルーティング](#3-ルーティング)
  - [動的なルーティング](#動的なルーティング)
  - [静的ファイル（HTML） をレンダリングしてみる](#静的ファイルhtml-をレンダリングしてみる)
  - [動的なファイルを読み込ませる](#動的なファイルを読み込ませる)

# Express（node.js）の基礎

Express は NodeJS でサーバーサイド（バックエンド）アプリケーションを開発する際に用いるフレームワーク。  
GET/POST 通信などを簡単な記述で実現できる。

## Express の開発環境の構築

1. `npm init -y`で package.json 作成
2. `npm i express nodemon`で`express`と`nodemon`をインストール
   > nodemon とはコード変更を監視し、node.js アプリを再起動するツール  
   > シンプルに監視対象のファイルを指定するだけで対応可能
3. server.js を作成

```javascript
console.log("Hello node.js!");
```

4. package.json 編集

```diff
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+   "dev": "nodemon server.js"
  },
}
```

5. `npm run dev`でコンソールに"Hello node.js!"と出れば準備完了

## Express の導入

server.js

```javascript
// expressを呼び出す
const express = require("express");
// appにexpressを代入し、インスタンスを作成する
const app = express();
// PORTを指定する
const PORT = 3000;

// expressを使ってサーバーを立てる
app.listen(PORT, () => console.log("サーバーが起動しました"));
```

```
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
サーバーが起動しました
```

これで、ローカルホスト 3000 でローカルサーバーを立ち上げることができた。  
Express を使ったローカルサーバー開発環境構築の第一歩が完了。

## get メソッドを使ってみる

（POST や PUT, DELETE などは、フォームを設置するか Postman を使うことで使用可能）

server.js

```javascript
// 第1引数にエンドポイント、第2引数にコールバック関数を指定する
app.get("/", (req, res) => {
  console.log("Hello Express!");
});
```

localhost:3000 にアクセスすると、`Hello Express!`

上記の流れを解説すると、

1. クライアントからサーバーに get()でリクエストを送る。
2. node.js のサーバーからレスポンスが返ってきて、console に出力される。

### ブラウザ上に文字を出力させる

```javascript
app.get("/", (req, res) => {
  console.log("Hello Express!");
  // res.sendでレスポンスを返す
  res.send("こんにちは、Express!");
});
```

ブラウザ上で”こんにちは、Express!”と表示される。

### サーバーステータスを表示させる

```javascript
app.get("/", (req, res) => {
  res.sendStatus(500);
});
```

とすると、ブラウザには

```
Internal Server Error
```

と表示される。  
他にも、

```javascript
app.get("/", (req, res) => {
  res.sendStatus(404);
});
```

```
Not Found
```

---

```javascript
app.get("/", (req, res) => {
  res.status(404).send("ページが見つかりません");
});
```

```
ページが見つかりません
```

---

```javascript
app.get("/", (req, res) => {
  res.status(404).json({ message: "ページが見つかりません" });
});
```

```
{"message":"ページが見つかりません"}
```

（json 形式は DB とやりとりする時によく使う）

## エンドポイントを変更してみる（ルート）

server.json

```javascript
app.get("/user", (req, res) => {
  res.send("ユーザーです");
});
```

`http://localhost:3000/user`にアクセスすると

```
ユーザーです
```

と表示される。  
さらに、

```javascript
app.get("/user", (req, res) => {
  res.send("ユーザーです");
});
```

`http://localhost:3000/user/info`にアクセスすると

```
ユーザー情報です
```

しかし、これだとユーザーが増えた時にその分`user〇〇`と記述する必要があり非常に煩雑

## routes フォルダでユーザー情報を管理する

### 1. router/user.js 作成

server.js で記述した get メソッドを、user.js にコピペ  
 `app`を`router`に変更し、エンドポイントも変更

routes/user.js

```diff
const express = require("express");
- const app = express();
+ const router = express.Router();

- app.get("/user", (req, res) => {
+ router.get("/", (req, res) => {
   res.send("ユーザーです");
 });
- app.get("/user/info", (req, res) => {
+ router.get("/info", (req, res) => {
   res.send("ユーザー情報です");
 });

// routerをモジュールとして扱う準備
+ module.exports = router;
```

### 2. server.js に記述　　

server.js

```diff
const express = require("express");
const app = express();
+ const userRouter = require("./routes/user");
const PORT = 3000;

// expressを使ってサーバーを立てる
app.listen(PORT, () => console.log("サーバーが起動しました"));
```

つまり、この`userRouter`は routes/user.js で`module.exports`した`router`

### 3. ルーティング

server.js

```diff
const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const PORT = 3000;

+ // ルーティングを設定する
+ app.use("/user", userRouter);

app.listen(PORT, () => console.log("サーバーが起動しました"));
```

`app.use`を使うことによって、「`/user`は共通で使うとして、以降のエンドポイント設定は`userRouter`に任せるよー」  
実際に`http://localhost:3000/user（/info）`にアクセスすると問題なく表示される。  
以降、ルーティングが増えていっても、

```javascript
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/customer", customerRouter);
app.use("/products", productsRouter);
```

とすれば管理がしやすい。

## 動的なルーティング

これまでは固有のエンドポイントだったが、ユーザーには"user001"もいれば"user123"もいる。  
こういったランダムな文字列をエンドポイントに設定する場合。  
`:id`とすることで引数みたいに扱える。

user.js

```javascript
router.get("/:id", (req, res) => {
  res.send(`${req.params.id}のユーザー情報を取得しました`);
});
```

試しに`http://localhost:3000/user/123`にアクセスすると、  
`123のユーザー情報を取得しました`と表示される。

## 静的ファイル（HTML） をレンダリングしてみる

これまでは`res.send()`で文字列のみ表示させていたが、HTML をレンダリングしてみる。

1. `public`ディレクトリに index.html と style.css 用意

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Hello Express!</h1>
  </body>
</html>
```

```css
body {
  background-color: beige;
  color: cadetblue;
}
```

2. server.js で読み込む

```javascript
// publicディレクトリから静的ファイルを読み込む
app.use(express.static("public"));
```

3. ローカルホストにアクセスし、HTML,CSS が当たっていることを確認

## 動的なファイルを読み込ませる

Express のテンプレートエンジンを利用することで、DB を読み込ませたり、動的なファイルを使うことができる。

1. テンプレートエンジンのインストール（EJS）  
   `npm i ejs`

---

2. server.js で、テンプレートエンジンを設定
   server.js

```javascript
// テンプレートエンジンをEJSに設定する
app.set("view engine", "ejs");
```

テンプレートエンジンとは、DB で用意されたデータをテンプレートファイルで読み込ませて、HTML で表示させるもの　　
Express のテンプレートエンジンには EJS の他にも Pug とか Mustache がある

---

3. views ディレクトリに`index.ejs`作成

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
```

---

4. 3 で作成した views/index.ejs を読み込ませる  
   読み込みには`res.render()`関数を用いる

server.js

```javascript
app.get("/", (req, res) => {
  res.render("index", { title: "Node.jsとExpress!" });
});
```

(本来ならば{}の中は DB から取得。今回はハードコーディング)

localhost:3000 にアクセスすると、`views/index.ejs`の"Hello"だけが表示されている。

これからやりたいことは `res.render()` 内で記述した`{}`の内容を、`index.ejs` に渡して `Hello Node.js と Express!` と表示させたい。

---

5. index.ejs に渡して出力

テンプレートエンジンを使用するには`<%= %>`と記述する。

index.ejs

```html
<h1>Hello <%= title %></h1>
```

localhost:3000にアクセスすると、`Hello Node.jsとExpress!`と表示される。
***

6. （おまけ）  
毎回<%= %>と記述するのはめんどいので、"ejs language supportプラグイン利用すると楽。