// GET /board/:post_id/post
// 글 조회
import models from '../../models/index.js';

const getPost = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);

    // id / writer / title / content / createdAt / user_id
    const Post = await models.Post.findOne({
      attributes: ['id', 'writer', 'title', 'content', 'updatedAt', 'user_id'],
      where: { id: postId }
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

export default getPost;
