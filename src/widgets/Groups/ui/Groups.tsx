import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/shadcnui/ui/table';
import { useGate, useUnit } from 'effector-react';
import { $users, getAllUsersInGroupFx, GroupGate } from '../model/Group.store';
import { AvatarWithInitials } from '@/shared/components/ui/AvatarWithInitials';
import ThreeDotSimpleLoader from '@/shared/components/cuicui/ThreeDotSimpleLoader';
import { Crown, UserX } from 'lucide-react';
import { Button } from '@/shared/components/shadcnui/ui/button';
import { Input } from '@/shared/components/shadcnui/ui/input';

export const Groups = () => {
  useGate(GroupGate);
  const users = useUnit($users);
  const loading = useUnit(getAllUsersInGroupFx.pending);

  if (loading) return <ThreeDotSimpleLoader />;

  return (
    <div className="gap-2">
      <div className="flex gap-2">
        <Input className="outline-none" id="email" placeholder="johndoe@mail.com" type="email" />
        <Button>Пригласить</Button>
      </div>
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
                {!isCurrentUser && (
                  <TableCell className="text-right flex gap-2">
                    <Button
                      variant={'ghost'}
                      className="border rounded-[50%] p-2 hover:bg-gray-100"
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
      <Button className="w-full" variant={'destructive'}>
        Выйти из группы
      </Button>
    </div>
  );
};
