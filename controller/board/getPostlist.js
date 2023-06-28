// GET /board/:page_num
// 글 목록 조회
import models from '../../models/index.js';

const getPostlist = async (req, res, next) => {
  try {
    const pageNum = Number(req.params.page_num);
    let offset;

    if (pageNum > 1) {
      offset = 10 * (pageNum - 1);
    }

    const Post = await models.Post.findAll({
      order: [['createdAt', 'desc']],
      offset: offset,
      limit: 10
    });

    // 결과를 API POST의 결과로 return
    res.status(200).json(Post);
  } catch (err) {
    console.log(err);
  }
};

export default getPostlist;
