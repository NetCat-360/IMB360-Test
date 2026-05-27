import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const DashboardSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={{ padding: 20 }}>
        <View
          style={{
            width: '100%',
            height: 120,
            borderRadius: 12,
            marginBottom: 16,
          }}
        />

        <View
          style={{
            width: '100%',
            height: 80,
            borderRadius: 12,
            marginBottom: 16,
          }}
        />

        <View
          style={{
            width: '100%',
            height: 80,
            borderRadius: 12,
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
};

export default DashboardSkeleton;