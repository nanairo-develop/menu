
/**
 * app.js
 */
// express モジュールのインスタンス作成
const express = require('express');
const app = express();
// パス指定用モジュール
const path = require('path');
const fs = require('fs').promises;

const ejs = require('ejs');

app.engine('ejs', ejs.renderFile);

app.set("view engine", "ejs");
console.log(1);
app.set("views", "./public/views");
console.log(2);

app.use(express.urlencoded({ extended: false }));
// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, 'public')));

const jsonFile = 'public/json/menuList.json';
const encodeSetting = { encoding: 'utf8' };

app.get("/", (req, res, next) => {
    // カレントディレクトリのjson/menuList.jsonを読み込む
    fs.readFile(jsonFile, encodeSetting, (err) => { console.error(err) }).then(file => {
        var jsonData = JSON.parse(file);
        console.log(jsonData[0].kind);
        //res.render("index", { menuList: jsonData });
        res.render("index", { menuList: '<h1>test</h1>' });
    }).catch(err => {
        console.error(err.message);
        // 終了ステータス 1（一般的なエラー）としてプロセスを終了する
        process.exit(1);
    });
});

console.log('2');

// 8080番ポートで待ち受ける
app.listen(8080, () => {
    console.log('Running at Port 8080...');
});

console.log('3');

// /hoge/fugaへのGETリクエストを受け取りたい場合
app.get('/hoge/fuga', (req, res, next) => {
    console.log(5);
    res.send('ほげふが');
});

console.log('4');

// サイトルートへのPOSTリクエストの場合
app.post('/', (req, res, next) => {
    res.send('ルートだよ！全員集合！');
});

// /hoge/fugaへのPOSTリクエストを受け取りたい場合
app.post('/hoge/fuga', (req, res, next) => {
    res.send('ほげふが');
});

// その他のリクエストに対する404エラー
app.use((req, res) => {
    res.sendStatus(404)
});