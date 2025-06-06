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
  $invitations,
  acceptInvitationEv,
  getInvitationsFx,
  InvitationsTabGate,
  rejectInvitationEv,
} from '../model/InvitationsTab.store';
import ThreeDotSimpleLoader from '@/shared/components/cuicui/ThreeDotSimpleLoader';
import { Button } from '@/shared/components/shadcnui/ui/button';
import { AvatarWithInitials } from '@/shared/components/ui/AvatarWithInitials';
import { Check, X } from 'lucide-react';

export const InvitationsTab = () => {
  useGate(InvitationsTabGate);
  const invitations = useUnit($invitations) ?? [];
  const loading = useUnit(getInvitationsFx.pending);

  if (loading) return <ThreeDotSimpleLoader />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Группа</TableHead>
          <TableHead>От кого</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invitations.map(({ from_profile, to_profile, group_id, id }) => {
          const onRejectInvitationHandler = () => {
            rejectInvitationEv(id);
          };

          const onAcceptInvitationHandler = () => {
            acceptInvitationEv({ newGroupId: group_id, invitationId: id });
          };

          return (
            <TableRow className="flex-1" key={`${from_profile} ${to_profile} ${group_id}`}>
              <TableCell>{group_id}</TableCell>
              <TableCell className="flex gap-2 items-center">
                <AvatarWithInitials name={from_profile.name} avatar_url={from_profile.avatar_url} />
                {from_profile.name}
              </TableCell>
              <TableCell>
                <Button
                  onClick={onAcceptInvitationHandler}
                  variant={'ghost'}
                  className="border rounded-[50%] p-2 hover:bg-gray-100"
                >
                  <Check color="green" />
                </Button>
                <Button
                  variant={'ghost'}
                  className="ml-2 border rounded-[50%] p-2 hover:bg-gray-100"
                  onClick={onRejectInvitationHandler}
                >
                  <X color="red" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
