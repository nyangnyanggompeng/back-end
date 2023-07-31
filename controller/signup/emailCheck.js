import models from '../../models/index.js';
import crypto from 'crypto';

const emailCheck = async (req, res, next) => {
  try {
    const { authNumber } = req.body;
    if (!authNumber) {
      return res.status(400).send('AUTHENTICATION_NUMBER_NOT_ENTERED');
    } else {
      if (
        !req.cookies.authNumber ||
        !req.cookies.username ||
        !req.cookies.domain
      ) {
        return res.status(401).send('NO_COOKIES');
      } else {
        const username = req.cookies.username;
        const domain = req.cookies.domain;
        console.log('username =', username, domain);
        const shasum = crypto.createHash('sha256');
        shasum.update(authNumber);
        const output = shasum.digest('hex');

        if (output !== req.cookies.authNumber) {
          return res.status(401).send('AUTHENTICATION_FAILURE');
        } else {
          const users = await models.User.findOne({
            where: { username: username, domain: domain }
          });
          if (users) {
            if (users.useStatus === 0) {
              return res.status(400).send('DELETED_USER');
            } else {
              return res.status(400).send('EMAIL_ALREADY_EXISTS');
            }
          }
        }

        res.clearCookie('authNumber', { sameSite: 'none', secure: true });
        res.clearCookie('username', { sameSite: 'none', secure: true });
        res.clearCookie('domain', { sameSite: 'none', secure: true });
        res.cookie('authResult', 'success', {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          maxAge: 36000000 // 1시간
        });

        return res.status(200).send('AVAILABLE_EMAIL');
      }
    }
  } catch (err) {
    req.message = 'EMAIL_CHECK';
    next(err);
  }
};

export default emailCheck;
