// GET /chatgpt/content/:list_id
// 목록 중 하나를 선택했을 때 보이는 채팅 메시지들
import models from '../../models/index.js';

const getContent = async (req, res, next) => {
  try {
    const listId = Number(req.params.list_id);

    const Content = await models.ChatGPTContent.findAll({
      where: { list_id: listId }
    });

    if (Content) {
      res.status(200).json(Content);
    } else {
      res.status(400).send('400 Bad Request');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('400 Bad Request');
  }
};

export default getContent;
