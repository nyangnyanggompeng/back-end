import express from 'express';
import db from "../../models/index.js";

function passwordCheck (req, res) {
    const password = req.body.password;
    const passwordVerify = req.body.passwordVerify;

    if (password && passwordVerify) {
        if (password === passwordVerify) {
            const re = /^[0-9a-zA-Z`~!@#$%^&*()-_=+?]{8,12}$/;
            if (re.test(password)) {
                res.status(200).send({
                    "message": "",
                    "success": true
                })
            } else {
                res.status(400).send({
                    "message": "비밀번호 형식이 잘못 되었습니다. 영문자, 숫자, 특수문자 8-12자로 입력해주세요",
                    "success": false
                })
            }
        } else {
            res.status(400).send({
                "message": "비밀번호가 다릅니다.",
                "success": false
            })
        }
    } else {
        res.status(400).send({
            "message": "비밀번호가 입력되지 않았습니다.",
            "success": false
        })
    }
}

export default {
    passwordCheck
}