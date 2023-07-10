const passwordCheck = async (req, res, next) => {
  try {
    const { password, passwordVerify } = req.body;

    if (!password || !passwordVerify) {
      // 필수 값 누락
      return res.status(400).send('PASSWORD_OR_PASSWORD_VERIFY_NOT_ENTERED');
    } else if (password !== passwordVerify) {
      // 비밀번호 다름
      return res.status(400).send('PASSWORD_NOT_MATCH');
    } else {
      const re = /^[0-9a-zA-Z`~!@#$%^&*()-_=+?]{8,12}$/;
      if (re.test(password)) {
        // success
        return res.status(200).send('VAILD_PASSWORD');
      } else {
        // 비밀번호 형식이 잘못 되었습니다. 영문자, 숫자, 특수문자 8-12자로 입력해주세요
        return res.status(400).send('INVALID_FORM');
      }
    }
  } catch (err) {
    req.message = 'PASSWORD_CHECK';
    next(err);
  }
};

export default passwordCheck;
