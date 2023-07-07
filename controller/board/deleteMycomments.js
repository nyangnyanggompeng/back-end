// PUT /board/posts
// 선택 댓글 삭제
import models from '../../models/index.js';

const deleteMycomments = async (req, res, next) => {
  try {
    const commentIdList = req.body.comment_id_list;

    if (!commentIdList) {
      return res.status(400).send('EMPTY_COMMENT_ID_LIST');
    }

    for (let i = 0; i < commentIdList.length; i++) {
      const Comment = await models.Comment.findOne({
        attributes: ['postId'],
        where: { id: commentIdList[i] }
      });

      const Post = await models.Post.findOne({
        where: { id: Comment.postId }
      });

      await models.Comment.destroy({
        where: { id: commentIdList[i] }
      });

      const num = Post.numOfComment - 1;
      await models.Post.update(
        {
          numOfComment: num
        },
        { where: { id: Comment.postId } }
      );
    }

    return res.status(200).send('DELETE_MY_COMMENT_SUCCESS');
  } catch (err) {
    return res.status(500).send('DELETE_MY_COMMENT_FAILURE');
  }
};

export default deleteMycomments;
