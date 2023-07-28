import models from '../../models/index.js';
import deleteImage from '../../middleware/deleteImage.js';
// import axios from 'axios';

const updateInfo = async (req, res, next) => {
  try {
    const id = req.decoded.id;

    // 닉네임과 사진 모두 입력되지 않았을 때
    if (!req.body.nickname && req.file === undefined) {
      return res.status(400).send('NICKNAME_OR_PROFILE_NOT_ENTERED');
    }

    // 사진 중복 - etag로 비교하려고 하는데 AccessDenied 발생
    // let url = `https://nyangnyanggompeng.s3.ap-northeast-2.amazonaws.com/${req.decoded.profile}`;
    // axios.get(url).then(res => {
    //   console.log('axios : ', res);
    // });

    let nickname, profile;

    // 닉네임이 기존과 동일한 경우
    if (!req.body.nickname) {
      nickname = req.user.nickname;
    } else {
      if (req.body.nickname === req.user.nickname) {
        return res.status(400).send('SAME_AS_PREVIOUS_NICKNAME');
      } else {
        const users = await models.User.findOne({
          where: { nickname: req.body.nickname }
        });
        // 바꿀 닉네임이 이미 존재하는 경우
        if (users) {
          return res.status(400).send('NICKNAME_ALREADY_EXISTS');
        } else {
          nickname = req.body.nickname;
        }
      }
    }

    if (req.file === undefined) {
      profile = req.user.profile;
    } else {
      profile = req.file.key;
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
