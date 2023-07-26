import models from '../../models/index.js';
import bcrypt from 'bcrypt';
import deleteImage from '../../middleware/deleteImage.js';

const deleteUser = async (req, res, next) => {
  try {
    const id = req.decoded.id;
    const { password } = req.body;

    const users = await models.User.findOne({
      where: { id: id }
    });

    if (users.length === 0) {
      return res.status(401).send('UNAUTHORIZED');
    } else {
      if (password) {
        const check = await bcrypt.compare(password, users.password);
        if (!check) {
          return res.status(400).send('INVALID_PASSWORD');
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

          // S3 프로필 이미지 삭제
          if (users.profile !== '') {
            if (deleteImage(users.profile) === 'success') {
              await users.update({ profile: '' });
            } else {
              return res.status(500).send('USER_DELETED_FAILURE');
            }
          }

          await users.update({ useStatus: 0 });
          return res.status(200).send('USER_DELETED');
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
