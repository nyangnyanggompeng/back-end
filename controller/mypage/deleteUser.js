import models from '../../models/index.js';
import bcrypt from 'bcrypt';

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).send('PASSWORD_NOT_ENTERED');
    } else {
      const users = await models.User.findOne({
        where: { id: id }
      });

      const check = await bcrypt.compare(password, users.password);
      if (!check) {
        return res.status(400).send('INVALID_PASSWORD');
      } else {
        await users.update({ useStatus: 0 });
        return res.status(200).send('DELETE_USER_SUCCESS');
      }
    }
  } catch (err) {
    req.message = 'DELETE_USER';
    next(err);
  }
};

export default deleteUser;
