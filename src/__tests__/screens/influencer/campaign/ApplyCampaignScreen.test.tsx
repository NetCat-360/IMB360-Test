import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ApplyCampaignScreen from '../../../../screens/influencer/campaign/ApplyCampaignScreen';

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

const mockGoBack = jest.fn();

describe('ApplyCampaignScreen', () => {
  beforeEach(() => {
    mockGoBack.mockClear();
  });

  it('renders without crashing', () => {
    const { getByText } = render(
      <ApplyCampaignScreen navigation={{ goBack: mockGoBack } as any} />,
    );
    expect(getByText(/APPLY FOR/)).toBeTruthy();
  });

  it('renders meta header ribbon', () => {
    const { getByText } = render(
      <ApplyCampaignScreen navigation={{ goBack: mockGoBack } as any} />,
    );
    expect(getByText('BUDGET RANGE')).toBeTruthy();
    expect(getByText('TIMELINE')).toBeTruthy();
    expect(getByText('DEADLINE')).toBeTruthy();
    expect(getByText('Oct 15, 2024')).toBeTruthy();
  });

  it('renders form labels', () => {
    const { getByText } = render(
      <ApplyCampaignScreen navigation={{ goBack: mockGoBack } as any} />,
    );
    expect(getByText(/Proposed Rate/)).toBeTruthy();
    expect(getByText('Proposed Timeline')).toBeTruthy();
    expect(getByText('Campaign Proposal')).toBeTruthy();
    expect(getByText('Relevant Experience')).toBeTruthy();
    expect(getByText('Portfolio Sample')).toBeTruthy();
  });

  it('renders checkbox and terms text', () => {
    const { getByText } = render(
      <ApplyCampaignScreen navigation={{ goBack: mockGoBack } as any} />,
    );
    expect(
      getByText(
        /I agree to the Terms & Conditions/,
      ),
    ).toBeTruthy();
  });

  it('renders cancel and submit buttons', () => {
    const { getByText } = render(
      <ApplyCampaignScreen navigation={{ goBack: mockGoBack } as any} />,
    );
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Submit Application')).toBeTruthy();
  });

  it('calls goBack when Cancel pressed', () => {
    const { getByText } = render(
      <ApplyCampaignScreen navigation={{ goBack: mockGoBack } as any} />,
    );
    fireEvent.press(getByText('Cancel'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('renders application tips', () => {
    const { getByText } = render(
      <ApplyCampaignScreen navigation={{ goBack: mockGoBack } as any} />,
    );
    expect(getByText('Application Tips')).toBeTruthy();
  });

  it('renders submit button', () => {
    const { getByText } = render(
      <ApplyCampaignScreen navigation={{ goBack: mockGoBack } as any} />,
    );
    expect(getByText('Submit Application')).toBeTruthy();
  });
});
