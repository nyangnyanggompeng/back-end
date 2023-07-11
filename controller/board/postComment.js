// POST /board/:post_id/comment/:user_id
// 글 등록
import models from '../../models/index.js';

const postComment = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);
    const userId = Number(req.params.user_id);
    const { content } = req.body;

    if (!content) {
      return res.status(400).send('CONTENT_NOT_ENTERED');
    }

    const User = await models.User.findOne({
      where: { id: userId }
    });

    const Post = await models.Post.findOne({
      where: { id: postId }
    });

    await models.Comment.create({
      userId: `${userId}`, // Foreign Key
      isAdmin: User.isAdmin,
      postId: `${postId}`,
      writer: User.nickname,
      content: content
    });

    const num = Post.numberOfComment + 1;
    await models.Post.update(
      {
        numberOfComment: num
      },
      { where: { id: postId } }
    );

    return res.status(200).send('POST_COMMENT_SUCCESS');
  } catch (err) {
    req.message = 'POST_COMMENT';
    next(err);
    return res.status(500).send('POST_COMMENT_FAILURE');
  }
};

export default postComment;
