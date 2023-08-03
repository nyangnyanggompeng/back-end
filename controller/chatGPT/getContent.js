// GET /chatgpt/content/:list_id
// 목록 중 하나를 선택했을 때 보이는 채팅 메시지들
import models from '../../models/index.js';
import { Op } from 'sequelize';

const getContent = async (req, res, next) => {
  try {
    const listId = Number(req.params.list_id);

    const List = await models.ChatGPTList.findAll({
      where: { id: listId }
    });

    if (List.length === 0) {
      return res.status(400).send('WRONG_CHATGPT_LIST');
    } else {
      // 일단은 한 대화 목록에 하나의 메시지만 보낼 수 있기 때문에 findOne 사용
      const userSend = await models.ChatGPTContent.findOne({
        where: {
          questionNum: 0,
          listId: listId
        }
      });
      if (!userSend) {
        return res.status(200).send('NO_CONTENT');
      } else {
        const prompt = userSend.content.split(':')[1].split(' 이걸 읽고 ')[0];
        const type = userSend.content
          .split('이걸 읽고 ')[1]
          .split('면접 질문 ')[0];
        const count = userSend.content
          .split('면접 질문 ')[1]
          .split('개 해 줘')[0];

        const Content = await models.ChatGPTContent.findAll({
          where: {
            questionNum: { [Op.ne]: 0 },
            listId: listId
          }
        });

        return res.status(200).json([{ prompt, type, count }, Content]);
      }
    }
  } catch (err) {
    req.message = 'GET_CONTENT';
    next(err);
  }
};

export default getContent;
