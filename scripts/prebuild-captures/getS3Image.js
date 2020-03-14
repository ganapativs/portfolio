import { s3, params } from './s3';

const getS3Images = (keys = []) => {
  const promises = [];

  for (let i = 0; i < keys.length; i += 1) {
    promises.push(
      new Promise((resolve, reject) => {
        s3.getObject({ ...params, Key: keys[i] }, (err, data) => {
          if (err) return reject(err);

          return resolve(data);
        });
      }),
    );
  }

  return Promise.all(promises);
};

export default getS3Images;
