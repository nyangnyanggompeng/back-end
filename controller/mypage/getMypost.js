// GET /board/mypage/:user_id/posts/:page_num
// 내가 쓴 글 조회
import models from '../../models/index.js';

const getMypost = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const pageNum = Number(req.params.page_num);
    let offset;

    const numberOfMyPost = await models.Post.count({
      where: {
        userId: userId
      }
    });

    let totalPages = parseInt(numberOfMyPost / 10);
    if (numberOfMyPost % 10 > 0) {
      totalPages += 1;
    }

    if (pageNum > 1) {
      offset = 10 * (pageNum - 1);
    }

    const Post = await models.Post.findAll({
      attributes: [
        'id',
        'writer',
        'title',
        'content',
        'numberOfComment',
        'createdAt'
      ],
      where: {
        userId: userId
      },
      order: [['createdAt', 'desc']],
      offset: offset,
      limit: 10
    });

    return res.status(200).json({ Post, numberOfMyPost, totalPages });
  } catch (err) {
    req.message = 'GET_MY_POST';
    next(err);
  }
};

export default getMypost;
