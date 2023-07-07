// POST /board/:user_id
// 글 등록
import models from '../../models/index.js';

const postPost = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);
    //const userId = req.decoded.id;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).send('TITLE_OR_CONTENT_NO_ENTERED');
    }

    const User = await models.User.findOne({
      where: { id: userId }
    });

    const isAdmin = User.isAdmin;
    const nickname = User.nickname;

    await models.Post.create({
      userId: `${userId}`, // Foreign Key
      isAdmin: isAdmin,
      title: title,
      content: content,
      writer: nickname
    });

    return res.status(200).send('POST_POST_SUCCESS');
  } catch (err) {
    return res.status(500).send('POST_POST_FAILURE');
  }
};

export default postPost;
