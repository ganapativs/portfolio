/** For some reason gatsby-plugin-sharp breaks with project level sharp dependency */
// eslint-disable-next-line import/no-extraneous-dependencies
import sharp from 'sharp';
import {
  outputFolder,
  maxImageDimensions,
  previewImageDimensions,
} from './constants';

const resizeAndWrite = (keys = [], imageBuffers = []) => {
  const promises = [];

  for (let i = 0; i < keys.length; i += 1) {
    promises.push(
      new Promise(resolve => {
        // Store original image
        sharp(imageBuffers[i].Body)
          .resize(maxImageDimensions.width, maxImageDimensions.height, {
            fit: 'inside',
          })
          .withMetadata()
          .toFile(`${outputFolder}/${keys[i]}`)
          .then(() => {
            // Store preview image
            sharp(imageBuffers[i].Body)
              .resize(
                previewImageDimensions.width,
                previewImageDimensions.height,
                {
                  fit: 'inside',
                },
              )
              .toFile(`${outputFolder}/preview/${keys[i]}`)
              .then(() => {
                resolve();
              });
          });
      }),
    );
  }

  return Promise.all(promises);
};

export default resizeAndWrite;
