import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CampaignURLScreen from '../../../../screens/influencer/CampaignQueue/CampaignURLScreen';

const mockGoBack = jest.fn();

jest.mock('react-native/Libraries/Alert/Alert', () => {
  const mockAlert = jest.fn();
  return { alert: mockAlert, default: { alert: mockAlert } };
}, { virtual: true });

describe('CampaignURLScreen', () => {
  beforeEach(() => {
    mockGoBack.mockClear();
  });

  it('renders without crashing', () => {
    const { getAllByText } = render(
      <CampaignURLScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: { campaignId: 'camp-1' } } as any}
      />,
    );
    expect(getAllByText('Campaign URL').length).toBeGreaterThanOrEqual(1);
  });

  it('displays campaign ID from route params', () => {
    const { getByText } = render(
      <CampaignURLScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: { campaignId: 'camp-123' } } as any}
      />,
    );
    expect(getByText('camp-123')).toBeTruthy();
  });

  it('displays "No Campaign ID" when not provided', () => {
    const { getByText } = render(
      <CampaignURLScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: {} } as any}
      />,
    );
    expect(getByText('No Campaign ID')).toBeTruthy();
  });

  it('renders input field with placeholder', () => {
    const { getByPlaceholderText } = render(
      <CampaignURLScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: { campaignId: '1' } } as any}
      />,
    );
    expect(getByPlaceholderText('https://example.com')).toBeTruthy();
  });

  it('renders Submit URL button', () => {
    const { getByText } = render(
      <CampaignURLScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: { campaignId: '1' } } as any}
      />,
    );
    expect(getByText('Submit URL')).toBeTruthy();
  });

  it('shows validation alert when submitting empty URL', () => {
    const { getByText } = render(
      <CampaignURLScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: { campaignId: '1' } } as any}
      />,
    );
    fireEvent.press(getByText('Submit URL'));
    const Alert = require('react-native/Libraries/Alert/Alert');
    expect(Alert.alert).toHaveBeenCalledWith(
      'Validation Error',
      'Please enter a campaign URL.',
    );
  });

  it('calls goBack when back button pressed', () => {
    const { getByText } = render(
      <CampaignURLScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: { campaignId: '1' } } as any}
      />,
    );
    fireEvent.press(getByText('←'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('renders Campaign ID label', () => {
    const { getByText } = render(
      <CampaignURLScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: { campaignId: '1' } } as any}
      />,
    );
    expect(getByText('Campaign ID')).toBeTruthy();
  });

  it('pre-fills URL from route params', () => {
    const { getByDisplayValue } = render(
      <CampaignURLScreen
        navigation={{ goBack: mockGoBack } as any}
        route={
          {
            params: { campaignId: '1', url: 'https://existing.com' },
          } as any
        }
      />,
    );
    expect(getByDisplayValue('https://existing.com')).toBeTruthy();
  });
});
