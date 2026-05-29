import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { EditContentScreenProps } from '../../types/navigation';
import { editContentStyles as styles } from './styles';

type Props = EditContentScreenProps;

export default function EditContentScreen({
  navigation,
  route,
}: Props) {
  const { contentId } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Content Screen</Text>
      <Text style={styles.contentId}>Content ID: {contentId || 'No ID'}</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <Text style={styles.backBtnText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}