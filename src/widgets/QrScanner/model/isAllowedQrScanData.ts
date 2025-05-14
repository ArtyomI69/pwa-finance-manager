export const isAllowedQrScanData = (qrraw: string) => {
  const regex = /^t=\d{8}T\d{4}&s=\d+(?:\.\d+)?&fn=\d{13,16}&i=\d+&fp=\d+&n=\d+$/;
  return regex.test(qrraw);
};
