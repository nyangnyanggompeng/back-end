import express from 'express';
import db from "../../models/index.js";

function passwordCheck (req, res) {
    const password = req.body.password;
    const passwordVerify = req.body.passwordVerify;

    if (password && passwordVerify) {
        if (password === passwordVerify) {
            const re = /^[0-9a-zA-Z`~!@#$%^&*()-_=+?]{8,12}$/;
            if (re.test(password)) { // success
                res.status(200).send("VAILD_PASSWORD");
            } else { // 비밀번호 형식이 잘못 되었습니다. 영문자, 숫자, 특수문자 8-12자로 입력해주세요
                res.status(400).send("INVALID_FORM");
            }
        } else { // 비밀번호 다름
            res.status(400).send("PASSWORDS_NOT_MATCH")
        }
    } else { // 필수 값 누락
        res.status(400).send("PASSWORDS_NOT_ENTERED")
    }
}

export default {
    passwordCheck
}