import models from '../models/index.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function auth(req, res, next) {
    if (!req.cookies || !req.cookies.accessToken) {
        return res.status(401).send("NO_TOKEN");
    }

    try { // 인증 성공
        //console.log(req.cookies);
        //console.log(req.cookies.accessToken);
        req.decoded = jwt.verify(req.cookies.accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
        return next();
    } catch (err) { // 인증 실패
        if (err.name === 'TokenExpiredError') { // 유효시간 초과된 경우
            return res.status(419).send("TOKEN_EXPIRED");
        } else if (err.name === 'JsonWebTokenError') { // 토큰 비밀키 일치하지 않는 경우
            return res.status(401).send("INVALID_TOKEN");
        }
        return next(err);
    }
}
