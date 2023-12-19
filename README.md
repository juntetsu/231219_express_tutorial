- [Express（node.js）の基礎](#expressnodejsの基礎)
  - [Express の開発環境の構築](#express-の開発環境の構築)
  - [Express の導入](#express-の導入)
  - [getメソッドを使ってみる](#getメソッドを使ってみる)
    - [ブラウザ上に文字を出力させる](#ブラウザ上に文字を出力させる)
    - [サーバーステータスを表示させる](#サーバーステータスを表示させる)
  - [エンドポイントを変更してみる（ルート）](#エンドポイントを変更してみるルート)
  - [routesフォルダでユーザー情報を管理する](#routesフォルダでユーザー情報を管理する)

# Express（node.js）の基礎

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

## getメソッドを使ってみる

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
## routesフォルダでユーザー情報を管理する