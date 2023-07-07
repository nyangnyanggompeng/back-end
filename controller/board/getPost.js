// GET /board/:post_id/post
// 글 조회
import models from '../../models/index.js';

const getPost = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);

    // id / writer / title / content / createdAt / user_id
    const Post = await models.Post.findOne({
      attributes: ['id', 'writer', 'title', 'content', 'createdAt', 'userId'],
      where: { id: postId }
    });

    return res.status(200).json(Post);
  } catch (err) {
    return res.status(500).send('GET_POST_FAILURE');
  }
};

export default getPost;
