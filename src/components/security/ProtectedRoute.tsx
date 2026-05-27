import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useAppSelector } from '../../hooks/redux';
import { Colors } from '../../config/theme';

import type { UserPermissions } from '../../types/global';

type PermissionKey = keyof UserPermissions;

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredPermission?: PermissionKey;
};

const ProtectedRoute = ({
  children,
  requiredPermission,
}: ProtectedRouteProps) => {
  const auth = useAppSelector(state => state.auth);

  if (!auth?.isAuthenticated) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          You must be logged in to access this page.
        </Text>
      </View>
    );
  }

  const permissions = auth.user?.permissions as UserPermissions;

  if (
    requiredPermission &&
    permissions &&
    !permissions[requiredPermission]
  ) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          You do not have permission to access this page.
        </Text>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgBlack,
    paddingHorizontal: 24,
  },

  text: {
    color: Colors.textPrimary,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProtectedRoute;