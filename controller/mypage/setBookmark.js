// POST /chatgpt/bookmark/:content_id
// Bookmark로 설정
import models from '../../models/index.js';

const setBookmark = async (req, res, next) => {
  try {
    const contentId = Number(req.params.content_id);
    const status = req.query.isBookmarked;

    await models.ChatGPTContent.update(
      {
        bookmark: status
      },
      { where: { id: contentId } }
    );

    return res.status(200).send('SET_BOOKMARK_SUCCESS');
  } catch (err) {
    req.message = 'SET_BOOKMARK';
    next(err);
  }
};

export default setBookmark;
