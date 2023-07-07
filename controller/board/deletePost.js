// POST /board/:post_id
// 글 삭제
import models from '../../models/index.js';

const deletePost = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);

    await models.Post.destroy({ where: { id: postId } });

    return res.status(200).send('DELETE_POST_SUCCESS');
  } catch (err) {
    return res.status(500).send('DELETE_POST_FAILURE');
  }
};

export default deletePost;
