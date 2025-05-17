import { Button } from '@/shared/components/shadcnui/ui/button';
import { Input } from '@/shared/components/tremor/ui/Input';

export const InviteUserToGroup = () => {
  return (
    <div className="flex gap-2">
      <Input className="outline-none" id="email" placeholder="johndoe@mail.com" type="email" />
      <Button>Пригласить</Button>
    </div>
  );
};
