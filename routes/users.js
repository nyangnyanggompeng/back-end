'use strict';
import express from 'express';
import loginUser from '../controller/loginUser.js';
// import { User } from '../models/index.js';
const router = express.Router();

router.post('/login', (req, res) => {
  res.render('login', {}); // views 폴더 밑에 있는 파일을 참조함
  res.redirect('/');
});

router.get('/auth', (req, res) => {
  res.render('auth', {});
});

router.get('/logout', (req, res) => {
  res.render('logout', {});
});

// router.get('/', loginUser.);

export default router;