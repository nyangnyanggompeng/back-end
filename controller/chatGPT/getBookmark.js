// GET /chatgpt/:list_id
// 대화 목록에서 북마크 표시한 메시지만 보여주는 API
// 지금은 한 대화 목록에서 북마크 표시한 메시지만 보여주지만, 전체도 구현 예정
// -> user_id를 query로 입력 받음 -> user_id로 해당 유저가 가진 목록 가져오기
// -> 목록 하나하나 북마크 된 걸 list에 append -> return list
import models from '../../models/index.js';

const getContent = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);
    let Content = [];

    const List = await models.ChatGPTList.findAll({
      attributes: ['id'],
      where: { user_id: userId }
    });

    // console.log('list count = ', List.length);
    // console.log('id = ', List[0].dataValues.id);

    for (let i = 0; i < List.length; i++) {
      Content.push(
        await models.ChatGPTContent.findAll({
          where: { bookmark: true, list_id: List[i].dataValues.id }
        })
      );
    }

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
