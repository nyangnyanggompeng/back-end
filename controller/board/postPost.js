// POST /board/:user_id
// 글 등록
import models from '../../models/index.js';

const postPost = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);
    const { title, content } = req.body;

    const User = await models.User.findOne({
      where: { id: userId }
    });

    const isAdmin = User.isAdmin;
    const nickname = User.nickname;

    const Post = await models.Post.create({
      userId: `${userId}`, // Foreign Key
      isAdmin: isAdmin,
      title: title,
      content: content,
      writer: nickname
    });

    // 결과를 API POST의 결과로 return
    if (Post) {
      res.status(200).json(Post);
    } else {
      res.status(400).send('400 Bad Request');
    }
  } catch (err) {
    next(err);
  }
};

export default postPost;
