import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2'
});

let S3 = new AWS.S3();

const deleteImage = (file, next) => {
  let params = {
    Bucket: 'nyangnyanggompeng',
    Key: `${file}`
  };

  try {
    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log('[ERROR] try - ', err);
      }
    });
    return 'success';
  } catch (err) {
    console.log('[ERROR] catch - ', err);
    return null;
  }
};

export default deleteImage;
