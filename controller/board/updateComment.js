// POST /board/:post_id/comment/:comment_id
// 댓글 수정
import models from '../../models/index.js';

const updatePost = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);
    const commentId = Number(req.params.comment_id);
    const { content } = req.body;

    if (!content) {
      return res.status(400).send('CONTENT_NOT_ENTERED');
    } else {
      const Post = await models.Post.findOne({
        where: { id: postId }
      });

      if (!Post) {
        res.status(400).send('POST_DOESNT_EXIST');
      } else {
        await models.Comment.update(
          {
            content: content
          },
          { where: { id: commentId } }
        );
      }
    }

    return res.status(200).send('UPDATE_COMMENT_SUCCESS');
  } catch (err) {
    req.message = 'UPDATE_COMMENT';
    next(err);
  }
};

export default updatePost;
