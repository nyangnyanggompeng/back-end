import express from 'express';
import db from "../../models/index.js";

async function nicknameCheck (req, res) {
    const nickname = req.body.nickname;

    if (nickname) { // 닉네임 입력
        const users = await db.User.findAll({
            where: {nickname: nickname}
        });

        if (users.length === 0) { // 닉네임 사용가능
            res.status(200).send('사용가능한 닉네임');
        } else { // 닉네임 사용불가
            res.status(400).send('이미 사용중인 닉네임');
        }
    } else { // 닉네임 입력하지 않음
        res.status(400).send('입력값 없음');
    }
}

export default {
    nicknameCheck
}