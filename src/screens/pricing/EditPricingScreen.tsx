import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  EditPricingScreenProps,
} from '../../types/navigation';
import { editPricingStyles as styles } from './styles';

type Props = EditPricingScreenProps;

export default function EditPricingScreen({
  navigation,
  route,
}: Props) {
  const { pricingId } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Pricing Screen</Text>
      <Text style={styles.contentId}>Pricing ID: {pricingId || 'No ID'}</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <Text style={styles.backBtnText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}