import express from 'express';
import db from '../../models/index.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;

function registerProcess(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  const username = req.body.username;
  const domain = req.body.domain;
  const password = req.body.password;
  const passwordVerify = req.body.passwordVerify;
  const nickname = req.body.nickname;

  // 아이디, 비밀번호, 닉네임 모두 입력 받음
  if (username && domain && password && passwordVerify && nickname) {
    // username+domain 조건 만족하는지 체크
    // username 이 User table 에 있는지 체크 -> 중복체크 -> API가 있는데?
    // db 에 있으면 불가, 없으면 db 에 정보 저장하여 새 계정 생성
    db.User.findAll({
      where: { username: username, domain: domain }
    })
      .then(result => {
        if (result.length == 0) {
          // test@domain.com 사용가능 확인됨
          // 비밀번호 조건 (영문자, 숫자, 특수기호, 8이상 12이하) 만족하는지 체크
          // if password != passwordVerify -> fail to sign up, else -> ?
          // 비밀번호 암호화하여 저장?
          if (password === passwordVerify) {
            const re = /^[0-9a-zA-Z`~!@#$%^&*()-_=+?]{8,12}$/;
            if (re.test(password)) {
              const encryptedPW = bcrypt.hashSync(password, saltRounds);
              // nickname 조건 만족하는지 체크
              // nickname User table 에 있는지 체크 = 중복체크
              // 있으면 불가, 없으면 db 에 정보 저장하기
              db.User.findAll({
                where: { nickname: nickname }
              })
                .then(result => {
                  if (result.length == 0) {
                    // 중복 아님
                    console.log('사용가능 닉네임');
                    // db 에 저장 -> isAdmin 은 어떻게 정하지?
                    // auth_email -> 이메일 인증 시스템 만든 후 update
                    db.User.create({
                      isAdmin: false,
                      username: username,
                      domain: domain,
                      password: encryptedPW,
                      nickname: nickname,
                      auth_email: false // 마이페이지에서 인증?
                    });
                  } else {
                    // 이미 사용중
                    // 오류코드 전송
                    console.log('사용중인 닉네임');
                    res
                      .status(400)
                      .send(
                        "<script>alert('사용중인 닉네임'); history.go(-1)</script>"
                      );
                  }
                })
                .catch(function (err) {
                  console.log(err);
                });
            } else {
              // 오류코드 전송
              console.log('비밀번호를 다시 입력해주세요');
              res
                .status(400)
                .send(
                  "<script>alert('비밀번호 길이 오류 또는 문자 오류'); history.go(-1)</script>"
                );
            }
          } else {
            console.log('비밀번호 불일치');
            res
              .status(400)
              .send(
                "<script>alert('비밀번호 불일치'); history.go(-1)</script>"
              );
          }
        } else {
          // 오류코드 전송
          console.log('사용중인 이메일');
          res
            .status(400)
            .send("<script>alert('사용중인 이메일'); history.go(-1)</script>");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (username && domain && password && passwordVerify) {
    // 닉네임 입력하지 않음
    console.log('fill out your nickname');
    res.status(400).json({ message: 'Fill out your nickname' });
  } else {
    // 아이디 or 비밀번호 or 닉네임 입력하지 않음
    console.log("User didn't fill out the value(s)");
    res.status(400).json({ message: 'Fill out the blank' });
  }
}

export default {
  registerProcess
};
