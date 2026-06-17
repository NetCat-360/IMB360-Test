import paymentReducer, {
  setSelectedTab,
  setTopupAmount,
  purchasePoints,
  setWithdrawalAmount,
  requestWithdrawal,
  addBankDetails,
  addUpiDetails,
  resetPaymentCenter,
} from '../../../store/slices/paymentSlice';

describe('paymentSlice', () => {
  it('should return initial state', () => {
    const state = paymentReducer(undefined, { type: 'unknown' });
    expect(state.selectedTab).toBe('purchase');
    expect(state.currentBalance).toBe(26700);
    expect(state.bankAdded).toBe(false);
    expect(state.upiAdded).toBe(false);
  });

  it('should handle setSelectedTab', () => {
    const state = paymentReducer(undefined, setSelectedTab('release'));
    expect(state.selectedTab).toBe('release');
  });

  it('should handle setTopupAmount', () => {
    const state = paymentReducer(undefined, setTopupAmount('1000'));
    expect(state.topupAmount).toBe('1000');
  });

  it('should handle purchasePoints with amount >= 500', () => {
    const withAmount = paymentReducer(undefined, setTopupAmount('1000'));
    const state = paymentReducer(withAmount, purchasePoints());
    expect(state.currentBalance).toBe(27700);
    expect(state.topupAmount).toBe('');
  });

  it('should handle purchasePoints with amount < 500', () => {
    const withAmount = paymentReducer(undefined, setTopupAmount('200'));
    const state = paymentReducer(withAmount, purchasePoints());
    expect(state.currentBalance).toBe(26700);
    expect(state.topupAmount).toBe('200');
  });

  it('should handle purchasePoints with invalid amount', () => {
    const withAmount = paymentReducer(undefined, setTopupAmount('abc'));
    const state = paymentReducer(withAmount, purchasePoints());
    expect(state.currentBalance).toBe(26700);
  });

  it('should handle setWithdrawalAmount', () => {
    const state = paymentReducer(undefined, setWithdrawalAmount('5000'));
    expect(state.withdrawalAmount).toBe('5000');
  });

  it('should handle requestWithdrawal with valid amount', () => {
    const withAmount = paymentReducer(undefined, setWithdrawalAmount('5000'));
    const state = paymentReducer(withAmount, requestWithdrawal());
    expect(state.availableWithdrawal).toBe(21350);
    expect(state.reservedAmount).toBe(5350);
    expect(state.withdrawalAmount).toBe('');
  });

  it('should handle requestWithdrawal with amount < 500', () => {
    const withAmount = paymentReducer(undefined, setWithdrawalAmount('100'));
    const state = paymentReducer(withAmount, requestWithdrawal());
    expect(state.availableWithdrawal).toBe(26350);
    expect(state.reservedAmount).toBe(350);
  });

  it('should handle requestWithdrawal exceeding available balance', () => {
    const withAmount = paymentReducer(undefined, setWithdrawalAmount('500000'));
    const state = paymentReducer(withAmount, requestWithdrawal());
    expect(state.availableWithdrawal).toBe(26350);
    expect(state.reservedAmount).toBe(350);
  });

  it('should handle addBankDetails', () => {
    const state = paymentReducer(undefined, addBankDetails('1234567890'));
    expect(state.bankAdded).toBe(true);
    expect(state.bankAccount).toBe('1234567890');
  });

  it('should handle addUpiDetails', () => {
    const state = paymentReducer(undefined, addUpiDetails('test@upi'));
    expect(state.upiAdded).toBe(true);
    expect(state.upiId).toBe('test@upi');
  });

  it('should handle resetPaymentCenter', () => {
    const modified = paymentReducer(undefined, setTopupAmount('500'));
    const withRelease = paymentReducer(modified, setSelectedTab('release'));
    const state = paymentReducer(withRelease, resetPaymentCenter());
    expect(state.selectedTab).toBe('purchase');
    expect(state.currentBalance).toBe(26700);
    expect(state.topupAmount).toBe('');
    expect(state.withdrawalAmount).toBe('');
  });
});
