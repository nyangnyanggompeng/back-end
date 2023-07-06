'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import register from '../controller/signup/registerProcess.js';
import idCheck from '../controller/signup/idcheck.js';
import passwordCheck from '../controller/signup/passwordCheck.js';
import nicknameCheck from '../controller/signup/nicknameCheck.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('register', {}); // views 폴더 밑에 있는 파일을 참조함
});

router.post('/register_process', register.registerProcess);
router.post('/idcheck', idCheck.idCheck);
router.post('/password_check', passwordCheck.passwordCheck);
router.post('/nickname_check', nicknameCheck.nicknameCheck)

export default router;