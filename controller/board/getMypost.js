// GET /board/mypage/:user_id/posts/:page_num
// 내가 쓴 글 조회
import models from '../../models/index.js';

const getMypost = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);
    const pageNum = Number(req.params.page_num);
    let offset;

    if (pageNum > 1) {
      offset = 10 * (pageNum - 1);
    }

    const Post = await models.Post.findAll({
      attributes: ['id', 'writer', 'title', 'content', 'createdAt'],
      where: {
        userId: userId
      },
      order: [['createdAt', 'desc']],
      offset: offset,
      limit: 10
    });

    // 결과를 API POST의 결과로 return
    if (Post) {
      res.status(200).json(Post);
    } else {
      res.status(400).send('400 Bad Request');
    }
  } catch (err) {
    next(err);
  }
};

export default getMypost;
