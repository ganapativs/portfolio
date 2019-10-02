// Thanks to https://github.com/kremalicious/blog/blob/master/gatsby/createExifFields.js
/**
 * USAGE
 *
// gatsby-node.js
const { getImageGeoLocation } = require('./gatsby/getImageGeoLocation');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Image files
  if (node.internal.mediaType === 'image/jpeg') {
    getImageGeoLocation(node, createNodeField);
  }
};

 */
const fastExif = require('fast-exif');
const dms2dec = require('dms2dec');
const fetch = require('cross-fetch');

const getGeoLocation = async (latitude, longitude) => {
  const response = await fetch(
    `http://open.mapquestapi.com/geocoding/v1/reverse?key=${process.env.MAPQUEST_API_KEY}&location=${latitude},${longitude}&includeNearestIntersection=true`,
  ).then(r => r.json());

  return response.results[0].locations[0];
};

const populateImageGeoLocation = async (exifData, createNodeField, node) => {
  const { GPSLatitudeRef, GPSLatitude, GPSLongitudeRef, GPSLongitude } =
    exifData.gps || {};

  let location = null;
  let latitude = null;
  let longitude = null;

  if (GPSLatitude && GPSLongitude) {
    const GPSdec = dms2dec(
      GPSLatitude,
      GPSLatitudeRef,
      GPSLongitude,
      GPSLongitudeRef,
    );

    [latitude, longitude] = GPSdec;
    location = await getGeoLocation(latitude, longitude);

    // add exif fields to type File
    createNodeField({
      node,
      name: 'geolocation',
      value: {
        latitude,
        longitude,
        ...location,
      },
    });
  }
};

exports.getImageGeoLocation = (node, createNodeField) => {
  return new Promise(resolve => {
    fastExif
      .read(node.absolutePath, true)
      .then(exifData => {
        if (!exifData) return;
        populateImageGeoLocation(exifData, createNodeField, node).then(resolve);
      })
      // just silently fail when exif can't be extracted
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(
          `Error in getting image geo location data: Path: ${node.absolutePath}, Error: ${err.message}`,
        );
        resolve();
      });
  });
};
