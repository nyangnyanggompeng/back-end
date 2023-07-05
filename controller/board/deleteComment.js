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
    const Comment = await models.Comment.destroy({ where: { id: commentId } });

    // 결과를 API POST의 결과로 return
    if (Comment) {
      const num = Post.numOfComment - 1;
      await models.Post.update(
        {
          numOfComment: num
        },
        { where: { id: postId } }
      );
      res.status(200).json(Comment);
    } else {
      res.status(400).send('400 Bad Request');
    }
  } catch (err) {
    next(err);
  }
};

export default deleteComment;
