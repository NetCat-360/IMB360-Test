import type {
  UserPermissions,
  UserRole,
} from '../types/global';

/**
 * DEFAULT PERMISSIONS
 */
export const DEFAULT_PERMISSIONS: Record<
  UserRole,
  UserPermissions
> = {
  ADMIN: {
    canViewDashboard: true,
    canManageCampaigns: true,
    canManageContent: true,
    canManagePricing: true,
    canViewEarnings: true,
    canManageSettings: true,
  },

  CREATOR: {
    canViewDashboard: true,
    canManageCampaigns: false,
    canManageContent: true,
    canManagePricing: true,
    canViewEarnings: true,
    canManageSettings: false,
  },

  BRAND: {
    canViewDashboard: true,
    canManageCampaigns: true,
    canManageContent: false,
    canManagePricing: false,
    canViewEarnings: false,
    canManageSettings: false,
  },
};

/**
 * GET ROLE PERMISSIONS
 */
export const getPermissionsByRole = (
  role: UserRole,
): UserPermissions => {
  return DEFAULT_PERMISSIONS[role];
};

/**
 * CHECK PERMISSION
 */
export const hasPermission = (
  permissions: UserPermissions,
  permission: keyof UserPermissions,
): boolean => {
  return permissions[permission];
};