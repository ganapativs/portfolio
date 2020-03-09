import fs from 'fs-extra';
import { outputFolder } from './constants';

const writePagination = (images, index, isLast = false) => {
  fs.writeJSONSync(`${outputFolder}/page-${index + 1}.json`, {
    isLast,
    images,
  });
};

export default writePagination;
