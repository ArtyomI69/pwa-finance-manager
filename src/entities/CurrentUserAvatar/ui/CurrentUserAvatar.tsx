'use client';

import { useGate, useUnit } from 'effector-react';
import { $initials, $profileImage, CurrentUserAvatarGate } from '../model/CurrentUserAvatar.store';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcnui/ui/avatar';

export const CurrentUserAvatar = () => {
  useGate(CurrentUserAvatarGate);

  const profileImage = useUnit($profileImage);
  const initials = useUnit($initials);

  return (
    <Avatar className="size-28">
      {profileImage && <AvatarImage src={profileImage} alt={initials} />}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};
