import ThreeDotSimpleLoader from '../cuicui/ThreeDotSimpleLoader';

export const FullScreenLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ThreeDotSimpleLoader />
    </div>
  );
};
