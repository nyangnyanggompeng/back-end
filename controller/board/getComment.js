// GET /board/:post_id/comment/:page_num
// 댓글 조회
import models from '../../models/index.js';

const getComment = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);
    const pageNum = Number(req.params.page_num);
    let offset;

    if (pageNum > 1) {
      offset = 10 * (pageNum - 1);
    }

    // id / writer / title / content / createdAt / user_id
    const Comment = await models.Comment.findAll({
      attributes: ['id', 'writer', 'content', 'createdAt', 'userId'],
      where: { postId: postId },
      offset: offset,
      limit: 10
    });

    // 결과를 API POST의 결과로 return
    if (Comment) {
      res.status(200).send(Comment);
    } else {
      res.status(400);
    }
  } catch (err) {
    next(err);
  }
};

export default getComment;
