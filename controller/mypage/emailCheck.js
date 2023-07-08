import express from 'express';
import db from '../../models/index.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';

async function emailCheck (req, res) {
    const emailId = req.body.emailId;

    if (emailId) {
        const emailSplit = emailId.split("@");
        const username = emailSplit[0];
        const domain = emailSplit[1];

        const users = await db.User.findAll({
            where: {username: username, domain: domain}
        });

        if (users.length === 0) { // EMAIL DOESNT EXIST
            res.status(400).send("BAD_REQUEST");
        } else { // EMAIL EXISTS
            const emailToken = jwt.sign({
                id: users[0].id, 
                isAdmin: users[0].isAdmin,
                username: users[0].username,
                domain: users[0].domain,
                nickname: users[0].nickname
            }, 
                process.env.EMAIL_TOKEN_SECRET_KEY, {expiresIn: '5m'});
            res.cookie('emailToken', emailToken, {httpOnly: true});

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true,
                auth: { // 
                    user: process.env.GMAIL_ID,
                    pass: process.env.GMAIL_PW
                }
            })

            const authNumber = Math.floor(Math.random() * 888888) + 111111;
            const emailOptions = {
                from: process.env.GMAIL_ID,
                to: emailId,
                subject: "[인터뷰 연구소] 비밀번호 초기화 메일입니다.",
                text: `아래 인증번호를 확인하여 이메일 주소 인증을 완료해 주세요.\n
                        연락처 이메일 👉 ${emailId}\n
                        인증번호 6자리 👉 ${authNumber}`
            };
            transporter.sendMail(emailOptions);
            return res.status(200).send(`${authNumber}`);
        }
    } else {
        res.status(400).send("BAD_REQUEST");
    }
}

export default {
    emailCheck
}