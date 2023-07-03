// GET /board/:post_id/comment
// 댓글 조회
import Sequelize from 'sequelize';
import models from '../../models/index.js';

const getComment = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);

    // id / writer / title / content / createdAt / user_id
    const Comment = await models.Comment.findAll({
      attributes: ['id', 'writer', 'content', 'updatedAt', 'user_id'],
      where: { post_id: postId }
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

export default getComment;
