// GET /board/:post_id
// 글 조회
import models from '../../models/index.js';

const getPost = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);
    const Post = await models.Post.findOne({
      where: { id: postId }
    });
    res.status(200).json(Post);
  } catch (err) {
    console.log(err);
  }
};

export default getPost;
