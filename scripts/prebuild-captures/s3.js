import AWS from 'aws-sdk';
import { isProd } from './constants';

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

export const s3 = new AWS.S3();

export const params = {
  Bucket: isProd
    ? process.env.PHOTOGRAPHY_BUCKET_DEV
    : process.env.PHOTOGRAPHY_BUCKET_DEV,
};
