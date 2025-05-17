import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';
import { Groups } from '@/widgets/Groups';

const GroupPage = () => {
  return (
    <div className="flex flex-1 max-w-4xl mx-auto h-full w-full items-start justify-center px-4 py-20">
      <Tabs defaultValue="group" className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="grid flex-1 grid-cols-2">
          <TabsTrigger value="group">Группа</TabsTrigger>
          <TabsTrigger value="invitations">Приглашения</TabsTrigger>
        </TabsList>
        <TabsContent value="group" className="flex-1">
          <Groups />
        </TabsContent>
        <TabsContent value="invitations" className="flex-1"></TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupPage;
