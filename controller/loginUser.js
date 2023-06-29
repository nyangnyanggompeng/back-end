import express from 'express';
import db from '../models/index.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

async function login (req, res) {
    const username = req.body.username;
    const domain = req.body.domain;
    const password = req.body.password;

    if (username && domain && password) {
        // EMAIL CHECK
        const users = await db.User.findAll({
            where: {username: username, domain: domain}
        });

        if (users === null) { // EMAIL DOESN'T EXISTS
            res.status(400).send('입력한 이메일 존재하지 않음');
        } else { // EMAIL EXIST
            let check = await bcrypt.compare(password, users[0].password);
            if (!check) { // PASSWORD CHECK FALSE (LOGIN FAILURE)
                res.status(400).send('비밀번호 틀림');
            } else { // PASSWORD CHECK TRUE (LOGIN SUCCESS)
                const accessToken = jwt.sign({id: users[0].id, isAdmin: users[0].isAdmin}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '60m'});
                res.cookie('accessToken', accessToken, {httpOnly: true});
                res.status(200).send('토큰 전송 완료');
            }
        }
    } else {
        res.status(400).send('이메일 혹은 비밀번호가 입력되지 않음');
    }
}

export default {
    login
}
