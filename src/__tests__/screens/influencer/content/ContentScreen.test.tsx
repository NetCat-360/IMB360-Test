import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ContentScreen from '../../../../screens/influencer/content/ContentScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

describe('ContentScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockGoBack.mockClear();
  });

  const navigation = { navigate: mockNavigate, goBack: mockGoBack } as any;

  it('renders without crashing', () => {
    const { getByText } = render(<ContentScreen navigation={navigation} />);
    expect(getByText('Content')).toBeTruthy();
  });

  it('renders empty state when no content', () => {
    const { getByText } = render(<ContentScreen navigation={navigation} />);
    expect(getByText('No content yet')).toBeTruthy();
    expect(getByText('+ Add Content')).toBeTruthy();
  });

  it('renders + Add header button', () => {
    const { getByText } = render(<ContentScreen navigation={navigation} />);
    expect(getByText('+ Add')).toBeTruthy();
  });

  it('navigates to AddContent on header add press', () => {
    const { getByText } = render(<ContentScreen navigation={navigation} />);
    fireEvent.press(getByText('+ Add'));
    expect(mockNavigate).toHaveBeenCalledWith('AddContent');
  });

  it('navigates to AddContent on empty state add press', () => {
    const { getByText } = render(<ContentScreen navigation={navigation} />);
    fireEvent.press(getByText('+ Add Content'));
    expect(mockNavigate).toHaveBeenCalledWith('AddContent');
  });

  it('renders filter tabs', () => {
    const { getByText } = render(<ContentScreen navigation={navigation} />);
    expect(getByText('All')).toBeTruthy();
  });

  it('calls goBack when back button pressed', () => {
    const { getByText } = render(<ContentScreen navigation={navigation} />);
    fireEvent.press(getByText('←'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('renders empty state subtitle', () => {
    const { getByText } = render(<ContentScreen navigation={navigation} />);
    expect(
      getByText(
        'Add your first piece of content to show brands what you can create.',
      ),
    ).toBeTruthy();
  });
});
