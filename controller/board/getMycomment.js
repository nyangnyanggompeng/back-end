// PUT /board/posts
// 선택 댓글 삭제
import models from '../../models/index.js';

const getMycomment = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);
    const pageNum = Number(req.params.page_num);
    let offset;

    if (pageNum > 1) {
      offset = 10 * (pageNum - 1);
    }

    const Comment = await models.Comment.findAll({
      attributes: ['id', 'writer', 'content', 'updatedAt', 'post_id'],
      where: {
        user_id: userId
      },
      order: [['createdAt', 'desc']],
      offset: offset,
      limit: 10
    });

    // 결과를 API POST의 결과로 return
    if (Comment) {
      res.status(200).json(Comment);
    } else {
      res.status(400).send('400 Bad Request');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('400 Bad Request');
  }
};

export default getMycomment;
