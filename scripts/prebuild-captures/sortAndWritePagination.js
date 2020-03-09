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
      exif: { DateTimeOriginal },
      geolocation: { Label },
    } = imagesMeta[index];
    return {
      src: `/captures/${Key}`,
      preview: `/captures/preview/${Key}`,
      prominentColors: imagesProminentColors[index],
      exif: { DateTimeOriginal, Label },
    };
  });
  const sortedImages = images.sort(
    (a, b) => b.exif.DateTimeOriginal - a.exif.DateTimeOriginal,
  );
  const batch = getArrayChunks(sortedImages, batchSize);
  for (let i = 0; i < batch.length; i += 1) {
    const isLast = i === batch.length - 1;
    writePagination(batch[i], i, isLast);
  }
};

export default sortAndWritePagination;
