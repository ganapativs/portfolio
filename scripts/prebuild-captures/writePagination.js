import fs from 'fs-extra';
import { outputFolder } from './constants';

const writePagination = (images, currentPage, totalPages) => {
  fs.writeJSONSync(`${outputFolder}/page-${currentPage}.json`, {
    currentPage,
    totalPages,
    hasMore: currentPage < totalPages,
    images,
  });
};

export default writePagination;
