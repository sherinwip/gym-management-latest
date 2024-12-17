export interface Member {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  membershipType: 'basic' | 'premium' | 'platinum';
  status: 'active' | 'inactive';
  avatar?: string;
}