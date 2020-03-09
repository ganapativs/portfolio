import ColorThief from 'colorthief';
import { outputFolder } from './constants';

const getImagesProminentColors = (images = []) => {
  const promises = [];

  for (let i = 0; i < images.length; i += 1) {
    promises.push(
      new Promise((resolve, reject) => {
        const image = `${outputFolder}/${images[i]}`;

        // https://lokeshdhakar.com/projects/color-thief/#api
        ColorThief.getPalette(image, 2)
          .then(resolve)
          .catch(reject);
      }),
    );
  }

  return Promise.all(promises);
};

export default getImagesProminentColors;
