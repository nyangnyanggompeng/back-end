import express from 'express';
import db from "../../models/index.js";

async function nicknameCheck (req, res) {
    const nickname = req.body.nickname;

    if (nickname) { // 닉네임 입력
        const users = await db.User.findAll({
            where: {nickname: nickname}
        });

        if (users.length === 0) { // 닉네임 사용가능
            res.status(200).send('AVAILABLE_NICKNAME');
        } else { // 닉네임 사용불가
            res.status(400).send('NICKNAME_ALREADY_EXISTS');
        }
    } else { // 닉네임 입력하지 않음
        res.status(400).send('NICKNAME_NO_ENTERED');
    }
}

export default {
    nicknameCheck
}