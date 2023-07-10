// passwordCheck.js와 비교해서 send 내용 하나로 통일하기

import models from '../../models/index.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const resetPassword = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { password, passwordVerify } = req.body;

    if (!password || !passwordVerify) {
      return res.status(400).send('PASSWORD_OR_PASSWORD_VERIFY_NOT_ENTERED');
    } else if (password !== passwordVerify) {
      return res.status(400).send('PASSWORD_NOT_MATCHED');
    } else {
      const encryptedPW = bcrypt.hashSync(password, saltRounds);
      const users = await models.User.findOne({
        where: { id: id }
      });

      const check = await bcrypt.compare(password, users.password);
      if (!check) {
        await users.update({ password: encryptedPW });
        return res.status(200).send('RESET_PASSWORD_SUCCESS');
      } else {
        return res.status(400).send('CURRENT_USING_PASSWORD');
      }
    }
  } catch (err) {
    req.message = 'RESET_PASSWORD';
    next(err);
  }
};

export default resetPassword;
