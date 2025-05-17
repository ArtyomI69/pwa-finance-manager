import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/shadcnui/ui/table';

export const Invitations = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Группа</TableHead>
          <TableHead>От кого</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {users.map(({ name, avatar_url, email, isCurrentUser, id, group_id }) => {
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
                  <Button variant={'ghost'} className="border rounded-[50%] p-2 hover:bg-gray-100">
                    <UserX color="red" />
                  </Button>
                  <Button variant={'ghost'} className="border rounded-[50%] p-2 hover:bg-gray-100">
                    <Crown color="gold" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          );
        })} */}
      </TableBody>
    </Table>
  );
};
