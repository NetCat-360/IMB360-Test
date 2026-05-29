import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/home/HomeScreen';

describe('HomeScreen', () => {
  it('renders the username', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Username')).toBeTruthy();
  });

  it('renders menu items', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Overview')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
    expect(getByText('Pricing')).toBeTruthy();
    expect(getByText('Campaign Queue')).toBeTruthy();
    expect(getByText('My Earnings')).toBeTruthy();
  });

  it('renders stat items', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Following')).toBeTruthy();
    expect(getByText('Followers')).toBeTruthy();
    expect(getByText('Engagement')).toBeTruthy();
    expect(getByText('Rating')).toBeTruthy();
  });

  it('renders action buttons', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Edit Profile')).toBeTruthy();
    expect(getByText('Add Assets')).toBeTruthy();
  });

  it('navigates to Overview on press', () => {
    const { useNavigation } = require('@react-navigation/native');
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Overview'));
    expect(useNavigation().navigate).toHaveBeenCalledWith('Overview');
  });

  it('navigates to Content on press', () => {
    const { useNavigation } = require('@react-navigation/native');
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Content'));
    expect(useNavigation().navigate).toHaveBeenCalledWith('Content');
  });

  it('navigates to Settings on gear icon press', () => {
    const { useNavigation } = require('@react-navigation/native');
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('⚙️'));
    expect(useNavigation().navigate).toHaveBeenCalledWith('Settings');
  });
});
