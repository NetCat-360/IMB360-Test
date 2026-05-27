import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  EditPricingScreenProps,
} from '../../types/navigation';

type Props = EditPricingScreenProps;

export default function EditPricingScreen({
  navigation,
  route,
}: Props) {
  const { pricingId } = route.params || {};

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          color: '#FFF',
          fontSize: 24,
          fontWeight: '700',
          marginBottom: 20,
        }}
      >
        Edit Pricing Screen
      </Text>

      <Text
        style={{
          color: '#AAA',
          fontSize: 16,
          marginBottom: 40,
        }}
      >
        Pricing ID: {pricingId || 'No ID'}
      </Text>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: '#00D2B5',
          paddingHorizontal: 24,
          paddingVertical: 14,
          borderRadius: 12,
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