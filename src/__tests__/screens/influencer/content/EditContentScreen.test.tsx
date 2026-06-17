import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditContentScreen from '../../../../screens/influencer/content/EditContentScreen';

const mockGoBack = jest.fn();

describe('EditContentScreen', () => {
  beforeEach(() => {
    mockGoBack.mockClear();
  });

  it('renders without crashing', () => {
    const { getByText } = render(
      <EditContentScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: { contentId: '456' } } as any}
      />,
    );
    expect(getByText('Edit Content Screen')).toBeTruthy();
  });

  it('displays content ID from route params', () => {
    const { getByText } = render(
      <EditContentScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: { contentId: 'content-789' } } as any}
      />,
    );
    expect(getByText('Content ID: content-789')).toBeTruthy();
  });

  it('displays "No ID" when no contentId provided', () => {
    const { getByText } = render(
      <EditContentScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: {} } as any}
      />,
    );
    expect(getByText('Content ID: No ID')).toBeTruthy();
  });

  it('renders Go Back button', () => {
    const { getByText } = render(
      <EditContentScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: { contentId: '1' } } as any}
      />,
    );
    expect(getByText('Go Back')).toBeTruthy();
  });

  it('calls goBack when Go Back pressed', () => {
    const { getByText } = render(
      <EditContentScreen
        navigation={{ goBack: mockGoBack } as any}
        route={{ params: { contentId: '1' } } as any}
      />,
    );
    fireEvent.press(getByText('Go Back'));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
