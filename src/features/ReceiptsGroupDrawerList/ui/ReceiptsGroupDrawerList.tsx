import { Accordion, Content, Tab, Trigger } from '@/shared/components/lukachoui/accordion';
import { ReceiptsPersonalDrawerList } from '@/features/ReceiptsPersonalDrawerList';
import { GroupedProfile } from '@/shared/types/shopGroup';

export const ReceiptsGroupDrawerList = ({
  groupedProfiles,
}: {
  groupedProfiles: GroupedProfile[];
}) => {
  return (
    <Accordion>
      {groupedProfiles.map((groupedProf, i) => {
        return (
          <Tab key={i}>
            <Trigger>{groupedProf.profile.name}</Trigger>
            <Content className="overflow-x-auto">
              <ReceiptsPersonalDrawerList groupedShops={groupedProf.shops} />
            </Content>
          </Tab>
        );
      })}
    </Accordion>
  );
};
