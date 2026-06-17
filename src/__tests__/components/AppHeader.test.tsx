import React from 'react';
import { Image } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import AppHeader from '../../components/AppHeader';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

describe('AppHeader', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the logo', () => {
    const { UNSAFE_getByType } = render(<AppHeader />);
    expect(UNSAFE_getByType(Image)).toBeTruthy();
  });

  it('shows chat and settings buttons by default', () => {
    const { getByText } = render(<AppHeader />);
    expect(getByText('💬')).toBeTruthy();
    expect(getByText('⚙️')).toBeTruthy();
  });

  it('hides chat button when showChat is false', () => {
    const { queryByText, getByText } = render(<AppHeader showChat={false} />);
    expect(queryByText('💬')).toBeNull();
    expect(getByText('⚙️')).toBeTruthy();
  });

  it('hides settings button when showSettings is false', () => {
    const { queryByText, getByText } = render(<AppHeader showSettings={false} />);
    expect(getByText('💬')).toBeTruthy();
    expect(queryByText('⚙️')).toBeNull();
  });

  it('navigates to Chat when chat button is pressed', () => {
    const { getByText } = render(<AppHeader />);
    fireEvent.press(getByText('💬'));
    expect(mockNavigate).toHaveBeenCalledWith('Chat');
  });

  it('navigates to Settings when settings button is pressed', () => {
    const { getByText } = render(<AppHeader />);
    fireEvent.press(getByText('⚙️'));
    expect(mockNavigate).toHaveBeenCalledWith('Settings');
  });
});
