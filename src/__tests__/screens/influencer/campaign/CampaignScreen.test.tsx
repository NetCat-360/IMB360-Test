import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CampaignScreen from '../../../../screens/influencer/campaign/CampaignScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

describe('CampaignScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<CampaignScreen />);
    expect(getByText(/BROWSE/)).toBeTruthy();
    expect(getByText('CAMPAIGNS')).toBeTruthy();
  });

  it('renders AI badge', () => {
    const { getByText } = render(<CampaignScreen />);
    expect(getByText('AI Browse Campaign')).toBeTruthy();
  });

  it('renders filter toggle', () => {
    const { getByText } = render(<CampaignScreen />);
    expect(getByText('Filter Result')).toBeTruthy();
  });

  it('renders campaign card with company name', () => {
    const { getByText } = render(<CampaignScreen />);
    expect(getByText('WebHelp365')).toBeTruthy();
  });

  it('renders campaign metrics', () => {
    const { getByText } = render(<CampaignScreen />);
    expect(getByText('BUDGET RANGE')).toBeTruthy();
    expect(getByText('DEADLINE')).toBeTruthy();
    expect(getByText('Oct 15, 2024')).toBeTruthy();
  });

  it('renders campaign requirements', () => {
    const { getByText } = render(<CampaignScreen />);
    expect(getByText('Campaign Requirements')).toBeTruthy();
    expect(getByText('MIN. FOLLOWERS')).toBeTruthy();
    expect(getByText('MIN. ENGAGEMENT')).toBeTruthy();
  });

  it('shows View button on campaign card', () => {
    const { getByText } = render(<CampaignScreen />);
    expect(getByText('View')).toBeTruthy();
  });

  it('expands campaign details on View press', () => {
    const { getByText } = render(<CampaignScreen />);
    fireEvent.press(getByText('View'));
    expect(getByText('Target Audience')).toBeTruthy();
    expect(getByText('Campaign Categories')).toBeTruthy();
    expect(getByText('Deliverables')).toBeTruthy();
  });

  it('shows Apply Now and Hide details in expanded state', () => {
    const { getByText } = render(<CampaignScreen />);
    fireEvent.press(getByText('View'));
    expect(getByText('Apply Now')).toBeTruthy();
    expect(getByText('Hide details')).toBeTruthy();
  });

  it('navigates to ApplyCampaign on Apply Now press', () => {
    const { getByText } = render(<CampaignScreen />);
    fireEvent.press(getByText('View'));
    fireEvent.press(getByText('Apply Now'));
    expect(mockNavigate).toHaveBeenCalledWith('ApplyCampaign', { campaignId: '1' });
  });
});
