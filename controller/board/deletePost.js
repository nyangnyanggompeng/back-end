// POST /board/:post_id
// 글 삭제
import models from '../../models/index.js';

const deletePost = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);

    const Post = await models.Post.destroy({ where: { id: postId } });

    // 결과를 API POST의 결과로 return
    if (Post) {
      res.status(200).send('200 OK');
    } else {
      res.status(400).send('400 Bad Request');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('400 Bad Request');
  }
};

export default deletePost;
