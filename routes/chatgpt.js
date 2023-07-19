import express from 'express';
const router = express.Router();

import getList from '../controller/chatGPT/getList.js';
import postList from '../controller/chatGPT/postList.js';
import getContent from '../controller/chatGPT/getContent.js';
import postContent from '../controller/chatGPT/postContent.js';
import postAnswer from '../controller/chatGPT/postAnswer.js';
import updateList from '../controller/chatGPT/updateList.js';
import deleteList from '../controller/chatGPT/deleteList.js';
import deleteContent from '../controller/chatGPT/deleteContent.js';
import searchList from '../controller/chatGPT/searchList.js';
import searchContent from '../controller/chatGPT/searchContent.js';

import auth from '../middleware/auth.js';

router.get('/', (req, res) => {
  res.render('chatgpt', {}); // views 폴더 밑에 있는 파일을 참조함
});
router.get('/lists/:page_num', auth, getList);
router.post('/lists', auth, postList);
router.patch('/lists/:list_id', auth, updateList);
router.put('/lists', auth, deleteList);

router.get('/contents/:list_id', auth, getContent);
router.post('/contents/:list_id', auth, postContent);
router.post('/contents/:list_id/:question_num', auth, postAnswer);
router.put('/lists/:list_id/contents', auth, deleteContent);

router.post('/search/lists/:page_num', auth, searchList);
router.post('/search/contents/:page_num', auth, searchContent);

export default router;
