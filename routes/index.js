import express from 'express';
const router = express.Router();

import usersRouter from './users.js';
import chatgptrouter from './chatgpt.js';
import registerRouter from './register.js';
import boardRouter from './board.js';
import mypageRouter from './mypage.js';

// 페이지 로딩 함수
router.get('/', (req, res) => {
  res.render('test', {}); // views 폴더 밑에 있는 파일을 참조함
});

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */
router.use('/users', usersRouter);

router.use('/chatgpt', chatgptrouter);
router.use('/register', registerRouter);
router.use('/board', boardRouter);
router.use('/mypage', mypageRouter);

export default router;
