'use strict';
import express from 'express';
import loginUser from '../controller/login/loginUser.js';
import refresh from '../controller/login/refreshToken.js';
import cookieParser from 'cookie-parser';

//import logout from '../controller/logout.js';
import auth from '../middleware/auth.js';
// import { User } from '../models/index.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', {}); // views 폴더 밑에 있는 파일을 참조함
});
router.post('/login', loginUser.login);
router.get('/auth', auth, (req, res) => {
  console.log('토큰 검증 완료');
  res.send(req.decoded);
});
router.get('/logout', (req, res) => {
  res.clearCookie('accessToken').redirect('/api');
});
router.post('/refresh', refresh.refreshToken);
export default router;
