// POST /board/:post_id
// 글 수정
import models from '../../models/index.js';

const updatePost = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);
    const { title, content } = req.body;

    const Post = await models.Post.update(
      {
        title: title,
        content: content
      },
      { where: { id: postId } }
    );

    // 결과를 API POST의 결과로 return
    if (Post) {
      res.status(200);
    } else {
      res.status(400);
    }
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

export default updatePost;
