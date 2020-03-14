import listS3Objects from './listS3Objects';

const getS3ImagesList = async () => {
  let images = [];
  let hasData = true;
  let marker;

  do {
    // eslint-disable-next-line no-await-in-loop
    const data = await listS3Objects(marker);
    hasData = data.IsTruncated;
    images = [...images, ...data.Contents];
    marker = images.length ? images[images.length - 1].Key : undefined;
  } while (hasData);

  return images;
};

export default getS3ImagesList;
