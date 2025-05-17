import { Accordion, Content, Tab, Trigger } from '@/shared/components/lukachoui/accordion';
import { ReceiptsPersonalDrawerList } from '@/features/ReceiptsPersonalDrawerList';
import { GroupedProfile } from '@/shared/types/shopGroup';
import { AvatarWithInitials } from '@/shared/components/ui/AvatarWithInitials';

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
              <div className="flex items-center justify-center gap-2">
                <AvatarWithInitials
                  name={groupedProf.profile.name}
                  avatar_url={groupedProf.profile.avatar_url}
                />
                {groupedProf.profile.name} ({groupedProf.totalSum.toFixed(0)}
                ₽)
              </div>
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
