import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';
import { GroupTab } from '@/widgets/GroupTab';
import { InvitationsTab } from '@/widgets/InvitationsTab/ui/InvitationsTab';

const GroupPage = () => {
  return (
    <div className="flex flex-1 max-w-4xl mx-auto h-full w-full items-start justify-center px-4 py-20">
      <Tabs defaultValue="group" className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="grid flex-1 grid-cols-2">
          <TabsTrigger value="group">Группа</TabsTrigger>
          <TabsTrigger value="invitations">Приглашения</TabsTrigger>
        </TabsList>
        <TabsContent value="group" className="flex-1 px-4">
          <GroupTab />
        </TabsContent>
        <TabsContent value="invitations" className="flex-1 px-4">
          <InvitationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupPage;
