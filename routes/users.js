import express from 'express';
const router = express.Router();

import cookieParser from 'cookie-parser';

import loginUser from '../controller/login/loginUser.js';
import refreshToken from '../controller/login/refreshToken.js';
import logoutUser from '../controller/login/logoutUser.js';

import auth from '../middleware/auth.js';

router.use(cookieParser());

router.get('/auth', auth, (req, res) => {
  console.log(req.decoded);
  return res.status(200).send(req.decoded);
});

router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/refresh', refreshToken);

export default router;
