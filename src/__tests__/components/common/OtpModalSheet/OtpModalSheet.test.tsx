import React from 'react';
import { Modal, TextInput } from 'react-native';
import { render, fireEvent, act } from '@testing-library/react-native';
import { OtpModalSheet } from '../../../../components/common/OtpModalSheet/OtpModalSheet';

describe('OtpModalSheet', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders content when visible is true', () => {
    const { getByText } = render(
      <OtpModalSheet visible={true} onClose={() => {}} targetEmail="test@test.com" onVerify={() => {}} onResend={() => {}} />,
    );
    expect(getByText('Enter OTP')).toBeTruthy();
    expect(getByText('Verify')).toBeTruthy();
  });

  it('does not render content when visible is false', () => {
    const { queryByText } = render(
      <OtpModalSheet visible={false} onClose={() => {}} targetEmail="test@test.com" onVerify={() => {}} onResend={() => {}} />,
    );
    expect(queryByText('Enter OTP')).toBeNull();
  });

  it('shows target email', () => {
    const { getByText } = render(
      <OtpModalSheet visible={true} onClose={() => {}} targetEmail="user@example.com" onVerify={() => {}} onResend={() => {}} />,
    );
    expect(getByText(/user@example\.com/)).toBeTruthy();
  });

  it('renders 6 OTP input fields', () => {
    const { UNSAFE_getAllByType } = render(
      <OtpModalSheet visible={true} onClose={() => {}} targetEmail="test@test.com" onVerify={() => {}} onResend={() => {}} />,
    );
    expect(UNSAFE_getAllByType(TextInput)).toHaveLength(6);
  });

  it('shows "Resend in 30 sec" initially', () => {
    const { getByText } = render(
      <OtpModalSheet visible={true} onClose={() => {}} targetEmail="test@test.com" onVerify={() => {}} onResend={() => {}} />,
    );
    expect(getByText(/Resend in 30 sec/)).toBeTruthy();
  });

  it('shows "Resend OTP" after countdown ends', () => {
    const { getByText, queryByText } = render(
      <OtpModalSheet visible={true} onClose={() => {}} targetEmail="test@test.com" onVerify={() => {}} onResend={() => {}} />,
    );
    act(() => { jest.advanceTimersByTime(31000); });
    expect(queryByText(/Resend in/)).toBeNull();
    expect(getByText('Resend OTP')).toBeTruthy();
  });

  it('calls onResend when resend is pressed after countdown', () => {
    const onResend = jest.fn();
    const { getByText } = render(
      <OtpModalSheet visible={true} onClose={() => {}} targetEmail="test@test.com" onVerify={() => {}} onResend={onResend} />,
    );
    act(() => { jest.advanceTimersByTime(31000); });
    fireEvent.press(getByText('Resend OTP'));
    expect(onResend).toHaveBeenCalledTimes(1);
  });

  it('calls onVerify with the entered code when all digits entered', () => {
    const onVerify = jest.fn();
    const { getByText, UNSAFE_getAllByType } = render(
      <OtpModalSheet visible={true} onClose={() => {}} targetEmail="test@test.com" onVerify={onVerify} onResend={() => {}} />,
    );
    const inputs = UNSAFE_getAllByType(TextInput);
    fireEvent.changeText(inputs[0], '1');
    fireEvent.changeText(inputs[1], '2');
    fireEvent.changeText(inputs[2], '3');
    fireEvent.changeText(inputs[3], '4');
    fireEvent.changeText(inputs[4], '5');
    fireEvent.changeText(inputs[5], '6');
    fireEvent.press(getByText('Verify'));
    expect(onVerify).toHaveBeenCalledWith('123456');
  });

  it('handles pasted code entered in first input', () => {
    const onVerify = jest.fn();
    const { getByText, UNSAFE_getAllByType } = render(
      <OtpModalSheet visible={true} onClose={() => {}} targetEmail="test@test.com" onVerify={onVerify} onResend={() => {}} />,
    );
    const inputs = UNSAFE_getAllByType(TextInput);
    fireEvent.changeText(inputs[0], '654321');
    fireEvent.press(getByText('Verify'));
    expect(onVerify).toHaveBeenCalledWith('654321');
  });

  it('calls onClose when Modal onRequestClose is triggered', () => {
    const onClose = jest.fn();
    const { UNSAFE_getByType } = render(
      <OtpModalSheet visible={true} onClose={onClose} targetEmail="test@test.com" onVerify={() => {}} onResend={() => {}} />,
    );
    const modal = UNSAFE_getByType(Modal);
    modal.props.onRequestClose();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
