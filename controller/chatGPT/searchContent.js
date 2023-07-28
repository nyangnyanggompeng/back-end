// GET /chatgpt/search/content/:user_id
// 대화 검색
import models from '../../models/index.js';
import { Op } from 'sequelize';

const searchList = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const pageNum = Number(req.params.page_num);
    const { content } = req.body;
    let ContentList = [];
    let numberOfResult = 0,
      start = 0,
      end = 0;

    if (!content) {
      return res.status(400).send('CONTENT_NOT_ENTERED');
    }

    const List = await models.ChatGPTList.findAndCountAll({
      attributes: ['id'],
      where: {
        userId: userId
      }
    });

    for (let i = 0; i < List.count; i++) {
      const Content = await models.ChatGPTContent.findAndCountAll({
        attributes: [
          'id',
          'questionNum',
          'sender',
          'content',
          'bookmark',
          'createdAt',
          'listId'
        ],
        where: {
          [Op.and]: [
            { content: { [Op.like]: `%${content}%` } },
            { listId: List.rows[i].dataValues.id }
          ]
        },
        include: [{ model: models.ChatGPTList, attributes: ['name'] }]
      });

      const count = Content.count;

      for (let j = 0; j < Content.count; j++) {
        if (Content.rows[j].dataValues.questionNum === 0) {
          const prompt = Content.rows[j].dataValues.content
            .split(':')[1]
            .split(' 이걸 읽고 ')[0];
          if (prompt.indexOf(content) !== -1) {
            Content.rows[j].dataValues.content = prompt;
            ContentList.push(Content.rows[j].dataValues);
          } else {
            count = count - 1;
          }
        } else {
          ContentList.push(Content.rows[j].dataValues);
        }
      }
      numberOfResult += Content.count;
    }

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
    req.message = 'SEARCH_CONTENT';
    next(err);
  }
};

export default searchList;
