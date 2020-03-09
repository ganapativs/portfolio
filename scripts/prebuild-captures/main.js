/* eslint-disable no-console */
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
import hashAndRenameImages from './hashAndRenameImages';

/**
- Use these json in gatsby build
- Refactor captures page
    - Remove meta from image, only show in modal
    - Show blurry image till actual image is loaded
*/
(async () => {
  try {
    console.time('prebuild-images');
    // Cleanup folder and create if needed
    console.log('Preparing...');
    prepare();

    // Fetch images list from S3
    console.log('Fetching images list from S3');
    const images = await getS3ImagesList();
    const imagesList = images.map(t => t.Key);
    const imagesMeta = [];
    const imagesProminentColors = [];
    console.log('Total images found in S3: ', imagesList.length);

    // Split images into batches
    const batch = getArrayChunks(imagesList, batchSize);
    console.log('Batch size: ', batchSize);
    console.log('Total image batches: ', batch.length);

    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < batch.length; i += 1) {
      const imagesToGet = batch[i];

      // Fetch images from S3 as buffers
      console.log('Fetching images for batch: ', i + 1);
      const imageBuffers = await getS3Images(imagesToGet);

      // Resize and write original and thumbnail images
      console.log('Writing original and preview images for batch: ', i + 1);
      await resizeAndWrite(imagesToGet, imageBuffers);

      // Extract meta information from images
      console.log('Retrieving meta information for images of batch: ', i + 1);
      const meta = await getImagesMeta(imagesToGet);
      imagesMeta.push(...meta);

      // Extract prominent colors from the image to show as placeholder in the UI
      console.log('Getting prominent colors info for images of batch: ', i + 1);
      const prominentColors = await getImagesProminentColors(imagesToGet);
      imagesProminentColors.push(...prominentColors);
    }

    console.log('Computing hashes of images and renaming');
    const hashedImagesList = await hashAndRenameImages(imagesList);

    // Sort images based on capture date and write pagination json files
    console.log('Sorting images and writing pagination data');
    sortAndWritePagination(hashedImagesList, imagesMeta, imagesProminentColors);

    console.log('Done with building image previews');
  } catch (err) {
    console.error(err.message);
    throw err;
  } finally {
    console.timeEnd('prebuild-images');
  }
})();
