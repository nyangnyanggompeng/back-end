// GET /chatgpt/list/:user_id
// chatGPT 페이지 들어갔을 때 해당 유저의 모든 목록 조회
import models from '../../models/index.js';

const getList = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const pageNum = Number(req.params.page_num);
    let offset;

    const numberOfList = await models.ChatGPTList.count({
      where: {
        userId: userId
      }
    });

    let totalPages = parseInt(numberOfList / 10);
    if (numberOfList % 10 > 0) {
      totalPages += 1;
    }

    if (pageNum > 1) {
      offset = 10 * (pageNum - 1);
    }

    const List = await models.ChatGPTList.findAll({
      attributes: ['id', 'name', 'type', 'createdAt'],
      where: { userId: userId },
      order: [['createdAt', 'desc']],
      offset: offset,
      limit: 10
    });

    return res.status(200).json({ List, numberOfList, totalPages });
  } catch (err) {
    req.message = 'GET_LIST';
    next(err);
  }
};

export default getList;
