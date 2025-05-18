import { Profile } from './profile';

export interface Invitation {
  from_profile: Profile;
  to_profile: Profile;
  group_id: string;
}
