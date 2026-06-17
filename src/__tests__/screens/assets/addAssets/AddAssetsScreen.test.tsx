import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddAssetsScreen from '../../../../screens/assets/addAssets/AddAssetsScreen';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import addAssetReducer from '../../../../store/slices/addAssetSlice';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), pop: jest.fn(), replace: jest.fn() }),
}));

jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');

jest.mock('../../../../components/ScreenHeader', () => {
  const React = require('react');
  const { Text, Pressable } = require('react-native');
  return ({ title, onBack }: any) => (
    <>
      <Text>{title}</Text>
      {onBack && <Pressable testID="back-button" onPress={onBack}><Text>Back</Text></Pressable>}
    </>
  );
});

const store = configureStore({
  reducer: { addAsset: addAssetReducer },
});

describe('AddAssetsScreen', () => {
  it('renders stepper and basic form fields', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <AddAssetsScreen navigation={{ pop: jest.fn() }} />
      </Provider>
    );
    expect(getByText('Add New Asset')).toBeTruthy();
    expect(getByPlaceholderText('Asset Name')).toBeTruthy();
    expect(getByPlaceholderText('Describe your asset')).toBeTruthy();
  });

  it('goes to step 2 on Next press', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <AddAssetsScreen navigation={{ pop: jest.fn() }} />
      </Provider>
    );
    fireEvent.press(getByText('Next'));
    expect(getByPlaceholderText('₱')).toBeTruthy();
  });

  it('renders category dropdown', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddAssetsScreen navigation={{ pop: jest.fn() }} />
      </Provider>
    );
    expect(getByText('Select Category')).toBeTruthy();
  });
});
