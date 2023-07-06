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
            res.status(200).send('AVAILABLE_EMAIL');
        } else { // 사용불가 이메일
            res.status(400).send('EMAIL_ALREADY_EXISTS');
        }
    } else {
        res.status(400).send("EMAIL_NO_ENTERED");
    }
    
}

export default {
    idCheck
}