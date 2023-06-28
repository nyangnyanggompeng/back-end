// POST /board/:user_id
// 글 등록
import models from '../../models/index.js';

const postPost = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);
    const { title, content, writer } = req.body;
    let User;
    let nickname;

    // writer에 값이 없으면
    if (!writer) {
      User = await models.User.findOne({
        where: { id: userId }
      });
      nickname = User.nickname;
    } else {
      User = await models.User.findOne({
        where: { id: userId }
      });
      nickname = writer;
    }
    const isAdmin = User.isAdmin;

    const Post = await models.Post.create({
      user_id: `${userId}`, // Foreign Key
      isAdmin: isAdmin,
      title: title,
      content: content,
      writer: nickname
    });

    // 결과를 API POST의 결과로 return
    res.status(200).json(Post);
  } catch (err) {
    console.log(err);
  }
};

export default postPost;
