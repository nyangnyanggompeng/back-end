// GET /board
// 전체 게시글/댓글 조회
import models from '../../models/index.js';

const getBoard = async (req, res, next) => {
  try {
    const Comment = await models.Comment.findAll({
      include: {
        model: models.Post,
        attributes: ['writer', 'content']
      }
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

export default getBoard;
