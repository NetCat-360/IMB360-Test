import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditPricingScreen from '../../../../screens/influencer/pricing/EditPricingScreen';

const mockGoBack = jest.fn();

describe('EditPricingScreen', () => {
  beforeEach(() => {
    mockGoBack.mockClear();
  });

  it('renders without crashing', () => {
    const { getByText } = render(
      <EditPricingScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: { pricingId: '123' } } as any}
      />,
    );
    expect(getByText('Edit Pricing Screen')).toBeTruthy();
  });

  it('displays pricing ID from route params', () => {
    const { getByText } = render(
      <EditPricingScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: { pricingId: 'abc-456' } } as any}
      />,
    );
    expect(getByText('Pricing ID: abc-456')).toBeTruthy();
  });

  it('displays "No ID" when no pricingId provided', () => {
    const { getByText } = render(
      <EditPricingScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: {} } as any}
      />,
    );
    expect(getByText('Pricing ID: No ID')).toBeTruthy();
  });

  it('renders Go Back button', () => {
    const { getByText } = render(
      <EditPricingScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: { pricingId: '1' } } as any}
      />,
    );
    expect(getByText('Go Back')).toBeTruthy();
  });

  it('calls goBack when Go Back pressed', () => {
    const { getByText } = render(
      <EditPricingScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: { pricingId: '1' } } as any}
      />,
    );
    fireEvent.press(getByText('Go Back'));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
