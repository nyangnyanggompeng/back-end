// PUT /chatgpt/list/:list_id/content
// 대화 내용 삭제
import models from '../../models/index.js';
import { Op } from 'sequelize';

const deleteContent = async (req, res, next) => {
  try {
    const listId = Number(req.params.list_id);
    const { contentIdList } = req.body;
    // const contentId = Number(req.params.content_id);

    if (!contentIdList) {
      return res.status(400).send('EMPTY_CONTENT_ID_LIST');
    }

    for (let i = 0; i < contentIdList.length; i++) {
      const Content = await models.ChatGPTContent.findOne({
        where: {
          id: contentIdList[i]
        }
      });

      const questionNum = Content.questionNum;
      if (questionNum === 0) {
        await models.ChatGPTContent.destroy({
          where: {
            listId: listId
          }
        });
        break;
      } else {
        await models.ChatGPTContent.destroy({
          where: {
            [Op.and]: [{ listId: listId }, { questionNum: questionNum }]
          }
        });
      }
    }

    return res.status(200).send('DELETE_CONTENT_SUCCESS');
  } catch (err) {
    req.message = 'DELETE_CONTENT';
    next(err);
  }
};

export default deleteContent;
