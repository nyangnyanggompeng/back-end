import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';
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

/**
 * @swagger
 * /mypage/users:
 *   get:
 *     tags: [Mypage]
 *     summary: 전체 유저 목록 반환
 *     description: 전체 유저 목록 반환 (admin)
 *     responses:
 *       200:
 *         description: 전체 유저 목록 반환 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *               example:
 *                 - id: 8
 *                   isAdmin: true
 *                   username: test
 *                   domain: gmail.com
 *                   password: $2b$10$m/SqQbZxiDCR/Uarme5IA.wj70.nnFs.k72JeFqJOm8SLfP/Lu7ym
 *                   nickname: 냥냥곰펭
 *                   authEmail: false
 *                   useStatus: 1
 *                   createdAt: 2023-07-08T06:49:53.000Z
 *                   updatedAt: 2023-07-08T07:36:19.000Z
 *                   deletedAt: null
 *       500:
 *         description: 전체 유저 목록 반환 실패
 *         content:
 *            text/html:
 *              example: GET_USERLIST_FAILURE
 *       403:
 *         description: 접근 권한 없음
 *         content:
 *            text/html:
 *              example: NEED_AUTHORIZATION
 *       419:
 *         description: 토큰 유효 시간 초과
 *         content:
 *            text/html:
 *              example: TOKEN_EXPIRED
 *       401:
 *         description: 토큰 비밀 키 불일치
 *         content:
 *            text/html:
 *              example: INVALID_TOKEN
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         isAdmin:
 *           type: boolean
 *         username:
 *           type: string
 *         domain:
 *           type: string
 *         password:
 *           type: string
 *         nickname:
 *           type: string
 *         authEmail:
 *           type: boolean
 *         useStatus:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         deletedAt:
 *           type: string
 *           format: date-time
 */
router.get('/users', auth, adminAuth, userList);

/**
 * @swagger
 * /mypage/users/email_check:
 *   post:
 *     tags: [Mypage]
 *     summary: 이메일 인증
 *     description: 이메일 인증
 *     parameters:
 *       - in: body
 *         name: emailInfo
 *         description: 이메일 정보
 *         schema:
 *           type: object
 *           required:
 *             - emailId
 *           properties:
 *             emailId:
 *               type: string
 *               description: 사용자의 이메일 주소
 *           example:
 *             emailId: test@gmail.com
 *     responses:
 *       200:
 *         description: 이메일 인증 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 117223
 *       500:
 *         description: 이메일 인증 실패
 *         content:
 *            text/html:
 *              example: EMAIL_CHECK_FAILURE
 *       400:
 *         description: 필수 값 누락 혹은 해당 이메일을 가진 사용자가 없는 경우
 *         content:
 *            text/html:
 *              example: EMAIL_NOT_ENTERED / EMAIL_DOESNT_EXISTS
 */
router.post('/users/email_check', emailCheck);

/**
 * @swagger
 * /mypage/users:
 *   patch:
 *     tags: [Mypage]
 *     summary: 선택한 유저의 정보 수정
 *     description: 선택한 유저의 정보 수정(로그인한 유저와 admin만 수정 가능)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: 선택한 유저의 정보 수정 성공
 *         content:
 *            text/html:
 *              example: UPDATE_INFO_SUCCESS
 *       500:
 *         description: 선택한 유저의 정보 수정 실패
 *         content:
 *            text/html:
 *              example: UPDATE_INFO_FAILURE
 *       400:
 *         description: 입력 값 모두 누락, DB에 없는 유저, 혹은 유저 정보가 토큰 정보와 일치하지 않는 경우
 *         content:
 *            text/html:
 *              example: NICKNAME_OR_PROFILE_NOT_ENTERED
 *                     / NO_EXISTING_USER
 *                     / INVALID_USER
 */
router.patch('/users', auth, upload.single('image'), updateInfo);

/**
 * @swagger
 * /mypage/users/reset_password:
 *   patch:
 *     tags: [Mypage]
 *     summary: 선택한 유저의 비밀번호 변경
 *     description: 선택한 유저의 비밀번호 변경(로그인한 유저와 admin만 수정 가능)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: 현재 비밀번호
 *               password:
 *                 type: string
 *                 description: 새로운 비밀번호
 *               passwordVerify:
 *                 type: string
 *                 description: 새로운 비밀번호 검증
 *             example:
 *               currentPassword: Testpwd1
 *               password: Testpwd2
 *               passwordVerify: Testpwd2
 *     responses:
 *       200:
 *         description: 비밀번호 변경 성공
 *         content:
 *            text/html:
 *              example: RESET_PASSWORD_SUCCESS
 *       500:
 *         description: 비밀번호 변경 실패
 *         content:
 *            text/html:
 *              example: RESET_PASSWORD_FAILURE
 *       400:
 *         description: 필수 값 누락, 비밀번호 불일치, 현재 비밀번호 불일치, 현재 사용중인 비밀번호와 변경할 비밀번호가 같은 경우
 *                      혹은 비밀번호 유효성 검사 실패한 경우
 *         content:
 *            text/html:
 *              example: PASSWORD_OR_PASSWORD_VERIFY_NOT_ENTERED
 *                     / PASSWORD_NOT_MATCHED
 *                     / INVALID_CURRENT_PASSWORD
 *                     / CURRENT_USING_PASSWORD
 *                     / INVALID_FORM
 */
router.patch('/users/reset_password', auth, resetPassword);

/**
 * @swagger
 * /mypage/users:
 *   put:
 *     tags: [Mypage]
 *     summary: 유저 삭제
 *     description: 유저 삭제(로그인한 유저와 admin만 삭제 가능)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *             example:
 *               password: Testpwd2
 *     responses:
 *       200:
 *         description: 유저 삭제 성공
 *         content:
 *            text/html:
 *              example: DELETE_USER_SUCCESS
 *       500:
 *         description: 유저 삭제 실패
 *         content:
 *            text/html:
 *              example: DELETE_USER_FAILURE
 *       400:
 *         description: 필수 값 누락 혹은 DB 속 비밀번호와 불일치
 *         content:
 *            text/html:
 *              example: PASSWORD_NOT_ENTERED / INVALID_PASSWORD
 *       401:
 *         description: 권한이 없는 사용자가 접근했을 시
 *         content:
 *            text/html:
 *              example: UNAUTHORIZED
 */
router.put('/users', auth, deleteUser);

/**
 * @swagger
 * /mypage/set/bookmark/{page_num}:
 *   get:
 *     tags: [Mypage]
 *     summary: 해당 유저가 북마크한 대화 메시지를 보여주는 API
 *     parameters:
 *       - in: path
 *         name: page_num
 *         required: true
 *         description: 한 페이지 당 10개 댓글이 보이게 설정, 순서는 list_id 오름차순으로
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 북마크 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                  $ref: '#/components/schemas/Bookmark'
 *             examples:
 *                example1:
 *                 summary: 북마크한 내용이 있는 경우
 *                 value:
 *                  Content:
 *                    - id: 2
 *                      content: 1. 자기소개서에서 언급한 IT 기술의 발전과 관련하여 현재 학습 중이거나 관심 있는 기술은 무엇인가요? 이 기술을 어떻게 학습하고 활용하려고 계획하고 있나요?
 *                      listId: 1
 *                      ChatGPTList:
 *                         name: 대화목록1
 *                    - id: 3
 *                      content: 2. 팀 프로젝트에서의 소통 능력을 발휘하여 어떤 성과를 달성한 적이 있나요? 이를 통해 어떤 교훈을 얻었나요?
 *                      listId: 1
 *                      ChatGPTList:
 *                         name: 대화목록1
 *                  numberOfContent: 7
 *                  totalPages: 1
 *                example2:
 *                 summary: 북마크한 내용이 없는 경우
 *                 value:
 *                  Content: []
 *                  numberOfContent: 0
 *                  totalPages: 0
 *       500:
 *         description: 북마크 조회 실패
 *         content:
 *            text/html:
 *              example: GET_BOOKMARK_FAILURE
 *
 * components:
 *   schemas:
 *     Bookmark:
 *       type: object
 *       properties:
 *         Content:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                  type: integer
 *               content:
 *                  type: string
 *               listId:
 *                  type: integer
 *               ChatGPTList:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *         numberOfContent:
 *           type: integer
 *         totalPages:
 *           type: integer
 */
router.get('/set/bookmark/:page_num', auth, getBookmark);

/**
 * @swagger
 * /chatgpt/bookmark/{content_id}:
 *   patch:
 *     tags: [Mypage]
 *     summary: 북마크 생성 또는 삭제
 *     parameters:
 *      - in: path
 *        name: content_id
 *        required: true
 *        schema:
 *          type: integer
 *      - in: query
 *        name: isBookmarked
 *        required: true
 *        schema:
 *          type: boolean
 *     responses:
 *       200:
 *         description: 북마크 생성 또는 삭제 성공
 *         content:
 *            text/html:
 *              example: SET_BOOKMARK_SUCCESS
 *       500:
 *         description: 북마크 생성 또는 삭제 실패
 *         content:
 *            text/html:
 *              example: SET_BOOKMARK_FAILURE
 */
router.patch('/bookmark/:content_id', auth, setBookmark);

/**
 * @swagger
 * /mypage/posts/{page_num}:
 *   get:
 *     tags: [Mypage]
 *     summary: 내가 쓴 게시글 조회
 *     parameters:
 *       - in: path
 *         name: page_num
 *         required: true
 *         description: 페이지 번호
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 게시글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                  $ref: '#/components/schemas/Mypost'
 *             examples:
 *               example1:
 *                summary: 게시글이 있는 경우
 *                value:
 *                  Post:
 *                    - id: 6
 *                      writer: 냥냥곰펭
 *                      title: 아악
 *                      content: "***~~CORS 에러~~***\n하하"
 *                      createdAt: 2023-07-05T09:25:22.000Z
 *                    - id: 5
 *                      writer: 냥냥곰펭
 *                      title: 반갑습니다..
 *                      content: 1번유저가 글을 많이 쓰게 될 것 같네요 하하하
 *                      createdAt: 2023-07-05T09:10:17.000Z
 *                  numberOfMyPost: 6
 *                  totalPages: 1
 *               example2:
 *                summary: 게시글이 없는 경우
 *                value:
 *                  Post: []
 *                  numberOfMyPost: 0
 *                  totalPages: 0
 *       500:
 *         description: 게시글 조회 실패
 *         content:
 *            text/html:
 *              example: GET_MY_POST_FAILURE
 *
 * components:
 *   schemas:
 *     Mypost:
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
 *                  type: integer
 *               content:
 *                  type: string
 *               createdAt:
 *                  type: string
 *                  format: date-time
 *         numberOfMyPost:
 *           type: integer
 *         totalPages:
 *           type: integer
 */
router.get('/posts/:page_num', auth, getMypost);

/**
 * @swagger
 * /mypage/comments/{page_num}:
 *   get:
 *     tags: [Mypage]
 *     summary: 내가 쓴 댓글 조회
 *     parameters:
 *       - in: path
 *         name: page_num
 *         required: true
 *         description: 페이지 번호
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 댓글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                  $ref: '#/components/schemas/Comment'
 *             examples:
 *               example1:
 *                   summary: 댓글이 있는 경우
 *                   value:
 *                     Comment:
 *                       - id: 6
 *                         writer: 테스트ID
 *                         content: 댓글3입니다.
 *                         createdAt: 2023-07-11T13:54:46.000Z
 *                         postId: 3
 *                         Post:
 *                           title: 제목입니다.
 *                     numberOfMyComment: 1
 *                     totalPages: 1
 *               example2:
 *                   summary: 댓글이 없는 경우
 *                   value:
 *                     Comment: []
 *                     numberOfMyComment: 0
 *                     totalPages: 0
 *       500:
 *         description: 댓글 조회 실패
 *         content:
 *            text/html:
 *              example: GET_MY_COMMENT_FAILURE
 *
 * components:
 *   schemas:
 *     Comment:
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
 *               postId:
 *                  type: integer
 *               Post:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *         numberOfMyComment:
 *           type: integer
 *         totalPages:
 *           type: integer
 */
router.get('/comments/:page_num', auth, getMycomment);

/**
 * @swagger
 * /mypage/posts:
 *   put:
 *     tags: [Mypage]
 *     summary: 내가 쓴 게시글 삭제
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postIdList:
 *                 type: array
 *                 items:
 *                   type: integer
 *             example:
 *               postIdList: [9, 10]
 *     responses:
 *       200:
 *         description: 게시글 삭제 성공
 *         content:
 *            text/html:
 *              example: DELETE_MY_POST_SUCCESS
 *       400:
 *         description: 선택한 게시글이 없음
 *         content:
 *            text/html:
 *              example: EMPTY_POST_ID_LIST
 *       500:
 *         description: 게시글 삭제 실패
 *         content:
 *            text/html:
 *              example: DELETE_MY_POST_FAILURE
 */
router.put('/posts', auth, deleteMyposts);

/**
 * @swagger
 * /mypage/comments:
 *   put:
 *     tags: [Mypage]
 *     summary: 내가 쓴 댓글 삭제
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentIdList:
 *                 type: array
 *                 items:
 *                   type: integer
 *             example:
 *               commentIdList: [9, 10]
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공
 *         content:
 *            text/html:
 *              example: DELETE_MY_COMMENT_SUCCESS
 *       400:
 *         description: 선택한 댓글이 없음
 *         content:
 *            text/html:
 *              example: EMPTY_COMMENT_ID_LIST
 *       500:
 *         description: 댓글 삭제 실패
 *         content:
 *            text/html:
 *              example: DELETE_MY_COMMENT_FAILURE
 */
router.put('/comments', auth, deleteMycomments);

export default router;
