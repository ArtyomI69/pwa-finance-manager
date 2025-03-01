import { useEffect, useRef } from 'react';
import QrScan from 'qr-scanner';

export const QrScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScan | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      scannerRef.current = new QrScan(
        videoRef.current,
        (result) => {
          console.log(result.data);
        },
        {
          returnDetailedScanResult: true,
          preferredCamera: '',
          highlightScanRegion: true,
          highlightCodeOutline: true,
          calculateScanRegion: (video: HTMLVideoElement) => {
            const minEdgeSize = Math.min(video.videoWidth, video.videoHeight);
            const regionSize = Math.round(minEdgeSize * 0.3);
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
      scannerRef.current?.stop();
    };
  }, []);

  return <video ref={videoRef} className="w-screen h-[100vh] object-cover" />;
};
