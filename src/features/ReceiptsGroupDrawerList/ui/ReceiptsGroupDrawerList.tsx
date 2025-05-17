import { Accordion, Content, Tab, Trigger } from '@/shared/components/lukachoui/accordion';
import { ReceiptsPersonalDrawerList } from '@/features/ReceiptsPersonalDrawerList';
import { GroupedProfile } from '@/shared/types/shopGroup';

export const ReceiptsGroupDrawerList = ({
  groupedProfiles,
  onItemClick,
}: {
  groupedProfiles: GroupedProfile[];
  onItemClick: (center: number[]) => void;
}) => {
  return (
    <Accordion>
      {groupedProfiles.map((groupedProf, i) => {
        return (
          <Tab key={i}>
            <Trigger>
              {groupedProf.profile.name} ({groupedProf.totalSum.toFixed(0)}₽)
            </Trigger>
            <Content className="overflow-x-auto">
              <ReceiptsPersonalDrawerList
                groupedShops={groupedProf.shops}
                onItemClick={onItemClick}
              />
            </Content>
          </Tab>
        );
      })}
    </Accordion>
  );
};
