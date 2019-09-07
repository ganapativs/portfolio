// https://developers.google.com/analytics/devguides/collection/analyticsjs/events
// eslint-disable-next-line import/prefer-default-export
export const captureEvent = (
  eventCategory,
  eventAction,
  eventLabel,
  eventValue,
) =>
  window.ga &&
  window.ga(
    'send',
    'event',
    eventCategory,
    eventAction,
    eventLabel,
    eventValue,
  );
