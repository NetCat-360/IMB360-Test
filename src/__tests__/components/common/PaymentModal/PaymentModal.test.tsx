import React from 'react';
import { Modal } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import PaymentModal from '../../../../components/common/PaymentModal/PaymentModal';

jest.mock('react-native-linear-gradient', () => ({ children }: { children: React.ReactNode }) => <>{children}</>);

describe('PaymentModal', () => {
  it('renders content when visible is true', () => {
    const { getByText } = render(
      <PaymentModal visible={true} onClose={() => {}} onConfirm={() => {}} />,
    );
    expect(getByText('Confirm Submission?')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('does not render content when visible is false', () => {
    const { queryByText } = render(
      <PaymentModal visible={false} onClose={() => {}} onConfirm={() => {}} />,
    );
    expect(queryByText('Confirm Submission?')).toBeNull();
  });

  it('shows deduction amount', () => {
    const { getByText } = render(
      <PaymentModal visible={true} onClose={() => {}} onConfirm={() => {}} deductionAmount={10} />,
    );
    expect(getByText('₱ 10 will be deducted as you submit.')).toBeTruthy();
  });

  it('shows current balance with default value', () => {
    const { getByText } = render(
      <PaymentModal visible={true} onClose={() => {}} onConfirm={() => {}} />,
    );
    expect(getByText('₱ 1,200')).toBeTruthy();
  });

  it('shows formatted balance', () => {
    const { getByText } = render(
      <PaymentModal visible={true} onClose={() => {}} onConfirm={() => {}} currentBalance={2500} />,
    );
    expect(getByText('₱ 2,500')).toBeTruthy();
  });

  it('calls onConfirm when Confirm button is pressed', () => {
    const onConfirm = jest.fn();
    const { getByText } = render(
      <PaymentModal visible={true} onClose={() => {}} onConfirm={onConfirm} />,
    );
    fireEvent.press(getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Cancel is pressed', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <PaymentModal visible={true} onClose={onClose} onConfirm={() => {}} />,
    );
    fireEvent.press(getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Modal onRequestClose is triggered', () => {
    const onClose = jest.fn();
    const { UNSAFE_getByType } = render(
      <PaymentModal visible={true} onClose={onClose} onConfirm={() => {}} />,
    );
    const modal = UNSAFE_getByType(Modal);
    modal.props.onRequestClose();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
