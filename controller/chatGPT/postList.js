// POST /chatgpt/:user_id
// 새로운 대화 시작이라면 ChatGPTList에 추가
import models from '../../models/index.js';

const postList = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);

    const List = await models.ChatGPTList.create({
      user_id: `${userId}` // Foreign Key
    });

    // 결과를 API POST의 결과로 return
    res.json(List);
  } catch (err) {
    console.log(err);
  }
};

export default postList;
