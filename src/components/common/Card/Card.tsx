import React from 'react';
import { View } from 'react-native';

import styles from './styles';

type Props = {
  children: React.ReactNode;
};

const Card = ({ children }: Props) => {
  return (
    <View style={styles.card}>
      {children}
    </View>
  );
};

export default Card;