import { useEffect, useRef } from 'react';
import QrScan from 'qr-scanner';
import { getQrCodeDataEv } from '../model/QrScanner.store';

export const QrScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScan | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      scannerRef.current = new QrScan(
        videoRef.current,
        (result) => {
          getQrCodeDataEv(result.data);
        },
        {
          returnDetailedScanResult: true,
          preferredCamera: '',
          highlightScanRegion: true,
          highlightCodeOutline: true,
          calculateScanRegion: (video: HTMLVideoElement) => {
            const minEdgeSize = Math.min(video.videoWidth, video.videoHeight);
            const regionSize = Math.round(minEdgeSize * 0.45);
            return {
              x: (video.videoWidth - regionSize) / 2,
              y: (video.videoHeight - regionSize) / 2,
              width: regionSize,
              height: regionSize,
            };
          },
        }
      );

      scannerRef.current?.start();
    }

    return () => {
      scannerRef.current?.destroy();
    };
  }, []);

  return (
    <video ref={videoRef} className="w-screen h-[calc(100vh-64px)] md:h-screen object-cover" />
  );
};
