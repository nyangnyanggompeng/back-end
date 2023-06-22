// GET /chatgpt/:list_id
// 대화 목록에서 북마크 표시한 메시지만 보여주는 API
// 지금은 한 대화 목록에서 북마크 표시한 메시지만 보여주지만, 전체도 구현 예정
// -> user_id를 query로 입력 받음 -> user_id로 해당 유저가 가진 목록 가져오기
// -> 목록 하나하나 북마크 된 걸 list에 append -> return list
import models from '../../models/index.js';

const getContent = async (req, res, next) => {
  try {
    const listId = Number(req.params.list_id);

    const content = await models.ChatGPTContent.findAll({
      attributes: ['sender', 'content'],
      where: { status: 1 },
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
