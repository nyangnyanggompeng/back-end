import multer from 'multer';
import path from 'path';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2'
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'nyangnyanggompeng',
    acl: 'public-read',
    key(req, file, cb) {
      cb(null, `post/${+new Date()}${path.basename(file.originalname)}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

export default upload;
