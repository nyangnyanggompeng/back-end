import models from '../../models/index.js';

const updateInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { nickname } = req.body;

    if (!nickname) {
      return res.status(400).send('NICKNAME_NOT_ENTERED');
    }

    if (req.decoded.id !== id) {
      // 토큰 정보와 일치하는지 검증
      return res.status(400).send('INVALID_USER');
    } else {
      const users = await models.User.findOne({
        where: { id: id }
      });

      if (!users) {
        // user 찾지 못함
        return res.status(400).send('NO_EXISTING_USER');
      } else {
        // user 찾음
        users.update({ nickname: nickname });
        return res.status(200).send('UPDATE_INFO_SUCCESS');
      }
    }
  } catch (err) {
    req.message = 'UPDATE_INFO';
    next(err);
  }
};

export default updateInfo;
