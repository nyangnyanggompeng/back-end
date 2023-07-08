import express from 'express';
import db from '../../models/index.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function updateInfo (req, res) {
    const id = req.params.id;
    const nicknameUpdate = req.body.nickname;

    if (req.decoded.id == id) { // 토큰 정보와 일치하는지 검증
        const users = await db.User.findAll({
            where: {id: id}
        });

        if (users.length === 0) { // user 찾지 못함
            res.status(400).send("NO_EXISTING_USER");
        } else { // user 찾음
            users[0].update({ nickname: nicknameUpdate });
            res.status(200).send("UPDATE_COMPLETED");
        }
    } else {
        res.status(400).send("INVALID_USER");
    }
}

export default {
    updateInfo
}