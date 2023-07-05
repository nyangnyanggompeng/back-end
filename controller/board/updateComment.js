// POST /board/:post_id/comment/:comment_id
// 댓글 수정
import models from '../../models/index.js';

const updatePost = async (req, res, next) => {
  try {
    // const postId = Number(req.params.post_id);
    const commentId = Number(req.params.comment_id);
    const { content } = req.body;

    const Comment = await models.Comment.update(
      {
        content: content
      },
      { where: { id: commentId } }
    );

    // 결과를 API POST의 결과로 return
    if (Comment) {
      res.status(200).send('200 Ok');
    } else {
      res.status(400).send('400 Bad Request');
    }
  } catch (err) {
    next(err);
  }
};

export default updatePost;
