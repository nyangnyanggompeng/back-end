// GET /chatgpt/content/:list_id
// 목록 중 하나를 선택했을 때 보이는 채팅 메시지들
import models from '../../models/index.js';

const getContent = async (req, res, next) => {
  try {
    const listId = Number(req.params.list_id);

    const content = await models.ChatGPTContent.findAll({
      attributes: ['question_num', 'sender', 'content', 'bookmark'],
      include: {
        model: models.ChatGPTList,
        where: { id: listId }
      }
    });

    res.send(content);
  } catch (err) {
    console.log(err);
  }
};

export default getContent;
