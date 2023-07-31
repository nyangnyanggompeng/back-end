import nodemailer from 'nodemailer';
import crypto from 'crypto';

const sendEmail = async (req, res, next) => {
  try {
    const { username, domain } = req.body;

    if (!username || !domain) {
      return res.status(400).send('EMAIL_NOT_ENTERED');
    } else {
      const emailId = username + '@' + domain;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.GMAIL_PW
        }
      });

      const authNumber = Math.floor(Math.random() * 888888) + 111111;
      const emailOptions = {
        from: process.env.GMAIL_ID,
        to: emailId,
        subject: '[인터뷰 연구소] 이메일 인증 번호입니다.',
        text: `아래 인증번호를 확인하여 이메일 주소 인증을 완료해 주세요.\n
                              연락처 이메일 👉 ${emailId}\n
                              인증번호 6자리 👉 ${authNumber}`
      };
      await transporter.sendMail(emailOptions);

      const shasum = crypto.createHash('sha256');
      shasum.update(String(authNumber));
      const output = shasum.digest('hex');
      res.cookie('authNumber', output, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 3000000 // 5분
      });
      res.cookie('username', username, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 3000000 // 5분
      });
      res.cookie('domain', domain, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 3000000 // 5분
      });
      return res.status(200).send('SEND_EMAIL_SUCCESS');
    }
  } catch (err) {
    req.message = 'SEND_EMAIL';
    next(err);
  }
};

export default sendEmail;
