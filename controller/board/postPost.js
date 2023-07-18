// POST /board/:user_id
// 글 등록
import models from '../../models/index.js';

const postPost = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const isAdmin = req.decoded.isAdmin;
    const nickname = req.decoded.nickname;
    console.log('req.decoded = ', req.decoded);
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).send('TITLE_OR_CONTENT_NOT_ENTERED');
    }

    // const User = await models.User.findOne({
    //   where: { id: userId }
    // });

    // const isAdmin = User.isAdmin;
    // const nickname = User.nickname;

    await models.Post.create({
      userId: `${userId}`, // Foreign Key
      isAdmin: isAdmin,
      title: title,
      content: content,
      writer: nickname
    });

    return res.status(200).send('POST_POST_SUCCESS');
  } catch (err) {
    req.message = 'POST_POST';
    next(err);
  }
};

export default postPost;
