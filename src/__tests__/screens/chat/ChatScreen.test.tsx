import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChatScreen from '../../../screens/chat/ChatScreen';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../../../store/slices/chatSlice';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), pop: jest.fn(), replace: jest.fn() }),
}));

jest.mock('../../../components/ScreenHeader', () => {
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
  reducer: { chat: chatReducer },
});

describe('ChatScreen', () => {
  it('renders header and chat list', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ChatScreen />
      </Provider>
    );
    expect(getByText('Chats')).toBeTruthy();
  });

  it('renders chat names from store', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ChatScreen />
      </Provider>
    );
    expect(getByText('Shashank Meena')).toBeTruthy();
    expect(getByText('Divansh')).toBeTruthy();
    expect(getByText('Ankit')).toBeTruthy();
  });

  it('renders status indicators', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <ChatScreen />
      </Provider>
    );
    expect(getAllByText('Offline').length).toBeGreaterThanOrEqual(1);
    expect(getAllByText('Online').length).toBeGreaterThanOrEqual(1);
  });

  it('renders last messages', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ChatScreen />
      </Provider>
    );
    expect(getByText('Hey! Looking forward to working with your brand.')).toBeTruthy();
  });
});
