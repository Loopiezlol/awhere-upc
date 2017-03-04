export function locationCallback(location) {
  console.log('[js] BackgroundGeolocation callback:  ', location.latitude, ',', location.longitude);
  bgLocation.finish();
};

export function failureFn(error) {
  console.log('BackgroundGeolocation error', error);
};
