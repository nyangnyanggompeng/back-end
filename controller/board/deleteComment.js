// PUT /board/:post_id/comment/:comment_id
// 댓글 삭제
import models from '../../models/index.js';

const deleteComment = async (req, res, next) => {
  try {
    // const postId = Number(req.params.post_id);
    const commentId = Number(req.params.comment_id);

    const Comment = await models.Comment.destroy({ where: { id: commentId } });

    // 결과를 API POST의 결과로 return
    res.status(200).json(Comment);
  } catch (err) {
    console.log(err);
  }
};

export default deleteComment;
