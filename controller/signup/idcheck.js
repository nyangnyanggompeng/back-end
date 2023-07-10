import models from '../../models/index.js';

const idCheck = async (req, res, next) => {
  try {
    const { username, domain } = req.body;
    if (!username || !domain) {
      return res.status(400).send('EMAIL_NOT_ENTERED');
    } else {
      const users = await models.User.findOne({
        where: { username: username, domain: domain }
      });

      if (users) {
        // 사용불가 이메일
        return res.status(400).send('EMAIL_ALREADY_EXISTS');
      } else {
        // 사용가능 이메일
        return res.status(200).send('AVAILABLE_EMAIL');
      }
    }
  } catch (err) {
    req.message = 'EMAIL_CHECK';
    next(err);
  }
};

export default idCheck;
