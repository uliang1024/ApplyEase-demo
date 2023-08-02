import express from 'express';
import 'dotenv/config';

const HTTP_PORT = process.env.HTTP_PORT || 8080;
const HTTPS_PORT = process.env.HTTPS_PORT || 8080;
const app = express();

// static folder
app.use('/', express.static('public'));

// body parser
import bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// view engine
import nunjucks from 'nunjucks';
nunjucks.configure('views', {
    autoescape: true,
    cache: false,
    express: app
})

app.set('views', './views');
app.set('view engine', 'njk');
app.engine('njk', nunjucks.render);

// router
import index from "./routes/index.js";
import cardApply from "./routes/card-apply.js";
import getChatGPT from "./routes/getChatGPT.js";

app.use(index);
app.use(cardApply);
app.use(getChatGPT);

// error handler
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);

    // handle CSRF token errors here
    res.status(403);
    res.send('form tampered with');
});

// listen
import http from 'http';
import fs from 'fs';
import path from 'path';
import https from 'https';

if (process.env.DEBUG?.toLowerCase() === 'true') {
    // 使用 HTTP 伺服器啟動
    const httpServer = http.createServer(app);
    httpServer.listen(HTTP_PORT, () => {console.log(`> Listening on port ${HTTP_PORT}`)});
}
else {
    // 使用 HTTPS 伺服器啟動
    const options = {
        key:  fs.readFileSync( path.join(process.env.CERT_DIR_PATH || 'certs', 'private.key') , 'utf-8'),
        cert: fs.readFileSync( path.join(process.env.CERT_DIR_PATH || 'certs', 'certificate.crt') , 'utf-8'),
        ca:   fs.readFileSync( path.join(process.env.CERT_DIR_PATH || 'certs', 'ca_bundle.crt') , 'utf-8'),
    };
    const httpsServer = https.createServer(options, app);
    httpsServer.listen(HTTPS_PORT, () => {console.log(`> Listening on port ${HTTPS_PORT}`)});
    
    // 將 HTTP 請求轉發至 HTTPS 伺服器
    http.createServer((req, res) => {
        res.writeHead(302, { "Location": "https://" + req.headers.host + req.url });
        res.end();
    }).listen(HTTP_PORT, () => {console.log(`> Listening on port ${HTTP_PORT}`)});
}