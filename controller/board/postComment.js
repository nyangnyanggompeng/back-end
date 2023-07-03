// POST /board/:post_id/comment/:user_id
// 글 등록
import models from '../../models/index.js';

const postComment = async (req, res, next) => {
  try {
    const postId = Number(req.params.post_id);
    const userId = Number(req.params.user_id);
    const { content } = req.body;

    const User = await models.User.findOne({
      where: { id: userId }
    });

    const Post = await models.Post.findOne({
      where: { id: postId }
    });

    const Comment = await models.Comment.create({
      user_id: `${userId}`, // Foreign Key
      isAdmin: User.isAdmin,
      post_id: `${postId}`,
      writer: User.nickname,
      content: content
    });

    // 결과를 API POST의 결과로 return
    if (Comment) {
      const num = Post.num_of_comment + 1;
      console.log(num);
      await models.Post.update(
        {
          num_of_comment: num
        },
        { where: { id: postId } }
      );
      res.status(200).json(Comment);
    } else {
      res.status(400).send('400 Bad Request');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('400 Bad Request');
  }
};

export default postComment;
