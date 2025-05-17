'use client';

import { useGate, useUnit } from 'effector-react';
import { $name, $profileImage, CurrentUserAvatarGate } from '../model/CurrentUserAvatar.store';
import { AvatarWithInitials } from '@/shared/components/ui/AvatarWithInitials';

export const CurrentUserAvatar = () => {
  useGate(CurrentUserAvatarGate);

  const profileImage = useUnit($profileImage);
  const name = useUnit($name);

  return <AvatarWithInitials className="size-28" avatar_url={profileImage} name={name} />;
};
