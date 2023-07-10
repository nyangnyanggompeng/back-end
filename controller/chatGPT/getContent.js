// GET /chatgpt/content/:list_id
// 목록 중 하나를 선택했을 때 보이는 채팅 메시지들
import models from '../../models/index.js';

const getContent = async (req, res, next) => {
  try {
    const listId = Number(req.params.list_id);

    const Content = await models.ChatGPTContent.findAll({
      where: { listId: listId }
    });

    return res.status(200).json(Content);
  } catch (err) {
    req.message = 'GET_CONTENT';
    next(err);
  }
};

export default getContent;
