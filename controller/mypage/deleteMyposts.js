// POST /board
// 글 삭제
import models from '../../models/index.js';

const deleteMyposts = async (req, res, next) => {
  try {
    const { postIdList } = req.body;

    if (!postIdList) {
      return res.status(400).send('EMPTY_POST_ID_LIST');
    }

    for (let i = 0; i < postIdList.length; i++) {
      await models.Comment.destroy({
        where: { postId: postIdList[i] }
      });
      await models.Post.destroy({ where: { id: postIdList[i] } });
    }

    return res.status(200).send('DELETE_MY_POST_SUCCESS');
  } catch (err) {
    req.message = 'DELETE_MY_POST';
    next(err);
  }
};

export default deleteMyposts;
