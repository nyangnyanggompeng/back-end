'use strict';
import express from 'express';

import getList from '../controller/chatGPT/getList.js';
import postList from '../controller/chatGPT/postList.js';
import getContent from '../controller/chatGPT/getContent.js';
import postContent from '../controller/chatGPT/postContent.js';
import postAnswer from '../controller/chatGPT/postAnswer.js';
import deleteList from '../controller/chatGPT/deleteList.js';
import deleteContent from '../controller/chatGPT/deleteContent.js';
import getBookmark from '../controller/chatGPT/getBookmark.js';
import setBookmark from '../controller/chatGPT/setBookmark.js';
import searchList from '../controller/chatGPT/searchList.js';
import searchContent from '../controller/chatGPT/searchContent.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('chatgpt', {}); // views 폴더 밑에 있는 파일을 참조함
});
router.get('/list/:user_id/:page_num', getList);
router.post('/list/:user_id', postList);
router.get('/content/:list_id', getContent);
router.post('/content/:list_id', postContent);
router.post('/content/:list_id/:question_num', postAnswer);
router.put('/list/:list_id', deleteList);
router.get('/bookmark/:user_id/:page_num', getBookmark);
router.get('/set/bookmark/:content_id', setBookmark);
router.put('/list/:list_id/content/:content_id', deleteContent);
router.post('/search/list/:user_id/:page_num', searchList);
router.post('/search/content/:user_id/:page_num', searchContent);

export default router;
