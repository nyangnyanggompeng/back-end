import models from '../../models/index.js';
import deleteImage from '../../middleware/deleteImage.js';
import fs from 'fs';

const updateInfo = async (req, res, next) => {
  try {
    const id = req.decoded.id;
    const { nickname } = req.body;
    const profile = `${req.file.key}`;

    if (!nickname && !profile) {
      return res.status(400).send('NICKNAME_OR_PROFILE_NOT_ENTERED');
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
        if (users.profile === '') {
          users.update({ nickname: nickname, profile: profile });
          return res.status(200).send('UPDATE_INFO_SUCCESS');
        } else {
          if (deleteImage(users.profile) === 'success') {
            users.update({ nickname: nickname, profile: profile });
            return res.status(200).send('UPDATE_INFO_SUCCESS');
          } else {
            return res.status(500).send('UPDATE_INFO_FAILURE');
          }
        }
      }
    }
  } catch (err) {
    req.message = 'UPDATE_INFO';
    next(err);
  }
};

export default updateInfo;
