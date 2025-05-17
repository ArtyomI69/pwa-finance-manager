import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/shadcnui/ui/table';
import { useGate, useUnit } from 'effector-react';
import {
  $groupId,
  $isOwner,
  $users,
  getAllUsersInGroupFx,
  GroupGate,
  kickFromGroupEv,
} from '../model/Group.store';
import { AvatarWithInitials } from '@/shared/components/ui/AvatarWithInitials';
import { Button } from '@/shared/components/shadcnui/ui/button';
import { Crown, UserX } from 'lucide-react';
import ThreeDotSimpleLoader from '@/shared/components/cuicui/ThreeDotSimpleLoader';

export const Group = () => {
  useGate(GroupGate);
  const users = useUnit($users);
  const isOwner = useUnit($isOwner);
  const groupId = useUnit($groupId);
  const loading = useUnit(getAllUsersInGroupFx.pending);

  if (loading) return <ThreeDotSimpleLoader />;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center text-lg">
        {isOwner ? `Моя группа(№${groupId})` : `Группа №${groupId}`}
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Аватар</TableHead>
            <TableHead>Имя</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Роль</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(({ name, avatar_url, email, isCurrentUser, id, group_id }) => {
            return (
              <TableRow key={id}>
                <TableCell className="font-medium">
                  <AvatarWithInitials avatar_url={avatar_url} name={name} />
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>
                  {isCurrentUser && 'Я'} {id === group_id && 'Лидер'}
                </TableCell>
                {!isCurrentUser && isOwner && (
                  <TableCell className="text-right flex gap-2">
                    <Button
                      variant={'ghost'}
                      className="border rounded-[50%] p-2 hover:bg-gray-100"
                      onClick={() => kickFromGroupEv(id)}
                    >
                      <UserX color="red" />
                    </Button>
                    <Button
                      variant={'ghost'}
                      className="border rounded-[50%] p-2 hover:bg-gray-100"
                    >
                      <Crown color="gold" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
