// POST /board/:post_id
// 글 수정
import models from '../../models/index.js';

const updatePost = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).send('TITLE_OR_CONTENT_NO_ENTERED');
    }

    await models.Post.update(
      {
        title: title,
        content: content
      },
      { where: { id: postId } }
    );

    return res.status(200).send('UPDATE_POST_SUCCESS');
  } catch (err) {
    return res.status(500).send('UPDATE_POST_FAILURE');
  }
};

export default updatePost;
