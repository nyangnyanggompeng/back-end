'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import controller from '../controller/signUp.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('signup', {}); // views 폴더 밑에 있는 파일을 참조함
});

router.post('/register_process', controller.registerProcess);
router.post('/idcheck', controller.idCheck);

export default router;