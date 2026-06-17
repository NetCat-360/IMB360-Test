import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import TextField from '../../../../components/common/TextField/TextField';

describe('TextField', () => {
  it('renders input with provided value', () => {
    const { getByDisplayValue } = render(<TextField value="hello" onChangeText={() => {}} />);
    expect(getByDisplayValue('hello')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const { getByDisplayValue } = render(<TextField value="" onChangeText={onChangeText} />);
    fireEvent.changeText(getByDisplayValue(''), 'new text');
    expect(onChangeText).toHaveBeenCalledWith('new text');
  });

  it('renders label when label prop is provided', () => {
    const { getByText } = render(
      <TextField label="Email" value="" onChangeText={() => {}} />,
    );
    expect(getByText('Email')).toBeTruthy();
  });

  it('renders prefixComponent', () => {
    const { getByText } = render(
      <TextField value="" onChangeText={() => {}} prefixComponent={<Text>$</Text>} />,
    );
    expect(getByText('$')).toBeTruthy();
  });

  it('renders rightComponent', () => {
    const { getByText } = render(
      <TextField value="" onChangeText={() => {}} rightComponent={<Text>X</Text>} />,
    );
    expect(getByText('X')).toBeTruthy();
  });

  it('calls onFocus when input is focused', () => {
    const onFocus = jest.fn();
    const { getByDisplayValue } = render(
      <TextField value="" onChangeText={() => {}} onFocus={onFocus} />,
    );
    fireEvent(getByDisplayValue(''), 'focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when input is blurred', () => {
    const onBlur = jest.fn();
    const { getByDisplayValue } = render(
      <TextField value="" onChangeText={() => {}} onBlur={onBlur} />,
    );
    fireEvent(getByDisplayValue(''), 'blur');
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
