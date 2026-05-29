import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ContentScreen from '../../src/screens/content/ContentScreen';

const { useNavigation } = jest.requireMock('@react-navigation/native');

describe('ContentScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header title', () => {
    const navigation = useNavigation();
    const { getByText } = render(<ContentScreen navigation={navigation} />);
    expect(getByText('Content')).toBeTruthy();
  });

  it('renders filter tabs', () => {
    const navigation = useNavigation();
    const { getByText } = render(<ContentScreen navigation={navigation} />);
    expect(getByText('All')).toBeTruthy();
  });

  it('renders empty state when no content', () => {
    const navigation = useNavigation();
    const { getByText } = render(<ContentScreen navigation={navigation} />);
    expect(getByText('No content yet')).toBeTruthy();
  });

  it('renders Add Content button', () => {
    const navigation = useNavigation();
    const { getByText } = render(<ContentScreen navigation={navigation} />);
    expect(getByText('+ Add')).toBeTruthy();
  });

  it('navigates to AddContent on + Add press', () => {
    const navigation = useNavigation();
    const { getByText } = render(<ContentScreen navigation={navigation} />);
    fireEvent.press(getByText('+ Add'));
    expect(navigation.navigate).toHaveBeenCalledWith('AddContent');
  });

  it('navigates back on back press', () => {
    const navigation = useNavigation();
    const { getByText } = render(<ContentScreen navigation={navigation} />);
    fireEvent.press(getByText('\u2190'));
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
