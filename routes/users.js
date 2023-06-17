'use strict';
import express from 'express';
const router = express.Router();

// import { User } from '../models/index.js';
// import loginUser from '../controller/users/loginUser.js';

router.get('/login', (req, res) => {
  res.render('login', {}); // views 폴더 밑에 있는 파일을 참조함
});

export default router;
