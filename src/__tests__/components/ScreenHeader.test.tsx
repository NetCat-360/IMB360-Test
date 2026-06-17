import React from 'react';
import { Image } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import ScreenHeader from '../../components/ScreenHeader';

jest.mock('react-native-linear-gradient', () => ({ children }: { children: React.ReactNode }) => <>{children}</>);

describe('ScreenHeader', () => {
  it('renders the title', () => {
    const { getByText } = render(<ScreenHeader title="Test Title" />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders back button when onBack is provided', () => {
    const { UNSAFE_getByType } = render(<ScreenHeader title="Test" onBack={() => {}} />);
    expect(UNSAFE_getByType(Image)).toBeTruthy();
  });

  it('does not render back button when onBack is not provided', () => {
    const { UNSAFE_getByType } = render(<ScreenHeader title="Test" />);
    expect(() => UNSAFE_getByType(Image)).toThrow();
  });

  it('calls onBack when back button is pressed', () => {
    const onBack = jest.fn();
    const { UNSAFE_getByType } = render(<ScreenHeader title="Test" onBack={onBack} />);
    const image = UNSAFE_getByType(Image);
    fireEvent.press(image.parent!);
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
