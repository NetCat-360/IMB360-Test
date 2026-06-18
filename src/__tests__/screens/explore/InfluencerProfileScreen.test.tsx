import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InfluencerProfileScreen from '../../../screens/explore/InfluencerProfileScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), pop: jest.fn(), replace: jest.fn() } as any),
}));

jest.mock('react-native-linear-gradient', () => ({ children, ...props }: any) => {
  const React = require('react');
  const { View } = require('react-native');
  return <View {...props}>{children}</View>;
});

jest.mock('react-native-vector-icons/Ionicons', () => 'IoniconsIcon');

jest.mock('react-native-reanimated', () => {
  const RN = require('react-native');
  const mockView = RN.View;
  const createAnim = () => ({ duration: () => ({}) });
  return {
    View: mockView,
    Text: RN.Text,
    ScrollView: RN.ScrollView,
    FlatList: RN.FlatList,
    Image: RN.Image,
    createAnimatedComponent: (Component: any) => Component,
    useSharedValue: (val: any) => ({ value: val }),
    useAnimatedStyle: (cb: any) => cb(),
    useDerivedValue: (cb: any) => ({ value: cb() }),
    withTiming: (val: any) => val,
    withSpring: (val: any) => val,
    withRepeat: (val: any) => val,
    withSequence: (...vals: any[]) => vals[vals.length - 1],
    interpolate: () => 0,
    Easing: { inOut: (e: any) => e },
    Extrapolation: { CLAMP: 'clamp' },
    runOnJS: (fn: any) => fn,
    runOnUI: (fn: any) => fn,
    SlideInRight: createAnim(),
    SlideOutLeft: createAnim(),
    SlideInLeft: createAnim(),
    SlideOutRight: createAnim(),
    Animated: { View: mockView },
    default: { View: mockView },
  };
});

describe('InfluencerProfileScreen', () => {
  it('renders influencer name', () => {
    const { getByText } = render(<InfluencerProfileScreen />);
    expect(getByText('Rage')).toBeTruthy();
  });

  it('renders handle', () => {
    const { getAllByText } = render(<InfluencerProfileScreen />);
    expect(getAllByText('@ragecodess').length).toBeGreaterThanOrEqual(1);
  });

  it('renders bio text', () => {
    const { getByText } = render(<InfluencerProfileScreen />);
    expect(getByText('An I.T. Girl | Go Dev | Digital Creator')).toBeTruthy();
  });

  it('renders stats dashboard', () => {
    const { getAllByText, getByText } = render(<InfluencerProfileScreen />);
    expect(getByText('Following')).toBeTruthy();
    expect(getAllByText('Followers').length).toBeGreaterThanOrEqual(1);
    expect(getByText('Engagement')).toBeTruthy();
    expect(getByText('Rating')).toBeTruthy();
  });

  it('renders action buttons', () => {
    const { getByText } = render(<InfluencerProfileScreen />);
    expect(getByText('Follow')).toBeTruthy();
    expect(getByText('Message')).toBeTruthy();
  });

  it('renders segmented tabs', () => {
    const { getByText } = render(<InfluencerProfileScreen />);
    expect(getByText('Overview')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
    expect(getByText('Pricing')).toBeTruthy();
  });

  it('switches to pricing tab', () => {
    const { getByText } = render(<InfluencerProfileScreen />);
    fireEvent.press(getByText('Pricing'));
    expect(getByText('Instagram')).toBeTruthy();
    expect(getByText('Facebook')).toBeTruthy();
    expect(getByText('Youtube')).toBeTruthy();
  });

  it('switches to content tab', () => {
    const { getByText, getAllByText } = render(<InfluencerProfileScreen />);
    fireEvent.press(getByText('Content'));
    expect(getAllByText('View').length).toBeGreaterThanOrEqual(1);
  });
});
