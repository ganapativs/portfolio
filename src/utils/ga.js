// https://developers.google.com/analytics/devguides/collection/analyticsjs/events
export const captureEvent = (
  eventCategory,
  eventAction,
  eventLabel,
  eventValue,
) =>
  window?.ga?.(
    "send",
    "event",
    eventCategory,
    eventAction,
    eventLabel,
    eventValue,
  );
