// POST /chatgpt/bookmark/:content_id
// Bookmark로 설정
import models from '../../models/index.js';

const setBookmark = async (req, res, next) => {
  try {
    const contentId = Number(req.params.content_id);
    const status = req.query.isBookmarked;

    const bookmark = await models.ChatGPTContent.update(
      {
        bookmark: status
      },
      { where: { id: contentId } }
    );
    if (bookmark[0] == 1) {
      res.send('success');
    } else {
      res.send('fail');
    }
  } catch (err) {
    console.log(err);
  }
};

export default setBookmark;
