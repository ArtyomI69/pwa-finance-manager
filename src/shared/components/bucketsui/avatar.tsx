import { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

type AvatarImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export const AvatarImage = ({ src, alt, className, ...props }: AvatarImageProps) => {
  return <img src={src} alt={alt} {...props} className={cn(className)} />;
};

type AvatarFallbackProps = {
  className?: string;
  children?: ReactNode;
};

export const AvatarFallback = ({
  className,
  children,
  ...props
}: AvatarFallbackProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-blinkGreen400 text-blinkGreen700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
