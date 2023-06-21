'use strict';
import express from 'express';
const router = express.Router();
import usersRouter from './users.js';
import chatgptrouter from './chatgpt.js';

// 페이지 로딩 함수
router.get('/', (req, res) => {
  res.render('test', {}); // views 폴더 밑에 있는 파일을 참조함
});
router.use('/users', usersRouter);
router.use('/chatgpt', chatgptrouter);
export default router;
