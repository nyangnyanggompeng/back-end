import express from 'express';
const router = express.Router();

import getPostlist from '../controller/board/getPostlist.js';

import getPost from '../controller/board/getPost.js';
import postPost from '../controller/board/postPost.js';
import updatePost from '../controller/board/updatePost.js';
import deletePost from '../controller/board/deletePost.js';

import getComment from '../controller/board/getComment.js';
import postComment from '../controller/board/postComment.js';
import updateComment from '../controller/board/updateComment.js';
import deleteComment from '../controller/board/deleteComment.js';

router.get('/:page_num', getPostlist); // localhost:5000/api/board/:page_num

router.get('/posts/:post_id', getPost); // localhost:5000/api/board/posts/:post_id/
router.post('/:user_id', postPost); // localhost:5000/api/board/:user_id
router.patch('/:post_id', updatePost); // localhost:5000/api/board/:post_id
router.put('/:post_id', deletePost); // localhost:5000/api/board/:post_id

router.get('/:post_id/comments/:page_num', getComment); // localhost:5000/api/board/:post_id/comments
router.post('/:post_id/comments/:user_id', postComment); // localhost:5000/api/board/:post_id/comments/:user_id
router.patch('/:post_id/comments/:comment_id', updateComment); // localhost:5000/api/board/:post_id/comments/:comment_id
router.put('/:post_id/comments/:comment_id', deleteComment); // localhost:5000/api/board/:post_id/comments/:comment_id

export default router;
