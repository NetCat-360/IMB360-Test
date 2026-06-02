import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';

type Props = {
  children: React.ReactNode;
};

const ScreenContainer = ({ children }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default ScreenContainer;