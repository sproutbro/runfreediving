import express from "express";
import http from "http";
import fs from "fs";
import { handler } from "./build/handler.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// SSL 인증서 파일 경로
// const options = {
//     key: fs.readFileSync(process.env.SSL_KEY_PATH),
//     cert: fs.readFileSync(process.env.SSL_CRT_PATH)
// };

// 모든 요청을 SvelteKit 핸들러로 라우팅
app.use(handler);

// HTTP 서버 시작
http.createServer(app).listen(3002, () => {
    console.log('Server is running on https://localhost:3002');
});
