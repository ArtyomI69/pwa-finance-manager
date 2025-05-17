import { Button } from '@/shared/components/shadcnui/ui/button';
import { Input } from '@/shared/components/tremor/ui/Input';

export const InviteUserToGroup = () => {
  return (
    <div className="flex gap-2">
      <Input className="outline-none" id="email" placeholder="johndoe@mail.com" type="email" />
      <Button className="bg-green-500 hover:bg-green-400">Пригласить</Button>
    </div>
  );
};
