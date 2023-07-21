import jwt from 'jsonwebtoken';

const refreshToken = async (req, res, next) => {
  try {
    if (req.cookies !== null) {
      // ?. 뒤에 오는 키 값이 있으면 먼저 확인하고 값 반환
      const refreshToken = req.cookies.refreshToken;
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY,
        (err, decoded) => {
          if (err) {
            // 에러 있으면 -> refresh token 썩었으므로 다시 로그인 시킴
            return res.status(400).send('ROTTEN_TOKEN');
          } else {
            // 정상적인 토큰 -> 다시 access token 발급
            const accessToken = jwt.sign(
              {
                id: decoded.id,
                isAdmin: decoded.isAdmin,
                username: decoded.username,
                domain: decoded.domain
              },
              process.env.ACCESS_TOKEN_SECRET_KEY,
              { expiresIn: '60m' }
            );
            res.cookie('accessToken', accessToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'none'
            });
            return res.status(200).send('ACCESS_TOKEN_CREATED_SUCCESS');
          }
        }
      );
    } else {
      return res.status(400).send('INVALID_TOKEN');
    }
  } catch (err) {
    req.message = 'ACCESS_TOKEN_CREATED';
    next(err);
  }
};

export default refreshToken;
