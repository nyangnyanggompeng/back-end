// POST /board/:post_id
// 글 삭제
import models from '../../models/index.js';

const deletePost = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);

    const Post = await models.Post.findOne({
      where: { id: postId }
    });

    if (!Post) {
      return res.status(400).send('POST_DOESNT_EXIST');
    } else if (req.decoded.id !== Post.userId && req.decoded.isAdmin !== true) {
      return res.status(401).send('NO_PERMISSIONS');
    } else {
      await models.Comment.destroy({ where: { postId: postId } });
      await models.Post.destroy({ where: { id: postId } });

      return res.status(200).send('DELETE_POST_SUCCESS');
    }
  } catch (err) {
    req.message = 'DELETE_POST';
    next(err);
  }
};

export default deletePost;
