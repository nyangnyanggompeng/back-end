'use strict';
import express from 'express';
import callChatGPT from '../middleware/chatgpt.js';

const router = express.Router();

// import { User } from '../models/index.js';
// import loginUser from '../controller/users/loginUser.js';

router.get('/', (req, res) => {
  res.render('chatgpt', {}); // views 폴더 밑에 있는 파일을 참조함
});

router.post('/', async (req, res) => {
  const prompt = req.body.prompt;
  const response = await callChatGPT(prompt);
  if (response) {
    res.json(response);
    console.log('response send compelete');
  } else {
    console.log('error in routes/chatgpt');
    res.send('error in routes/chatgpt');
  }
});

export default router;
