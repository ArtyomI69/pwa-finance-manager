import { Button } from '@/shared/components/shadcnui/ui/button';
import { Input } from '@/shared/components/tremor/ui/Input';
import { inviteUserToGroupEv } from '../model/InviteUserToGroup.store';
import { useState, ChangeEvent } from 'react';

export const InviteUserToGroup = () => {
  const [emailInput, setEmailInput] = useState('');

  const onInviteUserToGroupHanler = () => {
    inviteUserToGroupEv(emailInput);
  };

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };

  return (
    <div className="flex gap-2">
      <Input
        onChange={onChangeInputHandler}
        value={emailInput}
        className="outline-none"
        id="email"
        placeholder="johndoe@mail.com"
        type="email"
      />
      <Button onClick={onInviteUserToGroupHanler} className="bg-green-500 hover:bg-green-400">
        Пригласить
      </Button>
    </div>
  );
};
