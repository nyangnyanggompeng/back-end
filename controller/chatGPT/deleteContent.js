// PUT /chatgpt/list/:list_id/content
// 대화 내용 삭제
import models from '../../models/index.js';
// import { Op } from 'sequelize';

const deleteContent = async (req, res, next) => {
  try {
    const listId = Number(req.params.list_id);
    const { contentIdList } = req.body;

    if (!contentIdList) {
      return res.status(400).send('EMPTY_CONTENT_ID_LIST');
    }

    for (let i = 0; i < contentIdList.length; i++) {
      const Content = await models.ChatGPTContent.findOne({
        where: {
          id: contentIdList[i]
        }
      });

      if (listId !== Content.listId) {
        return res.status(400).send('LIST_ID_DOSENT_MATCH');
      }

      const List = await models.ChatGPTList.findOne({
        where: {
          id: Content.listId
        }
      });

      const questionNum = Content.questionNum;
      if (!List) {
        return res.status(400).send('LIST_DOESNT_EXIST');
      } else if (
        req.decoded.id !== List.userId &&
        req.decoded.isAdmin !== true
      ) {
        return res.status(401).send('NO_PERMISSIONS');
      } else if (questionNum === 0) {
        return res.status(400).send('UNABLE_TO_DELETE_CONTENT');
      } else {
        await models.ChatGPTContent.destroy({
          where: {
            id: contentIdList[i]
            // [Op.and]: [{ questionNum: questionNum }, { listId: listId }]
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
