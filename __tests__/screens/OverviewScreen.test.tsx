import React from 'react';
import { render } from '@testing-library/react-native';
import OverviewScreen from '../../src/screens/overview/OverviewScreen';

const { useNavigation } = jest.requireMock('@react-navigation/native');

describe('OverviewScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header title', () => {
    const navigation = useNavigation();
    const { getByText } = render(<OverviewScreen navigation={navigation} />);
    expect(getByText('Profile Overview')).toBeTruthy();
  });

  it('renders connected platforms section', () => {
    const navigation = useNavigation();
    const { getByText } = render(<OverviewScreen navigation={navigation} />);
    expect(getByText('Connected Platforms')).toBeTruthy();
  });

  it('renders follower growth section', () => {
    const navigation = useNavigation();
    const { getByText } = render(<OverviewScreen navigation={navigation} />);
    expect(getByText('Follower Growth')).toBeTruthy();
  });

  it('renders follower segmentation section', () => {
    const navigation = useNavigation();
    const { getByText } = render(<OverviewScreen navigation={navigation} />);
    expect(getByText('Follower Segmentation')).toBeTruthy();
  });

  it('renders Add More button', () => {
    const navigation = useNavigation();
    const { getByText } = render(<OverviewScreen navigation={navigation} />);
    expect(getByText('+ Add More')).toBeTruthy();
  });
});
