import models from '../models/index.js';
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    // 인증 성공
    console.log(req.headers.authorization.split('Bearer ')[1]);
    req.decoded = jwt.verify(
      req.headers.authorization.split('Bearer ')[1],
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    return next();
  } catch (err) {
    // 인증 실패
    if (err.name === 'TokenExpiredError') {
      // 유효시간 초과된 경우
      return res.status(419).send('토큰 만료');
    }
    if (err.name === 'JsonWebTokenError') {
      // 토큰 비밀키 일치하지 않는 경우
      return res.status(401).send('유효하지 않은 토큰');
    }
  }
};

export default auth;
