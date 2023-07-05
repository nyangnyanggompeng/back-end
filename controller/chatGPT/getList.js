// GET /chatgpt/list/:user_id
// chatGPT 페이지 들어갔을 때 해당 유저의 모든 목록 조회
import models from '../../models/index.js';

const getList = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);

    const List = await models.ChatGPTList.findAll({
      where: { userId: userId }
    });

    if (List) {
      res.status(200).json(List);
    } else {
      res.status(400).send('400 Bad Request');
    }
  } catch (err) {
    next(err);
  }
};

export default getList;
