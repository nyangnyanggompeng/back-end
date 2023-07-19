// GET /chatgpt/search/list/:user_id
// 대화목록 검색
import models from '../../models/index.js';
import { Op } from 'sequelize';

const searchList = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const pageNum = Number(req.params.page_num);
    const { name } = req.body;
    let start = 0,
      end = 0;

    if (!name) {
      return res.status(400).send('NAME_NOT_ENTERED');
    }

    const List = await models.ChatGPTList.findAndCountAll({
      attributes: ['id', 'name', 'type', 'createdAt'],
      where: {
        [Op.and]: [
          { userId: userId },
          {
            name: {
              [Op.like]: `%${name}%`
            }
          }
        ]
      }
    });

    const ContentList = List.rows;
    const numberOfResult = List.count;

    let totalPages = parseInt(numberOfResult / 10);
    if (numberOfResult % 10 > 0) {
      totalPages += 1;
    }
    start = 10 * (pageNum - 1);
    if (pageNum + 1 > totalPages) {
      end = numberOfResult;
    } else {
      end = start + 10;
    }
    const Result = ContentList.slice(start, end);
    return res.status(200).json({ Result, numberOfResult, totalPages });
  } catch (err) {
    req.message = 'SEARCH_LIST';
    next(err);
  }
};

export default searchList;
