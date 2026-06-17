import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddContentScreen from '../../../../screens/influencer/content/AddContentScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

describe('AddContentScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockGoBack.mockClear();
  });

  const navigation = { navigate: mockNavigate, goBack: mockGoBack } as any;

  it('renders without crashing', () => {
    const { getByText } = render(<AddContentScreen navigation={navigation} />);
    expect(getByText('Add Content')).toBeTruthy();
  });

  it('renders form field labels', () => {
    const { getByText } = render(<AddContentScreen navigation={navigation} />);
    expect(getByText('Type')).toBeTruthy();
    expect(getByText('Upload Media')).toBeTruthy();
    expect(getByText('Add Content URL')).toBeTruthy();
  });

  it('renders Select From Gallery button', () => {
    const { getByText } = render(<AddContentScreen navigation={navigation} />);
    expect(getByText('Select From Gallery')).toBeTruthy();
  });

  it('renders Save Changes button', () => {
    const { getByText } = render(<AddContentScreen navigation={navigation} />);
    expect(getByText('Save Changes')).toBeTruthy();
  });

  it('calls goBack when back button pressed', () => {
    const { getByText } = render(<AddContentScreen navigation={navigation} />);
    fireEvent.press(getByText('←'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('opens platform picker when dropdown pressed', () => {
    const { getAllByText, getByText } = render(
      <AddContentScreen navigation={navigation} />,
    );
    const dropdowns = getAllByText('Select Platform');
    fireEvent.press(dropdowns[dropdowns.length - 1]);
    expect(getByText('Instagram')).toBeTruthy();
    expect(getByText('YouTube')).toBeTruthy();
  });

  it('opens content type picker when dropdown pressed', () => {
    const { getByText } = render(<AddContentScreen navigation={navigation} />);
    fireEvent.press(getByText('Select Content Type'));
    expect(getByText('Image')).toBeTruthy();
    expect(getByText('Reel')).toBeTruthy();
  });
});
