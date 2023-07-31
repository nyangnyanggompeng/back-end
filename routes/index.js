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
 *   description: 사용자 로그인 로그아웃 및 토큰
 */
router.use('/users', usersRouter);

/**
 * @swagger
 * tags:
 *   name: ChatGPT
 *   description: 인터뷰룸
 */
router.use('/chatgpt', chatgptrouter);

/**
 * @swagger
 * tags:
 *   name: Register
 *   description: 사용자 추가 및 아이디 비밀번호 닉네임 유효성 체크
 */
router.use('/register', registerRouter);

/**
 * @swagger
 * tags:
 *   name: Board
 *   description: 게시판
 */
router.use('/board', boardRouter);

/**
 * @swagger
 * tags:
 *    name: Mypage
 *    description: 마이페이지
 */
router.use('/mypage', mypageRouter);

export default router;
