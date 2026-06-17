import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../../../../screens/influencer/home/HomeScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('../../../../hooks/redux', () => ({
  useAppSelector: (selector: any) =>
    selector({
      auth: {
        user: {
          name: 'Test User',
          username: 'testuser',
          role: 'CREATOR',
        },
      },
    }),
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Test User')).toBeTruthy();
  });

  it('renders user info from Redux', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('@testuser')).toBeTruthy();
    expect(getByText('CREATOR')).toBeTruthy();
  });

  it('renders stats section', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('10')).toBeTruthy();
    expect(getByText('Following')).toBeTruthy();
    expect(getByText('3.76K')).toBeTruthy();
    expect(getByText('Followers')).toBeTruthy();
  });

  it('renders menu items', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Overview')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
    expect(getByText('Pricing')).toBeTruthy();
    expect(getByText('Campaign Queue')).toBeTruthy();
    expect(getByText('My Earnings')).toBeTruthy();
  });

  it('navigates to Chat when chat button pressed', () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('💬'));
    expect(mockNavigate).toHaveBeenCalledWith('Chat');
  });

  it('navigates to Settings when settings button pressed', () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('⚙️'));
    expect(mockNavigate).toHaveBeenCalledWith('Settings');
  });

  it('navigates to Overview when menu item pressed', () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Overview'));
    expect(mockNavigate).toHaveBeenCalledWith('Overview');
  });

  it('navigates to Content when menu item pressed', () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Content'));
    expect(mockNavigate).toHaveBeenCalledWith('Content');
  });

  it('navigates to MyEarnings when menu item pressed', () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('My Earnings'));
    expect(mockNavigate).toHaveBeenCalledWith('MyEarnings');
  });

  it('renders action buttons', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Edit Profile')).toBeTruthy();
    expect(getByText('Add Assets')).toBeTruthy();
  });

  it('navigates to Settings on Edit Profile press', () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Edit Profile'));
    expect(mockNavigate).toHaveBeenCalledWith('Settings');
  });
});
