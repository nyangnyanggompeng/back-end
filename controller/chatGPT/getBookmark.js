// GET /chatgpt/:user_id/:page_num
// 대화 목록에서 북마크 표시한 메시지만 보여주는 API
import models from '../../models/index.js';

const getBookmark = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);
    const pageNum = Number(req.params.page_num);
    let ContentList = [];
    let start = 0,
      end = 0;

    const List = await models.ChatGPTList.findAll({
      attributes: ['id'],
      where: { userId: userId }
    });

    let numberOfContent = 0;
    for (let i = 0; i < List.length; i++) {
      const Value = await models.ChatGPTContent.findAndCountAll({
        where: { bookmark: true, listId: List[i].dataValues.id }
      });
      for (let j = 0; j < Value.count; j++) {
        ContentList.push(Value.rows[j].dataValues);
      }
      numberOfContent += Value.count;
    }

    let totalPages = parseInt(numberOfContent / 10);
    if (numberOfContent % 10 > 0) {
      totalPages += 1;
    }
    start = 10 * (pageNum - 1);
    if (pageNum + 1 > totalPages) {
      end = numberOfContent;
    } else {
      end = start + 10;
    }

    const Content = ContentList.slice(start, end);
    return res.status(200).json({ Content, numberOfContent, totalPages });
  } catch (err) {
    req.message = 'GET_BOOKMARK';
    next(err);
  }
};

export default getBookmark;
