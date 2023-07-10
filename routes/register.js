import express from 'express';
const router = express.Router();

import registerProcess from '../controller/signup/registerProcess.js';
import idCheck from '../controller/signup/idcheck.js';
import passwordCheck from '../controller/signup/passwordCheck.js';
import nicknameCheck from '../controller/signup/nicknameCheck.js';

router.get('/', (req, res) => {
  res.render('register', {}); // views 폴더 밑에 있는 파일을 참조함
});

router.post('/register_process', registerProcess);
router.post('/idcheck', idCheck);
router.post('/password_check', passwordCheck);
router.post('/nickname_check', nicknameCheck);

export default router;
