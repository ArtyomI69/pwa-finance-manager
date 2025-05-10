import React, { ChangeEvent } from 'react';

import { NormalToLargeButton } from './button';
import { cn } from '@/shared/utils/cn';
import { CurrentUserAvatar } from '../supabase/current-user-avatar';

type PhotoUploadProps = {
  id: string;
  className?: string;
  onFileChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  url?: string;
  name?: string;
};

export const PhotoUpload = ({ id, className, onFileChange }: PhotoUploadProps) => {
  const fileUploadRef = React.useRef<HTMLInputElement>(null);
  return (
    <div
      className={cn('flex flex-col gap-1 items-center relative  rounded pt-4 pb-2 px-2', className)}
    >
      <CurrentUserAvatar />

      <NormalToLargeButton appearance="secondary" onClick={() => fileUploadRef.current?.click()}>
        Загрузить фото
      </NormalToLargeButton>

      <NormalToLargeButton
        appearance="text"
        className="text-blinkCoral400 dark:text-blinkCoral300 underline"
      >
        Удалить фото
      </NormalToLargeButton>

      <input
        tabIndex={-1}
        ref={fileUploadRef}
        type="file"
        id={id}
        onChange={onFileChange}
        accept=".jpg, .png, .gif"
        className="absolute top-0 left-0 opacity-0"
      />
    </div>
  );
};

PhotoUpload.displayName = 'PhotoUpload';
