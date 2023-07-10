import models from '../../models/index.js';

const nicknameCheck = async (req, res, next) => {
  try {
    const { nickname } = req.body;

    if (!nickname) {
      // 닉네임 입력하지 않음
      return res.status(400).send('NICKNAME_NOT_ENTERED');
    } else {
      // 닉네임 입력
      const users = await models.User.findOne({
        where: { nickname: nickname }
      });

      if (!users) {
        // 닉네임 사용가능
        return res.status(200).send('AVAILABLE_NICKNAME');
      } else {
        // 닉네임 사용불가
        return res.status(400).send('NICKNAME_ALREADY_EXISTS');
      }
    }
  } catch (err) {
    req.message = 'NICKNAME_CHECK';
    next(err);
  }
};

export default nicknameCheck;
