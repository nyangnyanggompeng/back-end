// DELETE /chatgpt
// 대화 목록 삭제 : 부모인 목록(List)을 삭제하면 자녀인 대화(Content)도 삭제되도록 설정
import models from '../../models/index.js';

const deleteList = async (req, res, next) => {
  try {
    const { listIdList } = req.body;

    if (!listIdList) {
      return res.status(400).send('EMPTY_LIST_ID_LIST');
    }

    for (let i = 0; i < listIdList.length; i++) {
      const List = await models.ChatGPTList.findOne({
        where: { id: listIdList[i] }
      });
      if (!List) {
        return res.status(400).send('LIST_DOSENT_EXIST');
      } else if (req.decoded.id != List.userId) {
        return res.status(401).send('NO_PERMISSIONS');
      } else {
        await models.ChatGPTList.destroy({ where: { id: listIdList[i] } });
        return res.status(200).send('DELETE_LIST_SUCCESS');
      }
    }
  } catch (err) {
    req.message = 'DELETE_LIST';
    next(err);
  }
};

export default deleteList;
