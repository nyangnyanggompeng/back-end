import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
// import AWS from 'aws-sdk';

import indexRouter from './routes/index.js';
import db from './models/index.js';
import cookieParser from 'cookie-parser';
import specs from './swagger/swagger.js';
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
    extended: false
  })
);

app.use(cookieParser());
// app.use(cors({ credentials: true, origin: '*' }));

// const domains = ['http://localhost:5173'];

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true
// };
// app.use(cors(corsOptions));

// app.use('/', indexRouter);

app.use(
  '/api',
  (req, res, next) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://interviewlab.site'
    ];
    const origin = req.headers.origin;
    console.log('origin :', origin);
    if (allowedOrigins.indexOf(origin) !== -1) {
      res.header('Access-Control-Allow-Origin', origin);
    } else {
      res.header('Access-Contorl-Allow-Origin', 'http://localhost:5173');
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
    res.header('Access-Control-Expose-Headers', 'Authorization');
    next();
  },
  indexRouter
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} 찾을 수 없음`);
  err.status = 404;
  req.message = 'PAGE_FIND';
  next(err);
});

app.get('/', (req, res) => {
  return res.render('test', {}); // views 폴더 밑에 있는 파일을 참조함
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log(`[Error] ${err}`);
  res.send(`${req.message}_FAILURE`);
  // res.send(`${err.status} Error`);
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`${process.env.PORT}번 포트로 연결되었습니다.`);
});

export default app;
