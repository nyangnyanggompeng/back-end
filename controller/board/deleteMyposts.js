// POST /board
// 글 삭제
import models from '../../models/index.js';

const deleteMyposts = async (req, res, next) => {
  try {
    const postIdList = req.body.post_id_list;

    for (let i = 0; i < postIdList.length; i++) {
      const Post = await models.Post.destroy({ where: { id: postIdList[i] } });
      if (!Post) {
        res.status(400).send('400 Bad Request');
      }
    }

    res.status(200).send('200 OK');
  } catch (err) {
    console.log(err);
    res.status(400).send('400 Bad Request');
  }
};

export default deleteMyposts;
