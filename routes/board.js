'use strict';
import express from 'express';

import getPost from '../controller/board/getPost.js';
import postPost from '../controller/board/postPost.js';
import updatePost from '../controller/board/updatePost.js';
import deletePost from '../controller/board/deletePost.js';
import getPostlist from '../controller/board/getPostlist.js';
import getCommentlist from '../controller/board/getCommentlist.js';
import postComment from '../controller/board/postComment.js';
import updateComment from '../controller/board/updateComment.js';
import deleteComment from '../controller/board/deleteComment.js';

const router = express.Router();

router.get('/:page_num', getPostlist); // localhost:5000/api/board/:page_num
router.get('/:post_id', getPost); // localhost:5000/api/board/:post_id
router.post('/:user_id', postPost); // localhost:5000/api/board/:user_id
router.post('/:post_id', updatePost); // localhost:5000/api/board/:post_id
router.put('/:post_id', deletePost); // localhost:5000/api/board/:post_id

router.get('/:post_id/comment', getCommentlist); // localhost:5000/api/board/:post_id/comment
router.post('/:post_id/comment/:user_id', postComment); // localhost:5000/api/board/:post_id/comment/:user_id
router.post('/:post_id/comment/update/:comment_id', updateComment); // localhost:5000/api/board/:post_id/comment/:comment_id
router.put('/:post_id/comment/:comment_id', deleteComment); // localhost:5000/api/board/:post_id/comment/:comment_id

export default router;
