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

const serialise = obj =>
  Object.entries(obj)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');

const getGeoLocation = async (latitude, longitude) => {
  const params = {
    prox: `${latitude},${longitude}`,
    mode: 'retrieveAddresses',
    maxresults: '1',
    gen: '9',
    app_id: process.env.HERE_APP_ID,
    app_code: process.env.HERE_APP_CODE,
  };
  const response = await fetch(
    `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?${serialise(
      params,
    )}`,
  ).then(r => r.json());

  const { AdditionalData, ...Address } =
    (response.Response.View[0] &&
      response.Response.View[0].Result[0].Location.Address) ||
    {};

  return Address;
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
