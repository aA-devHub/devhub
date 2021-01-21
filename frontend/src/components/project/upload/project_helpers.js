export const validateURL = (url) => {
  url = url.toLowerCase();

  if (url.includes('://')) {
    url = url.split('://');
    url[0] = 'https';
    url = url.join('://');
  } else {
    url = 'https://' + url;
  }

  return url;
};
