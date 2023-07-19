// POST /chatgpt/:user_id
// 새로운 대화 시작이라면 ChatGPTList에 추가
import models from '../../models/index.js';

const postList = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const { name } = req.body;
    let List;

    if (!name) {
      return res.status(400).send('LIST_NAME_NOT_ENTERED');
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
        where: { userId: userId, name: name }
      });
      if (duplication.length === 0) {
        List = await models.ChatGPTList.create({
          userId: `${userId}`, // Foreign Key
          name: name
        });

        res.status(200).json({
          id: List.id,
          type: List.type,
          name: List.name,
          createdAt: List.createdAt
        });
      } else {
        res.status(400).send('LIST_NAME_ALREADY_EXISTS');
      }
    }
  } catch (err) {
    req.message = 'POST_LIST';
    next(err);
  }
};

export default postList;
