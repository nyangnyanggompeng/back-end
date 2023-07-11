// GET /board/:page_num
// 글 목록 조회
import models from '../../models/index.js';

const getPostlist = async (req, res, next) => {
  try {
    const pageNum = Number(req.params.page_num);
    const numberOfPost = await models.Post.count();
    let offset;

    let totalPages = parseInt(numberOfPost / 10);
    if (numberOfPost % 10 > 0) {
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
        'numberOfComment',
        'createdAt',
        'userId'
      ],
      order: [['createdAt', 'desc']],
      offset: offset,
      limit: 10
    });

    return res.status(200).json({ Post, numberOfPost, totalPages });
  } catch (err) {
    req.message = 'GET_POST_LIST';
    next(err);
  }
};

export default getPostlist;
