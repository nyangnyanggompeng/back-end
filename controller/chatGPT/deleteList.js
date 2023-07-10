// DELETE /chatgpt/:list_id
// 대화 목록 삭제 : 부모인 목록(List)을 삭제하면 자녀인 대화(Content)도 삭제되도록 설정
import models from '../../models/index.js';

const deleteList = async (req, res, next) => {
  try {
    const listId = Number(req.params.list_id);

    await models.ChatGPTList.destroy({
      where: {
        id: listId
      }
    });

    return res.status(200).send('DELETE_LIST_SUCCESS');
  } catch (err) {
    req.message = 'DELETE_LIST';
    next(err);
  }
};

export default deleteList;
