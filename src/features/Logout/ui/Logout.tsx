import { Button } from '@/shared/components/shadcnui/ui/button';
import { logoutEv } from '../model/Logout.store';
import { Card, CardContent } from '@/shared/components/shadcnui/ui/card';

export const Logout = () => {
  const onLogoutHandler = () => {
    logoutEv();
  };

  return (
    <div className="flex max-w-2xl mx-auto w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-2xl flex flex-1 justify-center items-center">
        <Button
          className="flex-1 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm"
          onClick={onLogoutHandler}
        >
          Выйти из аккаунта
        </Button>
      </Card>
    </div>
  );
};
