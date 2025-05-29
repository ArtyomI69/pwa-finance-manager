export const getLastItemUrl = (url: string) => {
  if (!url) return '';

  const urlArray = url.split('/');
  const fileName = urlArray[urlArray.length - 1];

  return fileName;
};
