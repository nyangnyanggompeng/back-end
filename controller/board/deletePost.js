// POST /board/post/:post_id
// 글 삭제
import models from '../../models/index.js';

const deletePost = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);

    const Post = await models.Post.destroy({ where: { id: postId } });

    // 결과를 API POST의 결과로 return
    res.status(200).json(Post);
  } catch (err) {
    console.log(err);
  }
};

export default deletePost;
