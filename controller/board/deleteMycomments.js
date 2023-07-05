// PUT /board/posts
// 선택 댓글 삭제
import models from '../../models/index.js';

const deleteMycomments = async (req, res, next) => {
  try {
    const commentIdList = req.body.comment_id_list;

    for (let i = 0; i < commentIdList.length; i++) {
      const Comment = await models.Comment.findOne({
        attributes: ['postId'],
        where: { id: commentIdList[i] }
      });

      const Post = await models.Post.findOne({
        where: { id: Comment.postId }
      });
      const deleteComment = await models.Comment.destroy({
        where: { id: commentIdList[i] }
      });

      if (deleteComment) {
        const num = Post.numOfComment - 1;
        await models.Post.update(
          {
            numOfComment: num
          },
          { where: { id: Comment.postId } }
        );
      } else {
        res.status(400).send('400 Bad Request');
      }
    }

    res.status(200).send('200 OK');
  } catch (err) {
    next(err);
  }
};

export default deleteMycomments;
