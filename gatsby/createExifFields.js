// Thanks to https://github.com/kremalicious/blog/blob/master/gatsby/createExifFields.js
const fastExif = require('fast-exif');
const Fraction = require('fraction.js');
const dms2dec = require('dms2dec');

const constructExifFields = (exifData, createNodeField, node) => {
  const { Model } = exifData.image;
  const {
    ISO,
    FNumber,
    ExposureTime,
    FocalLength,
    ExposureBiasValue,
  } = exifData.exif;
  const {
    GPSLatitudeRef,
    GPSLatitude,
    GPSLongitudeRef,
    GPSLongitude,
  } = exifData.gps;

  const { n, d } = new Fraction(ExposureTime);
  const exposureShortened = parseFloat(ExposureBiasValue.toFixed(2));

  const model = `${Model}`;
  const iso = `ISO ${ISO}`;
  const fstop = `ƒ ${FNumber}`;
  const shutterspeed = `${n}/${d}s`;
  const focalLength = `${FocalLength}mm`;

  const GPSdec = dms2dec(
    GPSLatitude,
    GPSLatitudeRef,
    GPSLongitude,
    GPSLongitudeRef,
  );

  const latitude = GPSdec[0];
  const longitude = GPSdec[1];

  let exposure;

  if (ExposureBiasValue === 0) {
    exposure = `+/- ${exposureShortened} ev`;
  } else if (ExposureBiasValue > 0) {
    exposure = `+ ${exposureShortened} ev`;
  } else {
    exposure = `${exposureShortened} ev`;
  }

  // add exif fields to type File
  createNodeField({
    node,
    name: 'exif',
    value: {
      iso,
      model,
      fstop,
      shutterspeed,
      focalLength,
      exposure,
      gps: {
        latitude,
        longitude,
      },
    },
  });
};

exports.createExifFields = (node, createNodeField) => {
  return new Promise(resolve => {
    fastExif
      .read(node.absolutePath, true)
      .then(exifData => {
        if (!exifData) return;
        constructExifFields(exifData, createNodeField, node);
        resolve();
      })
      // just silently fail when exif can't be extracted
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(
          `Error in getting exif data: Path: ${node.absolutePath}, Error: ${err.message}`,
        );
        resolve();
      });
  });
};
