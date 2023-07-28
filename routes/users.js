import express from 'express';
const router = express.Router();

import loginUser from '../controller/login/loginUser.js';
import refreshToken from '../controller/login/refreshToken.js';
import logoutUser from '../controller/login/logoutUser.js';

import auth from '../middleware/auth.js';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 사용자 로그인 로그아웃 및 토큰 새로고침
 */
router.get('/auth', auth, (req, res) => {
  return res.status(200).json(req.user);
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: 사용자 로그인
 *     tags: [Users]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: 로그인 정보
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - domain
 *             - password
 *           properties:
 *             username:
 *               type: string
 *               description: 로그인 시 필요한 아이디, 메일 아이디
 *             domain:
 *               type: string
 *               description: 도메인
 *             password:
 *               type: string
 *               description: 비밀번호
 *     responses:
 *       200:
 *         description: 로그인 성공. 토큰이 반환됨.
 *         schema:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *               description: 접근 토큰
 *             refreshToken:
 *               type: string
 *               description: 갱신 토큰
 *       400:
 *         description: 필수 값 누락, DB에 없는 사용자, 탈퇴한 사용자일 경우
 *       401:
 *         description: 토큰 비밀 키 불일치
 *       419:
 *         description: 토큰 유효 시간 초과
 *       500:
 *         description: 로그인 실패
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     summary: 사용자 로그아웃
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *       500:
 *         description: 로그아웃 실패
 */
router.get('/logout', logoutUser);

/**
 * @swagger
 * /users/refresh:
 *   post:
 *     summary: 토큰 새로 고침
 *     tags: [Users]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: refreshToken
 *         description: 새로 고침할 토큰
 *         schema:
 *           type: object
 *           required:
 *             - refreshToken
 *           properties:
 *             refreshToken:
 *               type: string
 *               description: 새로 고침할 토큰
 *     responses:
 *       200:
 *         description: 토큰 새로 고침 성공
 *       400:
 *         description: Refresh 토큰이 없는 경우, 유효 시간 초과
 *       500:
 *         description: 토큰 새로 고침 실패
 */
router.post('/refresh', refreshToken);

export default router;
