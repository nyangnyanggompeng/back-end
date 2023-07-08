'use strict';
import express from 'express';
import cookieParser from 'cookie-parser';

import loginUser from '../controller/login/loginUser.js';
import refresh from '../controller/login/refreshToken.js';
import logout from '../controller/login/logout.js';

import auth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

import updateInfo from '../controller/mypage/updateInfo.js';
import emailCheck from '../controller/mypage/emailCheck.js';
import resetPassword from '../controller/mypage/resetPassword.js';
import deleteUser from '../controller/mypage/deleteUser.js';
import userList from '../controller/mypage/userList.js';
// import { User } from '../models/index.js';
const router = express.Router();

router.use(cookieParser());

router.get('/', auth, adminAuth, userList.userList);
router.post('/login', loginUser.login);
router.get('/auth', auth, (req, res) => {
  console.log(req.decoded);
  res.status(200).send(req.decoded);
});
router.get('/logout', logout.logout);
router.post('/refresh', refresh.refreshToken);

router.post('/email_check', emailCheck.emailCheck);
router.patch('/:id', auth, updateInfo.updateInfo);
router.put('/:id/reset_password', resetPassword.resetPassword);
router.delete('/:id', auth, deleteUser.deleteUser);

export default router;
