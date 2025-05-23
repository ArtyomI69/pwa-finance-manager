import { Profile } from './profile';

export interface Transaction {
  id: number;
  created_at: string;
  category: string;
  sum: number;
  profile: Profile;
}
