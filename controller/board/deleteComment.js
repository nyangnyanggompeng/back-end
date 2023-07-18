// PUT /board/:post_id/comment/:comment_id
// 댓글 삭제
import models from '../../models/index.js';

const deleteComment = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);
    const commentId = Number(req.params.comment_id);

    const Post = await models.Post.findOne({
      where: { id: postId }
    });

    if (!Post) {
      return res.status(400).send('POST_DOESNT_EXIST');
    } else {
      const Comment = await models.Comment.findOne({
        where: { id: commentId }
      });
      if (!Comment) {
        return res.status(400).send('COMMENT_DOESNT_EXIST');
      } else if (
        req.decoded.id != Comment.userId ||
        req.decoded.isAdmin != true
      ) {
        return res.status(401).send('NO_PERMISSIONS');
      } else {
        await models.Comment.destroy({ where: { id: commentId } });

        const num = Post.numberOfComment - 1;
        await models.Post.update(
          {
            numberOfComment: num
          },
          { where: { id: postId } }
        );

        return res.status(200).send('DELETE_COMMENT_SUCCESS');
      }
    }
  } catch (err) {
    req.message = 'DELETE_COMMENT';
    next(err);
  }
};

export default deleteComment;
