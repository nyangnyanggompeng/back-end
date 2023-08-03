import models from '../../models/index.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (req, res, next) => {
  try {
    const { username, domain, password } = req.body;

    if (!username || !domain || !password) {
      return res.status(400).send('EMAIL_OR_PASSWORD_NOT_ENTERED');
    } else {
      // EMAIL CHECK
      const users = await models.User.findOne({
        where: { username: username, domain: domain }
      });

      if (!users) {
        // EMAIL DOESN'T EXISTS
        return res.status(400).send('LOGIN_FAILURE');
      } else {
        // EMAIL EXIST
        if (users.useStatus === 0) {
          return res.status(400).send('LOGIN_FAILURE');
        }

        let check = await bcrypt.compare(password, users.password);
        if (!check) {
          // PASSWORD CHECK FALSE (LOGIN FAILURE)
          return res.status(400).send('LOGIN_FAILURE');
        } else {
          // PASSWORD CHECK TRUE (LOGIN SUCCESS)
          const accessToken = jwt.sign(
            {
              id: users.id,
              isAdmin: users.isAdmin,
              username: users.username,
              domain: users.domain
            },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: '60m' }
          );
          const refreshToken = jwt.sign(
            {
              id: users.id,
              isAdmin: users.isAdmin,
              username: users.username,
              domain: users.domain
            },
            process.env.REFRESH_TOKEN_SECRET_KEY,
            { expiresIn: '1d' }
          );

          res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true
          });
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true
          });

          return res.status(200).send(accessToken);
        }
      }
    }
  } catch (err) {
    req.message = 'LOGIN';
    next(err);
  }
};

export default loginUser;
