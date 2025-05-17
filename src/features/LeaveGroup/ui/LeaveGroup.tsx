import { Button } from '@/shared/components/shadcnui/ui/button';
import { leaveGroupEv } from '../model/LeaveGroup.store';

export const LeaveGroup = () => {
  const onLeaveGroupHandler = () => {
    leaveGroupEv();
  };

  return (
    <Button onClick={onLeaveGroupHandler} className="w-full" variant={'destructive'}>
      Выйти из группы
    </Button>
  );
};
