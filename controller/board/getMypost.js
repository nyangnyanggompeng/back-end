// GET /board/:user_id/posts
// 댓글 목록 조회
import models from '../../models/index.js';

const getMypost = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);
    const Post = await models.Post.findAll({
      where: {
        user_id: userId
      }
    });

    // 결과를 API POST의 결과로 return
    if (Post) {
      res.status(200).send(Post);
    } else {
      res.status(400);
    }
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

export default getMypost;
