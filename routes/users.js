'use strict';
import express from 'express';
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', {}); // views 폴더 밑에 있는 파일을 참조함
});

router.get('/auth', (req, res) => {
  res.render('auth', {});
});

router.get('/logout', (req, res) => {
  res.render('logout', {});
});

// router.get('/', (req, res) => {
//   // res.render('', {}); // views 폴더 밑에 있는 파일을 참조함
// });

export default router;