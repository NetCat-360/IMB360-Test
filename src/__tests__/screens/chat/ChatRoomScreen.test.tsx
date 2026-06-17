import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChatRoomScreen from '../../../screens/chat/ChatRoomScreen';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../../../store/slices/chatSlice';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), pop: jest.fn(), replace: jest.fn(), getParent: () => ({ setOptions: jest.fn() }) }),
  useRoute: () => ({ params: { chatId: '1' } }),
  useFocusEffect: jest.fn(),
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

describe('ChatRoomScreen', () => {
  it('renders chat header with user name', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ChatRoomScreen />
      </Provider>
    );
    expect(getByText('Shashank Meena')).toBeTruthy();
  });

  it('renders existing messages', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ChatRoomScreen />
      </Provider>
    );
    expect(getByText('Hey! Looking forward to working with your brand.')).toBeTruthy();
  });

  it('renders input and send button', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <ChatRoomScreen />
      </Provider>
    );
    expect(getByPlaceholderText('Type a message...')).toBeTruthy();
    expect(getByText('Send')).toBeTruthy();
  });
});
