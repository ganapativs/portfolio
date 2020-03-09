import fs from 'fs-extra';
import imghash from 'imghash';
import { outputFolder } from './constants';

const hashAndRenameImages = async keys => {
  let promises = [];

  for (let i = 0; i < keys.length; i += 1) {
    promises.push(imghash.hash(`${outputFolder}/${keys[i]}`));
  }

  const hashedKeys = await Promise.all(promises);

  // Rename files to hashed names
  promises = [];
  const newImagesList = [];
  for (let i = 0; i < keys.length; i += 1) {
    const ext = keys[i].split('.').reverse()[0];

    promises.push(
      fs.move(
        `${outputFolder}/${keys[i]}`,
        `${outputFolder}/${hashedKeys[i]}.${ext}`,
      ),
    );
    promises.push(
      fs.move(
        `${outputFolder}/preview/${keys[i]}`,
        `${outputFolder}/preview/${hashedKeys[i]}.${ext}`,
      ),
    );

    newImagesList.push(`${hashedKeys[i]}.${ext}`);
  }
  // Wait for the files to be moved
  await Promise.all(promises);

  return newImagesList;
};

export default hashAndRenameImages;
