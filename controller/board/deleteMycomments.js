// PUT /board/posts
// 선택 댓글 삭제
import models from '../../models/index.js';

const deleteMycomments = async (req, res, next) => {
  try {
    const commentIdList = req.body.comment_id_list;

    for (let i = 0; i < commentIdList.length; i++) {
      const Comment = await models.Comment.findOne({
        attributes: ['post_id'],
        where: { id: commentIdList[i] }
      });

      const Post = await models.Post.findOne({
        where: { id: Comment.post_id }
      });
      const deleteComment = await models.Comment.destroy({
        where: { id: commentIdList[i] }
      });

      if (deleteComment) {
        const num = Post.num_of_comment - 1;
        await models.Post.update(
          {
            num_of_comment: num
          },
          { where: { id: Comment.post_id } }
        );
      } else {
        res.status(400).send('400 Bad Request');
      }
    }

    res.status(200).send('200 OK');
  } catch (err) {
    console.log(err);
    res.status(400).send('400 Bad Request');
  }
};

export default deleteMycomments;
