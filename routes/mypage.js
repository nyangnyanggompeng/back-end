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
router.patch('/users/:id', auth, updateInfo);
router.patch('/users/:id/reset_password', resetPassword);
router.put('/users/:id', auth, deleteUser);

router.get('/bookmark/:user_id/:page_num', getBookmark);
router.get('/bookmark/:content_id', setBookmark);

router.get('/:user_id/posts/:page_num', getMypost);
router.get('/:user_id/comments/:page_num', getMycomment);
router.put('/posts', deleteMyposts);
router.put('/comments', deleteMycomments);

export default router;
