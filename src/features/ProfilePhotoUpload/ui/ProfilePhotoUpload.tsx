import React, { ChangeEvent } from 'react';

import { NormalToLargeButton } from '@/shared/components/bucketsui/button';
import { cn } from '@/shared/utils/cn';
import { CurrentUserAvatar } from '@/entities/CurrentUserAvatar';

type ProfilePhotoUploadProps = {
  id: string;
  className?: string;
  onFileChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFileDelete?: () => void;
  url?: string;
  name?: string;
};

export const ProfilePhotoUpload = ({
  id,
  className,
  onFileChange,
  onFileDelete,
}: ProfilePhotoUploadProps) => {
  const fileUploadRef = React.useRef<HTMLInputElement>(null);
  return (
    <div
      className={cn(
        'flex flex-col gap-1 items-center relative pt-4 pb-2 px-2 border-b-2 border-b-black',
        className
      )}
    >
      <CurrentUserAvatar />

      <NormalToLargeButton appearance="secondary" onClick={() => fileUploadRef.current?.click()}>
        Загрузить фото
      </NormalToLargeButton>

      <NormalToLargeButton
        appearance="text"
        className="text-blinkCoral400 dark:text-blinkCoral300 underline"
        onClick={onFileDelete}
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

ProfilePhotoUpload.displayName = 'ProfilePhotoUpload';
