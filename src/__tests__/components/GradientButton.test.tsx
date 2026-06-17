import React from 'react';
import { Image } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import GradientButton from '../../components/GradientButton';

jest.mock('react-native-linear-gradient', () => ({ children }: { children: React.ReactNode }) => <>{children}</>);

describe('GradientButton', () => {
  it('renders the title', () => {
    const { getByText } = render(<GradientButton title="Press Me" />);
    expect(getByText('Press Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<GradientButton title="Press Me" onPress={onPress} />);
    fireEvent.press(getByText('Press Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders icon when icon prop is provided', () => {
    const { UNSAFE_getByType } = render(
      <GradientButton title="Test" icon={require('../../assets/images/backbutton.png')} />,
    );
    expect(UNSAFE_getByType(Image)).toBeTruthy();
  });

  it('does not render icon when icon prop is not provided', () => {
    const { UNSAFE_getByType } = render(<GradientButton title="Test" />);
    expect(() => UNSAFE_getByType(Image)).toThrow();
  });
});
