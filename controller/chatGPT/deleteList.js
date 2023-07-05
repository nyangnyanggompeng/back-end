// DELETE /chatgpt/:list_id
// 대화 목록 삭제 : 부모인 목록(List)을 삭제하면 자녀인 대화(Content)도 삭제되도록 설정
import models from '../../models/index.js';

const deleteList = async (req, res, next) => {
  try {
    const listId = Number(req.params.list_id);

    // list에서는 삭제가 되었는데, content에서는 동기화가 안됨,,
    await models.ChatGPTList.destroy({
      where: {
        id: listId
      }
    });

    // 결과를 API POST의 결과로 return
    res.status(200).send('200 OK');
  } catch (err) {
    next(err);
  }
};

export default deleteList;
