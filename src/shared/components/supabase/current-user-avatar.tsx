'use client';

import { useCurrentUserImage } from '../../hooks/use-current-user-image';
import { useCurrentUserName } from '../../hooks/use-current-user-name';
import { Avatar, AvatarFallback, AvatarImage } from '../shadcnui/ui/avatar';

export const CurrentUserAvatar = () => {
  const profileImage = useCurrentUserImage();
  const name = useCurrentUserName();
  const initials = name
    ?.split(' ')
    ?.map((word) => word[0])
    ?.join('')
    ?.toUpperCase();

  return (
    <Avatar className="size-28">
      {profileImage && <AvatarImage src={profileImage} alt={initials} />}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};
