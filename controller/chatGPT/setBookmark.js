// POST /chatgpt/bookmark/:content_id
// Bookmark로 설정
import models from '../../models/index.js';

const setBookmark = async (req, res, next) => {
  try {
    const contentId = Number(req.params.content_id);
    const status = req.body.status;

    await models.ChatGPTList.update(
      {
        bookmark: status
      },
      { where: { id: contentId } }
    );

    res.send(status);
  } catch (err) {
    console.log(err);
  }
};

export default setBookmark;
