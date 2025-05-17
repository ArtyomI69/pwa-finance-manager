import { Avatar, AvatarFallback, AvatarImage } from '../shadcnui/ui/avatar';

export const AvatarWithInitials = ({
  avatar_url = '',
  name = '',
  className = '',
}: {
  avatar_url: string | null;
  name?: string;
  className?: string;
}) => {
  const initials = name
    ?.split(' ')
    ?.map((word) => word[0])
    ?.join('')
    ?.toUpperCase();

  return (
    <Avatar className={className}>
      {avatar_url && <AvatarImage src={avatar_url} alt={initials} />}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};
