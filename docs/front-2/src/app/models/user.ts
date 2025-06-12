export interface User {
  id: string;
  uid: string;
  email: string;
  displayName?: string;
  role?: string;
  createdAt: any;
  provider?: string;
  lastLogin?: any;
  }