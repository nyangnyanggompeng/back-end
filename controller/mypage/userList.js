import models from '../../models/index.js';

const userList = async (req, res, next) => {
  try {
    const users = await models.User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    req.message = 'GET_USERLIST';
    next(err);
  }
};

export default userList;
