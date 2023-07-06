import express from 'express';
import db from '../../models/index.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

async function login (req, res) {
    console.log(req.body);
    const username = req.body.username;
    const domain = req.body.domain;
    const password = req.body.password;

    if (username && domain && password) {
        // EMAIL CHECK
        const users = await db.User.findAll({
            where: {username: username, domain: domain}
        });

        if (users.length === 0) { // EMAIL DOESN'T EXISTS
            res.status(400).send('EMAIL_DOESNT_EXISTS');
        } else { // EMAIL EXIST
            let check = await bcrypt.compare(password, users[0].password);
            if (!check) { // PASSWORD CHECK FALSE (LOGIN FAILURE)
                res.status(400).send('LOGIN_FAILURE');
            } else { // PASSWORD CHECK TRUE (LOGIN SUCCESS)ㄷ
                const accessToken = jwt.sign({
                    id: users[0].id, 
                    isAdmin: users[0].isAdmin,
                    username: users[0].username,
                    domain: users[0].domain}, 
                    process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '60m'});
                const refreshToken = jwt.sign({
                    id: users[0].id, 
                    isAdmin: users[0].isAdmin}, 
                    process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: '1d'});
                res.cookie('accessToken', accessToken, {httpOnly: true, secure: true, sameSite: "None"});
                res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true, sameSite: "None"});
                res.status(200).send('LOGIN_SUCCESS');
            }
        }
    } else {
        res.status(400).send('EMAIL_OR_PASSWORD_NOT_ENTERED');
    }
}

export default {
    login
}
