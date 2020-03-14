import { batchSize } from './constants';
import getArrayChunks from './getArrayChunks';
import writePagination from './writePagination';

const sortAndWritePagination = (
  imagesList,
  imagesMeta,
  imagesProminentColors,
) => {
  const images = imagesList.map((Key, index) => {
    const {
      exif: { DateTimeOriginal, PixelXDimension, PixelYDimension },
      geolocation: { Label },
    } = imagesMeta[index];
    return {
      src: `/captures/${Key}`,
      preview: `/captures/preview/${Key}`,
      prominentColors: imagesProminentColors[index],
      width: PixelXDimension,
      height: PixelYDimension,
      exif: { DateTimeOriginal, Label },
    };
  });

  // Sort images based on created date
  const sortedImages = images.sort(
    (a, b) => b.exif.DateTimeOriginal - a.exif.DateTimeOriginal,
  );

  // Write pagination json
  const batch = getArrayChunks(sortedImages, batchSize);
  for (let i = 0; i < batch.length; i += 1) {
    writePagination(batch[i], i + 1, batch.length);
  }
};

export default sortAndWritePagination;
