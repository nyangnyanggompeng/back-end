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
 *   description: 유저 추가 수정 삭제 조회
 */
router.get('/auth', auth, (req, res) => {
  console.log(req.decoded);
  return res.status(200).send(req.decoded);
});

/**
 * @swagger
 * paths:
 *  /api/users/login:
 *    get:
 *      summary: "유저 데이터 전체조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: 전체 유저 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                            { "id": 1, "name": "유저1" },
 *                            { "id": 2, "name": "유저2" },
 *                            { "id": 3, "name": "유저3" },
 *                          ]
 */

router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/refresh', refreshToken);

export default router;
