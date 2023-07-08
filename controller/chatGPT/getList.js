// GET /chatgpt/list/:user_id
// chatGPT 페이지 들어갔을 때 해당 유저의 모든 목록 조회
import models from '../../models/index.js';

const getList = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);
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
    return res.stauts(500).send('GET_LIST_FAILURE');
  }
};

export default getList;
