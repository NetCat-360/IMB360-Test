import { UserRole, UserPermissions } from '../features/auth/store/authSlice';

export const getPermissionsByRole = (
  role: UserRole,
): UserPermissions => {
  switch (role) {
    case 'ADMIN':
      return {
        canManageUsers: true,
        canCreateCampaigns: true,
        canViewPayments: true,
        canEditProfile: true,
      };

    case 'BRAND':
      return {
        canManageUsers: false,
        canCreateCampaigns: true,
        canViewPayments: true,
        canEditProfile: true,
      };

    case 'CREATOR':
    default:
      return {
        canManageUsers: false,
        canCreateCampaigns: false,
        canViewPayments: false,
        canEditProfile: true,
      };
  }
};