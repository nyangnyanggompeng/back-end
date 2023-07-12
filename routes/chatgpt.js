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

router.get('/', (req, res) => {
  res.render('chatgpt', {}); // views 폴더 밑에 있는 파일을 참조함
});
router.get('/lists/:user_id/:page_num', getList);
router.post('/lists/:user_id', postList);
router.patch('/lists/:list_id', updateList);
router.put('/lists', deleteList);

router.get('/contents/:list_id', getContent);
router.post('/contents/:list_id', postContent);
router.post('/contents/:list_id/:question_num', postAnswer);
router.put('/lists/:list_id/contents', deleteContent);

router.post('/search/lists/:user_id/:page_num', searchList);
router.post('/search/contents/:user_id/:page_num', searchContent);

export default router;
