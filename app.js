import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
// import cookieParser from "cookie-parser";
import indexRouter from './routes/index.js';
import db from './models/index.js';
dotenv.config();

const app = express();
app.set('view engine', 'ejs'); // view 엔진을 ejs를 쓰겠다는 설정

db.sequelize
  .sync({ force: false }) // 서버 실행시 MySQL 과 연동되도록 하는 sync 메서드
  // force : true 로 해놓으면 서버 재시작마다 테이블이 재생성됨. 테이블을 잘못 만든 경우에 true 로 설정
  .then(() => {
    console.log('데이터 베이스 연결 성공');
  })
  .catch(err => {
    console.log(err);
  });


app.use(morgan('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// app.use(cookieParser(process.env.SECERET_COOKIE))
app.use(
  cors({
    orogin: '*'
  })
);

app.use('/api', indexRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 찾을 수 없음`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`${process.env.PORT}번 포트로 연결되었습니다.`);
});

export default app;
