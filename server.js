import express from "express";
import https from "http";
import { handler } from "./build/handler.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// 모든 요청을 SvelteKit 핸들러로 라우팅
app.use(handler);

// HTTP 서버 시작
https.createServer(app).listen(3002, () => {
    console.log('Server is running on https://localhost:3002');
});
