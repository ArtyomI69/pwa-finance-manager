import { $isOnline } from '@/entities/OnlineStatus';
import { Logout } from '@/features/Logout';
import { ProfileForm } from '@/widgets/ProfileForm';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const ProfilePage = () => {
  const isOnline = useUnit($isOnline);

  useEffect(() => {
    if (!isOnline)
      toast.info('Для просмотра информации на данной страницы необходимо интернет соединение');
  }, []);

  return (
    <div className="flex flex-col gap-4 pb-20">
      <ProfileForm />
      <Logout />
    </div>
  );
};

export default ProfilePage;
