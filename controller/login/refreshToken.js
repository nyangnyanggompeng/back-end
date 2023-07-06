import express from 'express';
import db from '../../models/index.js';
import jwt from 'jsonwebtoken';

function refreshToken (req, res) {
    if (req.headers.cookie) { // ?. 뒤에 오는 키 값이 있으면 먼저 확인하고 값 반환
        const refreshToken = req.headers.cookie.split("; ")[1].split("=")[1];
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) { // 에러 있으면 -> refresh token 썩었으므로 다시 로그인 시킴
                res.status(400).send("ROTTEN_TOKEN");
            } else { // 정상적인 토큰 -> 다시 access token 발급
                const accessToken = jwt.sign({id: decoded.id}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '60m'});
                res.status(200).send(accessToken);
            }
        })
    } else {
        res.status(400).send("INVALID_TOKEN");
    }
}

export default {
    refreshToken
}