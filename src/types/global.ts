export interface UserPermissions {
  canViewDashboard: boolean;
  canManageCampaigns: boolean;
  canManageContent: boolean;
  canManagePricing: boolean;
  canViewEarnings: boolean;
  canManageSettings: boolean;
}

export type UserRole =
  | 'ADMIN'
  | 'CREATOR'
  | 'BRAND';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  permissions: UserPermissions;
}

export interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}