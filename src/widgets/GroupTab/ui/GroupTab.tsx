import { Group, $isOwner } from '@/entities/Group';
import { InviteUserToGroup } from '@/features/InviteUserToGroup';
import { LeaveGroup } from '@/features/LeaveGroup';
import { useUnit } from 'effector-react';

export const GroupTab = () => {
  const isOwner = useUnit($isOwner);

  return (
    <div className="flex flex-col gap-8">
      <InviteUserToGroup />
      <Group />
      {!isOwner && <LeaveGroup />}
    </div>
  );
};
