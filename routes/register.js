import express from 'express';
const router = express.Router();

import registerProcess from '../controller/signup/registerProcess.js';
import idCheck from '../controller/signup/idcheck.js';
import passwordCheck from '../controller/signup/passwordCheck.js';
import nicknameCheck from '../controller/signup/nicknameCheck.js';
import emailCheck from '../controller/signup/emailCheck.js';
import sendEmail from '../controller/signup/sendEmail.js';

router.get('/', (req, res) => {
  res.render('register', {}); // views 폴더 밑에 있는 파일을 참조함
});

/**
 * @swagger
 * /register/register_process:
 *   post:
 *     summary: 사용자 생성
 *     tags: [Register]
 *     parameters:
 *       - in: body
 *         name: userInfo
 *         description: 사용자 생성 정보
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - domain
 *             - password
 *             - passwordVerify
 *             - nickname
 *           properties:
 *             username:
 *               type: string
 *               description: 사용자의 이메일 주소의 아이디 부분
 *             domain:
 *               type: string
 *               description: 이메일 주소의 도메인 부분
 *             password:
 *               type: string
 *               description: 사용자의 비밀번호
 *             passwordVerify:
 *               type: string
 *               description: 비밀번호 확인
 *             nickname:
 *               type: string
 *               description: 사용자의 닉네임
 *           example:
 *             username: test
 *             domain:  gmail.com
 *             password: Testpwd1
 *             passwordVerify: Testpwd1
 *             nickname: 냥냥곰펭
 *     responses:
 *       200:
 *         description: 사용자 생성 성공
 *         content:
 *            text/html:
 *              example: USER_CREATED
 *       400:
 *         description: 필수 값 누락, 중복된 이메일, 중복된 닉네임, 비밀번호 유효성 검사 실패, 비밀번호 불일치
 *         content:
 *            text/html:
 *              example: EMAIL_OR_PASSWORD_OR_NICKNAME_NOT_ENTERED
 *                     / EMAIL_ALREADY_EXISTS
 *                     / NICKNAME_ALREADY_EXISTS
 *                     / INVALID_PASSWORD
 *                     / PASSWORD_NOT_MATCH
 *       500:
 *         description: 사용자 생성 실패
 *         content:
 *            text/html:
 *              example: USER_CREATED_FAILURE
 */
router.post('/register_process', registerProcess);

/**
 * @swagger
 * /register/idcheck:
 *   post:
 *     summary: 아이디 중복 체크
 *     tags: [Register]
 *     parameters:
 *       - in: body
 *         name: emailInfo
 *         description: 중복 체크할 이메일 정보
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - domain
 *           properties:
 *             username:
 *               type: string
 *               description: 사용자의 이메일 주소의 아이디 부분
 *             domain:
 *               type: string
 *               description: 이메일 주소의 도메인 부분
 *           example:
 *             username: test
 *             domain: gmail.com
 *     responses:
 *       200:
 *         description: 아이디 중복 체크 성공.
 *         content:
 *            text/html:
 *              example: AVAILABLE_EMAIL
 *       400:
 *         description: 필수 값 누락, 중복된 이메일
 *         content:
 *            text/html:
 *              example: EMAIL_NOT_ENTERED / EMAIL_ALREADY_EXISTS
 *       500:
 *         description: 아이디 중복 체크 실패
 *         content:
 *            text/html:
 *              example: EMAIL_CHECK_FAILURE
 */
router.post('/idcheck', idCheck);

/**
 * @swagger
 * /register/password_check:
 *   post:
 *     summary: 비밀번호 유효성 체크
 *     tags: [Register]
 *     parameters:
 *       - in: body
 *         name: passwordInfo
 *         description: 검사할 비밀번호 정보
 *         schema:
 *           type: object
 *           required:
 *             - password
 *             - passwordVerify
 *           properties:
 *             password:
 *               type: string
 *               description: 사용자의 비밀번호
 *             passwordVerify:
 *               type: string
 *               description: 비밀번호 확인
 *           example:
 *             password: Test123!@
 *             passwordVerify: Test123!@
 *     responses:
 *       200:
 *         description: 비밀번호 유효성 검사 성공.
 *         content:
 *            text/html:
 *              example: VAILD_PASSWORD
 *       400:
 *         description: 필수 값 누락, 서버 유효성 검사 실패, 비밀번호 불일치
 *         content:
 *            text/html:
 *              example: PASSWORD_OR_PASSWORD_VERIFY_NOT_ENTERED
 *                     / INVALID_FORM
 *                     / PASSWORD_NOT_MATCH
 *       500:
 *         description: 비밀번호 유효성 검사 실패
 *         content:
 *            text/html:
 *              example: PASSWORD_CHECK_FAILURE
 */
router.post('/password_check', passwordCheck);

/**
 * @swagger
 * /register/nickname_check:
 *   post:
 *     summary: 닉네임 중복 체크
 *     tags: [Register]
 *     parameters:
 *       - in: body
 *         name: nicknameInfo
 *         description: 검사할 닉네임 정보
 *         schema:
 *           type: object
 *           required:
 *             - nickname
 *           properties:
 *             nickname:
 *               type: string
 *               description: 사용자의 닉네임
 *           example:
 *             nickname: 냥냥곰펭
 *     responses:
 *       200:
 *         description: 닉네임 중복 체크 성공
 *         content:
 *            text/html:
 *              example: AVAILABLE_NICKNAME
 *       400:
 *         description: 필수 값 누락 또는 중복된 닉네임
 *         content:
 *            text/html:
 *              example: NICKNAME_NOT_ENTERED / NICKNAME_ALREADY_EXISTS
 *       500:
 *         description: 닉네임 중복 체크 실패
 *         content:
 *            text/html:
 *              example: NICKNAME_CHECK_FAILURE
 */
router.post('/nickname_check', nicknameCheck);

/**
 * @swagger
 * /register/send_email:
 *   post:
 *     summary: 이메일 인증 번호 전송
 *     tags: [Register]
 *     parameters:
 *       - in: body
 *         name: emailInfo
 *         description: 메일 보낼 주소 정보
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - domain
 *           properties:
 *             username:
 *               type: string
 *               description: 사용자의 이메일 주소의 아이디 부분
 *             domain:
 *               type: string
 *               description: 이메일 주소의 도메인 부분
 *           example:
 *             username: test
 *             domain:  gmail.com
 *     responses:
 *       200:
 *         description: 메일 전송 성공
 *         content:
 *            text/html:
 *              example: SEND_EMAIL_SUCCESS
 *       400:
 *         description: 필수 값 누락
 *         content:
 *            text/html:
 *              example: EMAIL_NOT_ENTERED
 *       500:
 *         description: 메일 전송 실패
 *         content:
 *            text/html:
 *              example: SEND_EMAIL_FAILURE
 */
router.post('/send_email', sendEmail);

/**
 * @swagger
 * /register/email_check:
 *   post:
 *     summary: 이메일 인증 번호 체크
 *     tags: [Register]
 *     parameters:
 *       - in: body
 *         name: authNumber
 *         description: 인증 번호
 *         schema:
 *           type: object
 *           required:
 *             - authNumber
 *           properties:
 *             authNumber:
 *               type: string
 *               description: 인증 번호
 *           example:
 *             authNumber: 123456
 *     responses:
 *       200:
 *         description: 인증 성공
 *         content:
 *            text/html:
 *              example: AVAILABLE_EMAIL
 *       400:
 *         description: 인증 성공 후 인증한 이메일이 탈퇴한 회원의 이메일인 경우, 인증 성공 후 인증한 이메일이 DB에 존재하는 경우, 필수 값 누락 시
 *         content:
 *            text/html:
 *              example: DELETED_USER
 *                     / EMAIL_ALREADY_EXISTS
 *                     / AUTHENTICATION_NUMBER_NOT_ENTERED
 *       401:
 *         description: 인증 번호가 일치하지 않는 경우 (인증 실패), 인증 번호가 담긴 쿠키가 없는 경우
 *         content:
 *           text/html:
 *             example: AUTHENTICATION_FAILURE
 *                    / NO_COOKIES
 *       500:
 *         description: 이메일 인증 과정 중 오류 발생 시
 *         content:
 *            text/html:
 *              example: EMAIL_CHECK_FAILURE
 */
router.post('/email_check', emailCheck);

export default router;
