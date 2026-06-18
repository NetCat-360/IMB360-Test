import React from 'react';
import { render } from '@testing-library/react-native';
import AssetsScreen from '../../../screens/assets/AssetsScreen';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import assetReducer from '../../../store/slices/assetSlice';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), pop: jest.fn(), replace: jest.fn() } as any),
}));

const store = configureStore({
  reducer: { asset: assetReducer },
});

describe('AssetsScreen', () => {
  it('renders title and asset cards', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AssetsScreen />
      </Provider>
    );
    expect(getByText('Assets')).toBeTruthy();
    expect(getByText('ASUS TUF Gaming A15')).toBeTruthy();
  });

  it('renders filter title', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AssetsScreen />
      </Provider>
    );
    expect(getByText('Filter Result')).toBeTruthy();
  });

  it('renders rent price for asset', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AssetsScreen />
      </Provider>
    );
    expect(getByText('₹ 998/Day')).toBeTruthy();
  });
});
