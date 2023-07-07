// POST /board
// 글 삭제
import models from '../../models/index.js';

const deleteMyposts = async (req, res, next) => {
  try {
    const postIdList = req.body.post_id_list;

    if (!postIdList) {
      return res.status(400).send('EMPTY_POST_ID_LIST');
    }

    for (let i = 0; i < postIdList.length; i++) {
      await models.Post.destroy({ where: { id: postIdList[i] } });
    }

    return res.status(200).send('DELETE_MY_POST_SUCCESS');
  } catch (err) {
    return res.status(500).send('DELETE_MY_POST_FAILURE');
  }
};

export default deleteMyposts;
