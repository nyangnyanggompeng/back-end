// GET /board/:post_id/comment/:page_num
// 댓글 조회
import models from '../../models/index.js';

const getComment = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);
    const pageNum = Number(req.params.page_num);
    let offset;

    const numberOfComment = await models.Comment.count({
      where: { postId: postId }
    });

    let totalPages = parseInt(numberOfComment / 10);
    if (numberOfComment % 10 > 0) {
      totalPages += 1;
    }

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

    return res.status(200).json({ Comment, numberOfComment, totalPages });
  } catch (err) {
    req.message = 'GET_COMMENT';
    next(err);
  }
};

export default getComment;
