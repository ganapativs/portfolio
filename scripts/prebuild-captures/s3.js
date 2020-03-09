import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const isProd = !process.env.NODE_ENV || process.env.NODE_ENV === 'production';

export const s3 = new AWS.S3();

export const params = {
  Bucket: isProd
    ? process.env.PHOTOGRAPHY_BUCKET
    : process.env.PHOTOGRAPHY_BUCKET_DEV,
};
