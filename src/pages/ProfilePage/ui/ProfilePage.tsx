import { Logout } from '@/features/Logout';
import { ProfileForm } from '@/widgets/ProfileForm';

const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-4 pb-20">
      <ProfileForm />
      <Logout />
    </div>
  );
};

export default ProfilePage;
