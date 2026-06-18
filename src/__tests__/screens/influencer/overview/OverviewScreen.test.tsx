import React from 'react';
import { render } from '@testing-library/react-native';
import OverviewScreen from '../../../../screens/influencer/overview/OverviewScreen';

const mockGoBack = jest.fn();

describe('OverviewScreen', () => {
  beforeEach(() => {
    mockGoBack.mockClear();
  });

  it('renders without crashing', () => {
    const { getByText } = render(
      <OverviewScreen navigation={{ goBack: mockGoBack } as any} />,
    );
    expect(getByText('Profile Overview')).toBeTruthy();
  });

  it('renders platform cards', () => {
    const { getAllByText } = render(
      <OverviewScreen navigation={{ goBack: mockGoBack } as any} />,
    );
    expect(getAllByText('@ragecodess').length).toBe(4);
    expect(getAllByText('Followers').length).toBeGreaterThanOrEqual(1);
    expect(getAllByText('3.76K').length).toBeGreaterThanOrEqual(1);
  });

  it('renders follower growth section', () => {
    const { getByText } = render(
      <OverviewScreen navigation={{ goBack: mockGoBack } as any} />,
    );
    expect(getByText('Follower Growth')).toBeTruthy();
    expect(getByText('June 2024 ▾')).toBeTruthy();
  });

  it('renders follower segmentation', () => {
    const { getByText } = render(
      <OverviewScreen navigation={{ goBack: mockGoBack } as any} />,
    );
    expect(getByText('Follower Segmentation')).toBeTruthy();
    expect(getByText('Below 18 years old')).toBeTruthy();
    expect(getByText('18-24 years old')).toBeTruthy();
  });

  it('renders "Add More" button', () => {
    const { getByText } = render(
      <OverviewScreen navigation={{ goBack: mockGoBack } as any} />,
    );
    expect(getByText('+ Add More')).toBeTruthy();
  });

  it('renders all four platform sections', () => {
    const { getByText } = render(
      <OverviewScreen navigation={{ goBack: mockGoBack } as any} />,
    );
    expect(getByText('Connected Platforms')).toBeTruthy();
  });

  it('renders chart coming soon placeholder', () => {
    const { getByText } = render(
      <OverviewScreen navigation={{ goBack: mockGoBack } as any} />,
    );
    expect(getByText('📈  Chart coming soon')).toBeTruthy();
  });
});
