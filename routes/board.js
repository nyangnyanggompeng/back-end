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

import auth from '../middleware/auth.js';

/**
 * @swagger
 * /board/{page_num}:
 *   get:
 *     tags: [Board]
 *     summary: 페이지 별 해당 게시글 목록 전송
 *     parameters:
 *       - in: path
 *         name: page_num
 *         required: true
 *         description: 페이지 번호
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 게시글 목록 조회 성공 시
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                  $ref: '#/components/schemas/Board'
 *             examples:
 *               example1:
 *                   summary: 게시글이 있는 경우
 *                   value:
 *                     Post:
 *                       - id: 7
 *                         writer: 해리
 *                         title: 제목1입니다.
 *                         numOfComment: 0
 *                         createdAt: 2023-07-06T20:17:10.000Z
 *                         userId: 2
 *                       - id: 6
 *                         writer: 냥냥곰펭
 *                         title: 아악
 *                         numOfComment: 0
 *                         createdAt: 2023-07-05T09:25:22.000Z
 *                         userId: 1
 *                     numberOfPost: 7
 *                     totalPages: 2
 *               example2:
 *                   summary: 게시글이 없는 경우
 *                   value:
 *                     Post: []
 *                     numberOfPost: 0
 *                     totalPages: 0
 *       500:
 *         description: 댓글 조회 실패
 *         content:
 *            text/html:
 *              example: GET_MY_COMMENT_FAILURE
 *
 * components:
 *   schemas:
 *     Board:
 *       type: object
 *       properties:
 *         Post:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                  type: integer
 *               writer:
 *                  type: string
 *               title:
 *                  type: string
 *               numOfComment:
 *                  type: integer
 *               createdAt:
 *                  type: string
 *                  format: date-time
 *               userId:
 *                  type: integer
 *         numberOfPost:
 *           type: integer
 *         totalPages:
 *           type: integer
 */
router.get('/:page_num', auth, getPostlist); // localhost:5000/api/board/:page_num

/**
 * @swagger
 * /board/posts/{post_id}:
 *   get:
 *     tags: [Board]
 *     summary: 해당 게시글 조회
 *     parameters:
 *      - in: path
 *        name: post_id
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                   type: integer
 *                writer:
 *                   type: string
 *                title:
 *                   type: string
 *                content:
 *                   type: string
 *                createdAt:
 *                   type: string
 *                userId:
 *                   type: integer
 *              example:
 *                id: 1
 *                writer: 냥냥곰펭
 *                title: 제목1입니다.
 *                content: 내용1입니다.
 *                createdAt: 2023-07-05T02:13:48.000Z
 *                userId: 1
 *       500:
 *         description: 게시글 조회 실패
 *         content:
 *            text/html:
 *              example: POST_GET_FAILURE
 */
router.get('/posts/:post_id', auth, getPost); // localhost:5000/api/board/posts/:post_id/

/**
 * @swagger
 * /board:
 *   post:
 *     summary: 게시글 등록
 *     tags: [Board]
 *     parameters:
 *       - in: body
 *         name: postInfo
 *         description: 제목과 내용
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - content
 *           properties:
 *             title:
 *               type: string
 *             content:
 *               type: string
 *           example:
 *             title: 제목입니다.1
 *             content:  내용입니다.1
 *     responses:
 *       200:
 *         description: 게시글 등록 성공
 *         content:
 *            text/html:
 *              example: POST_POST_SUCCESS
 *       400:
 *         description: 필수 값 누락
 *         content:
 *            text/html:
 *              example: TITLE_OR_CONTENT_NO_ENTERED
 *       500:
 *         description: 게시글 등록 실패
 *         content:
 *            text/html:
 *              example: POST_POST_FAILURE
 */
router.post('/', auth, postPost); // localhost:5000/api/board/:user_id

/**
 * @swagger
 * /board/{post_id}:
 *   patch:
 *     tags: [Board]
 *     summary: 선택한 게시글 수정
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: 게시글 번호
 *         schema:
 *           type: integer
 *       - in: body
 *         name: postInfo
 *         description: 제목과 내용
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - content
 *           properties:
 *             title:
 *               type: string
 *             content:
 *               type: string
 *           example:
 *             title: 제목입니다.
 *             content:  내용입니다.
 *     responses:
 *       200:
 *         description: 게시글 등록 성공
 *         content:
 *            text/html:
 *              example: UPDATE_POST_SUCCESS
 *       500:
 *         description: 게시글 등록 실패
 *         content:
 *            text/html:
 *              example: UPDATE_POST_FAILURE
 *       400:
 *         description: 필수값 누락 및 해당 게시글 없을 경우
 *         content:
 *            text/html:
 *              example: TITLE_OR_CONTENT_NO_ENTERED / POST_DOESNT_EXIST
 *       401:
 *         description: 해당 게시글을 작성한 유저 또는 admin이 아닌 경우
 *         content:
 *            text/html:
 *              example: NO_PERMISSIONS
 */
router.patch('/:post_id', auth, updatePost); // localhost:5000/api/board/:post_id

/**
 * @swagger
 * /board/{post_id}:
 *   put:
 *     tags: [Board]
 *     summary: 선택한 게시글 삭제
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: 게시글 번호
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 게시글 삭제 성공
 *         content:
 *            text/html:
 *              example: POST_DELETE_SUCCESS
 *       500:
 *         description: 게시글 삭제 실패
 *         content:
 *            text/html:
 *              example: POST_DELETE_FAILURE
 *       400:
 *         description: 해당 게시글 없을 경우
 *         content:
 *            text/html:
 *              example: POST_DOESNT_EXIST
 *       401:
 *         description: 해당 게시글을 작성한 유저 또는 admin이 아닌 경우
 *         content:
 *            text/html:
 *              example: NO_PERMISSIONS
 */
router.put('/:post_id', auth, deletePost); // localhost:5000/api/board/:post_id

/**
 * @swagger
 * /board/{post_id}/comments/{page_num}:
 *   get:
 *     tags: [Board]
 *     summary: 해당 댓글 조회
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: 게시글 번호
 *         schema:
 *           type: integer
 *       - in: path
 *         name: page_num
 *         required: true
 *         description: 페이지 번호
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 댓글 조회 성공 시
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                  $ref: '#/components/schemas/BoardComment'
 *             examples:
 *               example1:
 *                   summary: 댓글이 있는 경우
 *                   value:
 *                     Comment:
 *                       - id: 7
 *                         writer: 냥냥
 *                         content: 댓글3입니다.
 *                         createdAt: 2023-07-06T20:17:10.000Z
 *                         userId: 1
 *                     numberOfComment: 7
 *                     totalPages: 2
 *               example2:
 *                   summary: 댓글이 없는 경우
 *                   value:
 *                     Comment: []
 *                     numberOfComment: 0
 *                     totalPages: 0
 *       400:
 *         description: 댓글 조회 실패
 *         content:
 *            text/html:
 *              example: COMMENT_GET_FAILURE
 *
 * components:
 *   schemas:
 *     BoardComment:
 *       type: object
 *       properties:
 *         Comment:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                  type: integer
 *               writer:
 *                  type: string
 *               content:
 *                  type: string
 *               createdAt:
 *                  type: string
 *                  format: date-time
 *               userId:
 *                  type: integer
 *         numberOfComment:
 *           type: integer
 *         totalPages:
 *           type: integer
 */
router.get('/:post_id/comments/:page_num', auth, getComment); // localhost:5000/api/board/:post_id/comments

/**
 * @swagger
 * /board/{post_id}/comments:
 *   post:
 *     tags: [Board]
 *     summary: 해당 게시글에 댓글 등록하기
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: 게시글 번호
 *         schema:
 *           type: integer
 *       - in: body
 *         name: contentInfo
 *         description: 내용
 *         schema:
 *           type: object
 *           required:
 *             - content
 *           properties:
 *             content:
 *               type: string
 *           example:
 *             content: 2월25일 두 번째 글의 첫 번째 댓글입니다.
 *     responses:
 *       200:
 *         description: 댓글 등록 성공
 *         content:
 *            text/html:
 *              example: POST_COMMENT_SUCCESS
 *       500:
 *         description: 댓글 조회 실패
 *         content:
 *            text/html:
 *              example: POST_COMMENT_FAILURE
 *       400:
 *         description: 필수 값이 없거나 댓글을 등록할 게시글이 없는 경우
 *         content:
 *            text/html:
 *              example: CONTENT_NO_ENTERED / POST_DOESNT_EXIST
 */
router.post('/:post_id/comments', auth, postComment); // localhost:5000/api/board/:post_id/comments/:user_id

/**
 * @swagger
 * /board/{post_id}/comments/{comment_id}:
 *   patch:
 *     tags: [Board]
 *     summary: 해당 게시글의 해당 댓글 수정
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: 게시글 번호
 *         schema:
 *           type: integer
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: 댓글 번호
 *         schema:
 *           type: integer
 *       - in: body
 *         name: contentInfo
 *         description: 내용
 *         schema:
 *           type: object
 *           required:
 *             - content
 *           properties:
 *             content:
 *               type: string
 *           example:
 *             content: 새로운 댓글입니다.
 *     responses:
 *       200:
 *         description: 댓글 수정 성공
 *         content:
 *            text/html:
 *              example: UPDATE_COMMENT_SUCCESS
 *       500:
 *         description: 댓글 수정 실패
 *         content:
 *            text/html:
 *              example: UPDATE_COMMENT_FAILURE
 *       400:
 *         description: 필수 값이 없거나 해당 댓글이 없을 경우
 *         content:
 *            text/html:
 *              example: CONTENT_NO_ENTERED / COMMENT_DOESNT_EXIST
 *       401:
 *         description: 해당 댓글을 작성한 유저 또는 admin이 아닌 경우
 *         content:
 *            text/html:
 *              example: NO_PERMISSIONS
 */
router.patch('/:post_id/comments/:comment_id', auth, updateComment); // localhost:5000/api/board/:post_id/comments/:comment_id

/**
 * @swagger
 * /board/{post_id}/comments/{comment_id}:
 *   put:
 *     tags: [Board]
 *     summary: 해당 게시글의 댓글 삭제
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공
 *         content:
 *            text/html:
 *              example: COMMENT_DELETE_SUCCESS
 *       500:
 *         description: 댓글 삭제 실패
 *         content:
 *            text/html:
 *              example: COMMENT_DELETE_FAILURE
 */
router.put('/:post_id/comments/:comment_id', auth, deleteComment); // localhost:5000/api/board/:post_id/comments/:comment_id

export default router;
