// POST /chatgpt/:list_id
// 대화목록 이름 수정
import models from '../../models/index.js';

const updateList = async (req, res, next) => {
  try {
    const listId = Number(req.params.list_id);
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('NAME_NOT_ENTERED');
    }

    await models.ChatGPTList.update(
      {
        name: name
      },
      { where: { id: listId } }
    );

    return res.status(200).send('UPDATE_LIST_SUCCESS');
  } catch (err) {
    req.message = 'UPDATE_LIST';
    next(err);
  }
};

export default updateList;
