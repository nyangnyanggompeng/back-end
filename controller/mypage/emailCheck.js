import models from '../../models/index.js';

import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const emailCheck = async (req, res, next) => {
  try {
    const { emailId } = req.body;

    if (!emailId) {
      return res.status(400).send('EMAIL_NOT_ENTERED');
    } else {
      const emailSplit = emailId.split('@');
      const username = emailSplit[0];
      const domain = emailSplit[1];

      const users = await models.User.findOne({
        where: { username: username, domain: domain }
      });

      if (!users) {
        // EMAIL DOESNT EXIST
        return res.status(400).send('EMAIL_DOESNT_EXIST');
      } else {
        // EMAIL EXISTS
        const emailToken = jwt.sign(
          {
            id: users.id,
            isAdmin: users.isAdmin,
            username: users.username,
            domain: users.domain,
            nickname: users.nickname,
            profile: users.profile
          },
          process.env.EMAIL_TOKEN_SECRET_KEY,
          { expiresIn: '5m' }
        );
        res.cookie('emailToken', emailToken, { httpOnly: true });

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 465,
          secure: true,
          auth: {
            //
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PW
          }
        });

        const authNumber = Math.floor(Math.random() * 888888) + 111111;
        const emailOptions = {
          from: process.env.GMAIL_ID,
          to: emailId,
          subject: '[인터뷰 연구소] 비밀번호 초기화 메일입니다.',
          text: `아래 인증번호를 확인하여 이메일 주소 인증을 완료해 주세요.\n
                        연락처 이메일 👉 ${emailId}\n
                        인증번호 6자리 👉 ${authNumber}`
        };
        transporter.sendMail(emailOptions);
        return res.status(200).send(`${authNumber}`);
      }
    }
  } catch (err) {
    req.message = 'EMAIL_CHECK';
    next(err);
  }
};

export default emailCheck;
