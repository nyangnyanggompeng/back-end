// POST /chatgpt/:user_id
// 새로운 대화 시작이라면 ChatGPTList에 추가
import models from '../../models/index.js';

const postList = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);
    const listName = req.body.name;

    // 대화목록 개수 계산하기
    const count = await models.ChatGPTList.findAndCountAll({
      where: {
        userId: userId
      }
    });

    if (count.count >= 30) {
      res.status(400).send('대화목록을 더 이상 만들 수 없습니다.');
    } else {
      const duplication = await models.ChatGPTList.findAll({
        where: { userId: userId, name: listName }
      });
      if (duplication.length === 0) {
        const List = await models.ChatGPTList.create({
          userId: `${userId}`, // Foreign Key
          name: listName
        });
        // 결과를 API POST의 결과로 return
        res.status(200).json(List);
      } else {
        res.status(400).send('대화목록 이름이 이미 있습니다.');
      }
    }
  } catch (err) {
    next(err);
  }
};

export default postList;
