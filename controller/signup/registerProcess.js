import models from '../../models/index.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const registerProcess = async (req, res, next) => {
  try {
    const { username, domain, password, passwordVerify, nickname } = req.body;

    if (!username || !domain || !password || !passwordVerify || !nickname) {
      // 입력값 누락
      return res.status(400).send('EMAIL_OR_PASSWORD_OR_NICKNAME_NOT_ENTERED');
    } else {
      const users = await models.User.findOne({
        where: { username: username, domain: domain }
      });
      const usersNickname = await models.User.findOne({
        // nickname 조건 만족하는지 체크
        where: { nickname: nickname }
      });

      if (users) {
        // 사용불가 이메일
        return res.status(400).send('EMAIL_ALREADY_EXISTS');
      } else if (password !== passwordVerify) {
        // 비밀번호 불일치
        return res.status(400).send('WRONG_PASSWORD');
      } else if (usersNickname) {
        // 사용불가 닉네임
        return res.status(400).send('NICKNAME_ALREADY_EXISTS');
      } else {
        const re = /^[0-9a-zA-Z`~!@#$%^&*()-_=+?]{8,12}$/;
        if (!re.test(password)) {
          // 비밀번호 조건 (영문자, 숫자, 특수기호, 8이상 12이하) 만족하는지 체크 - 비밀번호 유효성 검사 실패
          return res.status(400).send('INVALID_PASSWORD');
        } else {
          const encryptedPW = bcrypt.hashSync(password, saltRounds); // 비밀번호 암호화
          await models.User.create({
            // new db 생성
            isAdmin: false,
            username: username,
            domain: domain,
            password: encryptedPW,
            nickname: nickname,
            auth_email: false,
            useStatus: 1
          });
          return res.status(200).send('USER_CREATED');
        }
      }
    }
  } catch (err) {
    req.message = 'USER_CREATED';
    next(err);
  }
};

export default registerProcess;
