// GET /board/mypage/:user_id/comments/:page_num
// 내가 쓴 댓글 조회
import models from '../../models/index.js';

const getMycomment = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);
    const pageNum = Number(req.params.page_num);
    let offset;

    const numberOfMyComment = await models.Comment.count({
      where: {
        userId: userId
      }
    });

    let totalPages = parseInt(numberOfMyComment / 10);
    if (numberOfMyComment % 10 > 0) {
      totalPages += 1;
    }

    if (pageNum > 1) {
      offset = 10 * (pageNum - 1);
    }

    const Comment = await models.Comment.findAll({
      attributes: ['id', 'writer', 'content', 'createdAt', 'postId'],
      where: {
        userId: userId
      },
      order: [['createdAt', 'desc']],
      offset: offset,
      limit: 10,
      include: [{ model: models.Post, attributes: ['title'] }]
    });

    return res.status(200).json({ Comment, numberOfMyComment, totalPages });
  } catch (err) {
    req.message = 'GET_MY_COMMENT';
    next(err);
  }
};

export default getMycomment;
