// POST /board/:post_id/comment/:user_id
// 글 등록
import models from '../../models/index.js';

const postComment = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);
    const userId = Number(req.params.user_id);
    const { content } = req.body;

    const User = await models.User.findOne({
      where: { id: userId }
    });

    const Comment = await models.Comment.create({
      user_id: `${userId}`, // Foreign Key
      isAdmin: User.isAdmin,
      list_id: `${postId}`,
      writer: User.nickname,
      content: content
    });

    // 결과를 API POST의 결과로 return
    if (Comment) {
      res.status(200).send(Comment);
    } else {
      res.status(400);
    }
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

export default postComment;
