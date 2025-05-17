import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcnui/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/shadcnui/ui/table';
import { useGate, useUnit } from 'effector-react';
import { $users, GroupGate } from '../model/Group.store';
import { AvatarWithInitials } from '@/shared/components/ui/AvatarWithInitials';

export const Groups = () => {
  useGate(GroupGate);
  const users = useUnit($users);

  return (
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
              <TableCell className="text-right">
                <button>Выгнать</button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
