import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { EditContentScreenProps } from '../../types/navigation';

type Props = EditContentScreenProps;

export default function EditContentScreen({
  navigation,
  route,
}: Props) {
  const { contentId } = route.params || {};

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: '#FFF',
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        Edit Content Screen
      </Text>

      <Text
        style={{
          color: '#AAA',
          marginBottom: 30,
        }}
      >
        Content ID: {contentId || 'No ID'}
      </Text>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: '#00D2FF',
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: '#000',
            fontWeight: '700',
          }}
        >
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}