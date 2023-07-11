// PUT /board/posts
// 선택 댓글 삭제
import models from '../../models/index.js';

const deleteMycomments = async (req, res, next) => {
  try {
    const { commentIdList } = req.body;

    if (!commentIdList) {
      return res.status(400).send('EMPTY_COMMENT_ID_LIST');
    }

    for (let i = 0; i < commentIdList.length; i++) {
      const Post = await models.Post.findOne({
        where: { id: Comment.postId }
      });

      const Comment = await models.Comment.findOne({
        attributes: ['postId'],
        where: { id: commentIdList[i] }
      });

      await models.Comment.destroy({
        where: { id: commentIdList[i] }
      });

      const num = Post.numberOfComment - 1;
      await models.Post.update(
        {
          numberOfComment: num
        },
        { where: { id: Comment.postId } }
      );
    }

    return res.status(200).send('DELETE_MY_COMMENT_SUCCESS');
  } catch (err) {
    req.message = 'DELETE_MY_COMMENT';
    next(err);
  }
};

export default deleteMycomments;
