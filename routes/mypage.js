import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';
import userList from '../controller/mypage/userList.js';

import updateInfo from '../controller/mypage/updateInfo.js';
import emailCheck from '../controller/mypage/emailCheck.js';
import resetPassword from '../controller/mypage/resetPassword.js';
import deleteUser from '../controller/mypage/deleteUser.js';

import getBookmark from '../controller/mypage/getBookmark.js';
import setBookmark from '../controller/mypage/setBookmark.js';

import getMypost from '../controller/mypage/getMypost.js';
import getMycomment from '../controller/mypage/getMycomment.js';
import deleteMyposts from '../controller/mypage/deleteMyposts.js';
import deleteMycomments from '../controller/mypage/deleteMycomments.js';

router.get('/users', auth, adminAuth, userList);
router.post('/users/email_check', emailCheck);
router.patch('/users', auth, updateInfo);
router.patch('/users/reset_password', resetPassword);
router.put('/users', auth, deleteUser);

router.get('/set/bookmark/:page_num', auth, getBookmark);
router.patch('/bookmark/:content_id', auth, setBookmark);

router.get('/posts/:page_num', auth, getMypost);
router.get('/comments/:page_num', auth, getMycomment);
router.put('/posts', auth, deleteMyposts);
router.put('/comments', auth, deleteMycomments);

export default router;
