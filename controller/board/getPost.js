// GET /board/:post_id
// 글 조회
import models from '../../models/index.js';

const getPost = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);
    const Post = await models.Post.findOne({
      where: { id: postId }
    });
    if (Post) {
      res.status(200).json(Post);
    } else {
      res.status(400);
    }
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

export default getPost;
