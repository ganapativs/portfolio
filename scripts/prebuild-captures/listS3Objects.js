// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjects-property
import { s3, params } from './s3';

export default (Marker, MaxKeys = 10) => {
  return new Promise((resolve, reject) => {
    s3.listObjects({ ...params, Marker, MaxKeys }, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
};
