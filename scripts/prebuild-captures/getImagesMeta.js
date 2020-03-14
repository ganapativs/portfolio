// Thanks to https://github.com/kremalicious/blog/blob/master/gatsby/createExifFields.js
import { read } from 'fast-exif';
import dms2dec from 'dms2dec';
import fetch from 'cross-fetch';
import { outputFolder } from './constants';

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

const populateImageGeoLocation = async exifData => {
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
    return {
      latitude,
      longitude,
      ...location,
    };
  }

  return {};
};

const getImagesMeta = (images = []) => {
  const promises = [];

  for (let i = 0; i < images.length; i += 1) {
    const image = `${outputFolder}/${images[i]}`;

    promises.push(
      new Promise(resolve => {
        read(image, true)
          .then(exifData => {
            if (!exifData) {
              return resolve({});
            }

            return populateImageGeoLocation(exifData).then(geolocation =>
              resolve({ ...exifData, geolocation }),
            );
          })
          // just silently fail when exif can't be extracted
          .catch(err => {
            // eslint-disable-next-line no-console
            console.error(
              `Error in getting image geo location data: Path: ${image}, Error: ${err.message}`,
            );
            return resolve({});
          });
      }),
    );
  }

  return Promise.all(promises);
};

export default getImagesMeta;
