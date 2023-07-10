// PUT /chatgpt/list/:list_id/content/:content_id
// 대화 내용 삭제
import models from '../../models/index.js';
import { Op } from 'sequelize';

const deleteContent = async (req, res, next) => {
  try {
    const listId = Number(req.params.list_id);
    const contentId = Number(req.params.content_id);

    const Content = await models.ChatGPTContent.findOne({
      where: {
        id: contentId
      }
    });

    const questionNum = Content.questionNum;
    console.log('questionNum = ', questionNum);
    await models.ChatGPTContent.destroy({
      where: {
        [Op.and]: [{ listId: listId }, { questionNum: questionNum }]
      }
    });

    return res.status(200).send('DELETE_CONTENT_SUCCESS');
  } catch (err) {
    req.message = 'DELETE_CONTENT';
    next(err);
  }
};

export default deleteContent;
