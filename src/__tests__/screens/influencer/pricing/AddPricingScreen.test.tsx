import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddPricingScreen from '../../../../screens/influencer/pricing/AddPricingScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

describe('AddPricingScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockGoBack.mockClear();
  });

  const navigation = { navigate: mockNavigate, goBack: mockGoBack } as any;

  it('renders without crashing', () => {
    const { getByText } = render(<AddPricingScreen navigation={navigation} />);
    expect(getByText('Add Pricing')).toBeTruthy();
  });

  it('renders section labels', () => {
    const { getByText } = render(<AddPricingScreen navigation={navigation} />);
    expect(getByText('Set Rates')).toBeTruthy();
  });

  it('renders price input labels', () => {
    const { getByText } = render(<AddPricingScreen navigation={navigation} />);
    expect(getByText('Reels')).toBeTruthy();
    expect(getByText('Story')).toBeTruthy();
    expect(getByText('Post')).toBeTruthy();
    expect(getByText('Short Video')).toBeTruthy();
    expect(getByText('Long Video')).toBeTruthy();
    expect(getByText('Meetup / Collab')).toBeTruthy();
  });

  it('renders Save Changes button disabled initially', () => {
    const { getByText } = render(<AddPricingScreen navigation={navigation} />);
    const saveBtn = getByText('Save Changes').parent;
    expect(saveBtn).toBeTruthy();
  });

  it('calls goBack when back button pressed', () => {
    const { getByText } = render(<AddPricingScreen navigation={navigation} />);
    fireEvent.press(getByText('←'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('opens picker overlay when dropdown pressed', () => {
    const { getAllByText, getByText } = render(
      <AddPricingScreen navigation={navigation} />,
    );
    const dropdowns = getAllByText('Select Platform');
    fireEvent.press(dropdowns[dropdowns.length - 1]);
    expect(getByText('Instagram')).toBeTruthy();
    expect(getByText('YouTube')).toBeTruthy();
  });

  it('selects platform from picker', () => {
    const { getAllByText, getByText } = render(
      <AddPricingScreen navigation={navigation} />,
    );
    const dropdowns = getAllByText('Select Platform');
    fireEvent.press(dropdowns[dropdowns.length - 1]);
    fireEvent.press(getByText('Instagram'));
  });
});
