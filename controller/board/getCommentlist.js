// GET /board/:post_id/comment
// 댓글 목록 조회
import models from '../../models/index.js';

const getCommentlist = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);

    const Comment = await models.Comment.findAll({
      where: { list_id: postId }
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

export default getCommentlist;
