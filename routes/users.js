'use strict';
import express from 'express';
import loginUser from '../controller/loginUser.js';

//import logout from '../controller/logout.js';
import auth from '../middleware/auth.js';
// import { User } from '../models/index.js';
const router = express.Router();

router.post('/login', loginUser.login);
//router.get('/logout', logout);
router.get('/auth', auth.auth, (req, res) => {
  console.log("토큰 검증 완료");
  res.send(req.decoded);
});

// router.get('/', (req, res) => {
//   // res.render('', {}); // views 폴더 밑에 있는 파일을 참조함
// });

export default router;
