// GET /board/:post_id/comment
// 댓글 목록 조회
import models from '../../models/index.js';

const getCommentlist = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);

    const Comment = await models.Comment.findAll({
      where: { board_id: postId }
    });

    // const Comment = await models.Comment.findAll({
    //   attributes: ['writer', 'content'],
    //   include: {
    //     model: models.Post,
    //     where: { id: postId }
    //   }
    // });

    // 결과를 API POST의 결과로 return
    res.status(200).json(Comment);
  } catch (err) {
    console.log(err);
  }
};

export default getCommentlist;
