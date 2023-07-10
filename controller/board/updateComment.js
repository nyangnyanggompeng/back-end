// POST /board/:post_id/comment/:comment_id
// 댓글 수정
import models from '../../models/index.js';

const updatePost = async (req, res, next) => {
  try {
    const commentId = Number(req.params.comment_id);
    const { content } = req.body;

    if (!content) {
      return res.status(400).send('CONTENT_NOT_ENTERED');
    }

    await models.Comment.update(
      {
        content: content
      },
      { where: { id: commentId } }
    );

    return res.status(200).send('UPDATE_COMMENT_SUCCESS');
  } catch (err) {
    req.message = 'UPDATE_COMMENT';
    next(err);
  }
};

export default updatePost;
