import express from 'express';
import db from "../../models/index.js";

async function idCheck (req, res) {
    const username = req.body.username;
    const domain = req.body.domain;

    if (username && domain) {
        const users = await db.User.findAll({
            where: {username: username, domain: domain}
        });

        if (users.length === 0) { // 사용가능 이메일
            res.status(200).send('사용가능한 이메일');
        } else { // 사용불가 이메일
            res.status(400).send('이미 사용중인 이메일');
        }
    } else {
        res.status(400).send("입력값 없음");
    }
    
}

export default {
    idCheck
}