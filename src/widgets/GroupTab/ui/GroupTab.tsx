import { Group } from '@/entities/Group';
import { InviteUserToGroup } from '@/features/InviteUserToGroup';
import { LeaveGroup } from '@/features/LeaveGroup';

export const GroupTab = () => {
  return (
    <div className="gap-2">
      <InviteUserToGroup />
      <Group />
      <LeaveGroup />
    </div>
  );
};
