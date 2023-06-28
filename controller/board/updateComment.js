// POST /board/:post_id/comment/:comment_id
// 댓글 수정
import models from '../../models/index.js';

const updatePost = async (req, res, next) => {
  try {
    // const postId = Number(req.params.post_id);
    const commentId = Number(req.params.comment_id);
    const { content } = req.body;

    const Comment = await models.Comment.update(
      {
        content: content
      },
      { where: { id: commentId } }
    );

    // const Comment = await models.Comment.update(
    //   {
    //     writer: writer,
    //     content: content,
    //   },
    //   { where: { id: commentId } }
    // );

    // 결과를 API POST의 결과로 return
    res.status(200).json(Comment);
  } catch (err) {
    console.log(err);
  }
};

export default updatePost;
