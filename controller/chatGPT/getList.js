// GET /chatgpt/list/:user_id
// chatGPT 페이지 들어갔을 때 해당 유저의 모든 목록 조회
import models from '../../models/index.js';

const getList = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);

    const listId = await models.ChatGPTList.findAll({
      attributes: ['id'],
      include: {
        model: models.User,
        where: { id: userId }
      }
    });

    res.send(listId);
  } catch (err) {
    console.log(err);
  }
};

export default getList;
