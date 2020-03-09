import './defineEnv';
import getS3ImagesList from './getS3ImagesList';
import getS3Images from './getS3Image';
import resizeAndWrite from './resizeAndWrite';
import prepare from './prepare';
import { batchSize } from './constants';
import getImagesMeta from './getImagesMeta';
import getImagesProminentColors from './getImagesProminentColors';
import getArrayChunks from './getArrayChunks';
import sortAndWritePagination from './sortAndWritePagination';

/**
- Use these json in gatsby build
- Refactor captures page
    - Remove meta from image, only show in modal
    - Show blurry image till actual image is loaded
*/
(async () => {
  // Cleanup folder and create if needed
  prepare();

  // Fetch images list from S3
  const images = await getS3ImagesList();
  const imagesList = images.map(t => t.Key);
  const imagesMeta = [];
  const imagesProminentColors = [];

  // Split images into batches
  const batch = getArrayChunks(imagesList, batchSize);

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < batch.length; i += 1) {
    const imagesToGet = batch[i];

    // Fetch images from S3 as buffers
    const imageBuffers = await getS3Images(imagesToGet);

    // Resize and write original and thumbnail images
    await resizeAndWrite(imagesToGet, imageBuffers);

    // Extract meta information from images
    const meta = await getImagesMeta(imagesToGet);
    imagesMeta.push(...meta);

    // Extract prominent colors from the image to show as placeholder in the UI
    const prominentColors = await getImagesProminentColors(imagesToGet);
    imagesProminentColors.push(...prominentColors);
  }

  // Sort images based on capture date and write pagination json files
  sortAndWritePagination(imagesList, imagesMeta, imagesProminentColors);
})();
