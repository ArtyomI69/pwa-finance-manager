export const ColorBullet = ({ color = '' }: { color: string }) => {
  return <div className={`rounded-[50%] w-4 h-4 ${color}`} />;
};
