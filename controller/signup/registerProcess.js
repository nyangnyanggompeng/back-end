import express from 'express';
import db from "../../models/index.js";
import bcrypt from 'bcrypt';
const saltRounds = 10;

async function registerProcess (req, res) {
    const username = req.body.username;
    const domain = req.body.domain;
    const password = req.body.password;
    const passwordVerify = req.body.passwordVerify;
    const nickname = req.body.nickname;

    if (username && domain && password && passwordVerify && nickname) { // 아이디, 비밀번호, 닉네임 모두 입력 받음
        const users = await db.User.findAll({
            where: {username: username, domain: domain}
        });
        const usersNickname = await db.User.findAll({ // nickname 조건 만족하는지 체크
            where: {nickname: nickname}
        })

        if (users.length === 0) { // 사용가능 이메일
            if (password === passwordVerify) { // 비밀번호 조건 (영문자, 숫자, 특수기호, 8이상 12이하) 만족하는지 체크
                const re = /^[0-9a-zA-Z`~!@#$%^&*()-_=+?]{8,12}$/;
                if (re.test(password)) {
                    const encryptedPW = bcrypt.hashSync(password, saltRounds); // 비밀번호 암호화
                    if (usersNickname.length === 0) { // 사용가능 닉네임
                        await db.User.create({ // new db 생성
                            isAdmin: false,
                            username: username,
                            domain: domain,
                            password: encryptedPW,
                            nickname: nickname,
                            auth_email: false
                        });
                        return res.status(200).send("USER_CREATED");
                    } else { // 사용불가 닉네임
                        res.status(400).send("NICKNAME_ALREADY_EXISTS");
                    }
                } else { // 비밀번호 유효성 검사 실패
                    res.status(400).send("INVALID_PASSWORD");
                }
            } else { // 비밀번호 불일치
                res.status(400).send("WRONG_PASSWORD");
            }
        } else { // 사용불가 이메일
            res.status(400).send("EMAIL_ALREADY_EXISTS");
        }
    } else { // 입력값 누락
        res.status(400).send("EMAIL_OR_PASSWORD_OR_NICKNAME_NO_ENTERED");
    }
}

export default {
  registerProcess
};
