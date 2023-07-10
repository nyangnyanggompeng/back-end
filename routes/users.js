import express from 'express';
const router = express.Router();

import cookieParser from 'cookie-parser';

import loginUser from '../controller/login/loginUser.js';
import refreshToken from '../controller/login/refreshToken.js';
import logoutUser from '../controller/login/logoutUser.js';

import auth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

import updateInfo from '../controller/mypage/updateInfo.js';
import emailCheck from '../controller/mypage/emailCheck.js';
import resetPassword from '../controller/mypage/resetPassword.js';
import deleteUser from '../controller/mypage/deleteUser.js';
import userList from '../controller/mypage/userList.js';

router.use(cookieParser());

router.get('/', auth, adminAuth, userList);
router.post('/login', loginUser);
router.get('/auth', auth, (req, res) => {
  console.log(req.decoded);
  return res.status(200).send(req.decoded);
});
router.get('/logout', logoutUser);
router.post('/refresh', refreshToken);

router.post('/email_check', emailCheck);
router.patch('/:id', auth, updateInfo);
router.put('/:id/reset_password', resetPassword);
router.delete('/:id', auth, deleteUser);

export default router;
