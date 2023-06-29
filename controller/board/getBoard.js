// GET /board
// 전체 게시글/댓글 조회
import models from '../../models/index.js';

const getBoard = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);
    const Post = await models.Post.findOne({
      where: { id: postId }
    });
    const Comment = await models.Comment.findAll({
      where: { post_id: postId }
    });

    // 결과를 API POST의 결과로 return
    if (Post) {
      if (Comment) {
        res.status(200).json({ Post, Comment });
      } else {
        res.status(400).send('400 Bad Request');
      }
    } else {
      res.status(400).send('400 Bad Request');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('400 Bad Request');
  }
};

export default getBoard;
