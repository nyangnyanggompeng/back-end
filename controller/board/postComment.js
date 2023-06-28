// POST /board/:post_id/comment/:user_id
// 글 등록
import models from '../../models/index.js';

const postComment = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);
    const userId = Number(req.params.user_id);
    const { writer, content } = req.body;
    let nickname;

    const User = await models.User.findOne({
      where: { id: userId }
    });

    const isAdmin = User.isAdmin;
    if (!writer) {
      nickname = User.nickname;
    } else {
      nickname = writer;
    }

    const Comment = await models.Comment.create({
      user_id: `${userId}`, // Foreign Key
      isAdmin: isAdmin,
      board_id: `${postId}`,
      writer: nickname,
      content: content
    });

    // 결과를 API POST의 결과로 return
    res.status(200).json(Comment);
  } catch (err) {
    console.log(err);
  }
};

export default postComment;
