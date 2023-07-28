import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models/index.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const auth = async (req, res, next) => {
  try {
    // 인증 성공
    if (!req.cookies || !req.cookies.accessToken) {
      return res.status(401).send('NO_TOKEN');
    }

    req.decoded = jwt.verify(
      req.cookies.accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );

    req.user = await models.User.findOne({
      attributes: [
        'id',
        'isAdmin',
        'username',
        'domain',
        'nickname',
        'profile'
      ],
      where: { id: req.decoded.id }
    });

    return next();
  } catch (err) {
    // 인증 실패
    if (err.name === 'TokenExpiredError') {
      // 유효시간 초과된 경우
      return res.status(419).send('TOKEN_EXPIRED');
    } else if (err.name === 'JsonWebTokenError') {
      // 토큰 비밀키 일치하지 않는 경우
      return res.status(401).send('INVALID_TOKEN');
    }
    return next(err);
  }
};

export default auth;
