export const getLastItemUrl = (url: string) => {
  const urlArray = url.split('/');
  const fileName = urlArray[urlArray.length - 1];

  return fileName;
};
