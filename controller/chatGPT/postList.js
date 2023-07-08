// POST /chatgpt/:user_id
// 새로운 대화 시작이라면 ChatGPTList에 추가
import models from '../../models/index.js';

const postList = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);
    const listName = req.body.name;

    if (!listName) {
      return res.status(400).send('LIST_NAME_NO_ENTERED');
    }

    // 대화목록 개수 계산하기
    const count = await models.ChatGPTList.count({
      where: {
        userId: userId
      }
    });

    if (count >= 30) {
      res.status(400).send('UNABLE_TO_CREATE_LIST_ANYMORE');
    } else {
      const duplication = await models.ChatGPTList.findAll({
        where: { userId: userId, name: listName }
      });
      if (duplication.length === 0) {
        await models.ChatGPTList.create({
          userId: `${userId}`, // Foreign Key
          name: listName
        });
        res.status(200).send('POST_LIST_SUCCESS');
      } else {
        res.status(400).send('LIST_NAME_ALREADY_EXISTS');
      }
    }
  } catch (err) {
    return res.status(500).send('POST_LIST_FAILURE');
  }
};

export default postList;
