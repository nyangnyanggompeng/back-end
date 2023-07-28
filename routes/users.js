import express from 'express';
const router = express.Router();

import loginUser from '../controller/login/loginUser.js';
import refreshToken from '../controller/login/refreshToken.js';
import logoutUser from '../controller/login/logoutUser.js';

import auth from '../middleware/auth.js';

/**
 * @swagger
 * /api/users/auth:
 *   post:
 *     summary: 토큰 인증 결과 반환
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 토큰 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id: 
 *                    type: integer
 *                  isAdmin:
 *                    type: boolean
 *                  username:
 *                    type: string
 *                  domain:
 *                    type: boolean
 *                  nickname:
 *                    type: string
 *                  profile:
 *                    type: string
 *               example:
 *                  id: 1
 *                  isAdmin: false
 *                  username: test
 *                  domain: gmail.com
 *                  nickname: 냥냥곰펭
 *                  profile: post/1690537631865.png
 *       401:
 *         description: 토큰 비밀 키 불일치
 *         content: 
 *            text/html:
 *              example: INVALID_TOKEN
 *       419:
 *         description: 토큰 유효 시간 초과
 *         content: 
 *            text/html:
 *              example: TOKEN_EXPIRED
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
 *           example:
 *             username: test
 *             domain: gmail.com
 *             password: Testpwd1
 *     responses:
 *       200:
 *         description: 로그인 성공. 토큰이 반환됨.
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                   type: string
 *                   description: 접근 토큰
 *                refreshToken:
 *                   type: string
 *                   description: 갱신 토큰
 *              example: 
 *                accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlzQWRtaW4iOmZhbHNlLCJ1c2VybmFtZSI6ImhvbWV0ZXN0IiwiZG9tYWluIjoiZ21haWdsfgasdffd
 *                refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1sdfsdfasdf11rdjtMk9UXxoasdfasdfadf.asdfasdfasdfasdfasdfasdfasdfasdfadsdf
 *       400:
 *         description: 필수 값 누락, DB에 없는 사용자, 탈퇴한 사용자일 경우
 *         content: 
 *            text/html:
 *              example: EMAIL_OR_PASSWORD_NOT_ENTERED 
 *                     / EMAIL_DOESNT_EXIST 
 *                     / DELETED_USER
 *       401:
 *         description: 토큰 비밀 키 불일치
 *         content: 
 *            text/html:
 *              example: INVALID_TOKEN
 *       419:
 *         description: 토큰 유효 시간 초과
 *         content: 
 *            text/html:
 *              example: TOKEN_EXPIRED
 *       500:
 *         description: 로그인 실패
 *         content: 
 *            text/html:
 *              example: LOGIN_FAILURE
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
 *         content: 
 *            text/html:
 *              example: LOGOUT_SUCCESS
 *       500:
 *         description: 로그아웃 실패
 *         content: 
 *            text/html:
 *              example: LOGOUT_FAILURE
 */
router.get('/logout', logoutUser);

/**
 * @swagger
 * /users/refresh:
 *   post:
 *     summary: 토큰 새로 고침
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: refreshToken
 *         description: 새로고침할 토큰
 *         schema:
 *           type: object
 *           required:
 *             - refreshToken
 *           properties:
 *             refreshToken:
 *               type: string
 *               description: 새로 고침할 토큰
 *           example:
 *             refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY4ODYyNzc5NSwiZXhwIjoxNjg4NzE0MTk1fQ.ZWAKHaZtE1eNwvIEMR8PSVxxpZJCkB28r7zzX_J3Xug
 *     responses:
 *       200:
 *         description: 토큰 새로 고침 성공
 *         content: 
 *            text/html:
 *              example: ACCESS_TOKEN_CREATED
 *       400:
 *         description: Refresh 토큰이 없는 경우, 유효 시간 초과
 *         content: 
 *            text/html:
 *              example: INVALID_TOKEN / ROTTEN_TOKEN
 *       500:
 *         description: 토큰 새로 고침 실패
 *         content: 
 *            text/html:
 *              example: ACCESS_TOKEN_CREATED_FAILURE
 */
router.post('/refresh', refreshToken);

export default router;
