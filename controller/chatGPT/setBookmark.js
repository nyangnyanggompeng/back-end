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
      res.status(200).send('200 OK');
    } else {
      res.stuats(400).send('400 Bad Request');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('400 Bad Reqeust');
  }
};

export default setBookmark;
