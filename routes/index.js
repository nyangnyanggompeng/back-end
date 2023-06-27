'use strict';
import express from 'express';
import usersRouter from './users.js';
import chatgptrouter from './chatgpt.js';
import registerRouter from './register.js';
const router = express.Router();

// 페이지 로딩 함수
router.get('/', (req, res) => {
  res.render('test', {}); // views 폴더 밑에 있는 파일을 참조함
});
router.use('/users', usersRouter);
router.use('/chatgpt', chatgptrouter);
router.use('/register', registerRouter);

export default router;
