import models from '../../models/index.js';
import bcrypt from 'bcrypt';

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { password } = req.body;

    const users = await models.User.findOne({
      where: { id: id }
    });

    if (users.length !== 0) {
      res.status(401).send('UNAUTHORIZED');
    } else {
      if (password) {
        const check = await bcrypt.compare(password, users.password);
        if (!check) {
          res.status(400).send('INVALID_PASSWORD');
        } else {
          // 작성한 댓글 삭제
          await models.Comment.destroy({ where: { userId: id } });

          // 작성한 게시글 삭제
          const Post = await models.Post.findAll({ where: { userId: id } });
          for (let i = 0; i < Post.length; i++) {
            await models.Post.destroy({ where: { id: Post[i].id } });
          }

          // 사용한 GPT 삭제
          const List = await models.ChatGPTList.findAll({
            where: { userId: id }
          });
          for (let j = 0; j < List.length; j++) {
            await models.ChatGPTContent.destroy({
              where: { listId: List[j].id }
            });
          }
          await models.ChatGPTList.destroy({ where: { userId: id } });

          users.update({ useStatus: 0 });
          res.status(200).send('USER_DELETED');
        }
      } else {
        res.status(400).send('PASSWORD_NOT_ENTERED');
      }
    }
  } catch (err) {
    req.message = 'DELETE_USER';
    next(err);
  }
};

export default deleteUser;
