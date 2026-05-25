import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../../hooks/redux';

interface Props {
  children: React.ReactNode;
  permission?: keyof ReturnType<
    typeof useAppSelector
  >['auth']['user']['permissions'];
}

const ProtectedRoute = ({ children, permission }: Props) => {
  const user = useAppSelector(state => state.auth.user);

  if (!user) {
    return null;
  }

  if (permission && !user.permissions[permission]) {
    return (
      <View>
        <Text>Access Denied</Text>
      </View>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;