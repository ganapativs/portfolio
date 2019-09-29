// Thanks to https://github.com/kremalicious/blog/blob/master/gatsby/createExifFields.js
/**
 * USAGE
 *
// gatsby-node.js
const { createExifFields } = require('./gatsby/createExifFields');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Image files
  if (node.internal.mediaType === 'image/jpeg') {
    createExifFields(node, createNodeField);
  }
};

 */
const fastExif = require('fast-exif');
const Fraction = require('fraction.js');
const dms2dec = require('dms2dec');
const fetch = require('cross-fetch');

const getGeoLocation = async (latitude, longitude) => {
  const response = await fetch(
    `http://open.mapquestapi.com/geocoding/v1/reverse?key=${process.env.MAPQUEST_API_KEY}&location=${latitude},${longitude}&includeNearestIntersection=true`,
  ).then(r => r.json());

  return response.results[0].locations[0];
};

const constructExifFields = async (exifData, createNodeField, node) => {
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
  const location = await getGeoLocation(latitude, longitude);

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
        location,
      },
    },
  });
};

exports.createExifFields = (node, createNodeField) => {
  return new Promise(resolve => {
    fastExif
      .read(node.absolutePath, true)
      .then(async exifData => {
        if (!exifData) return;
        await constructExifFields(exifData, createNodeField, node);
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
