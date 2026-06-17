import totalSpendReducer, {
  setSelectedYear,
  setSelectedTab,
} from '../../../../store/slices/Brand/totalSpendSlice';

describe('totalSpendSlice', () => {
  it('should return initial state', () => {
    const state = totalSpendReducer(undefined, { type: 'unknown' });
    expect(state.selectedYear).toBe('2025');
    expect(state.selectedTab).toBe('campaign');
    expect(state.years).toEqual(['2025', '2024', '2023']);
    expect(state.spendHistory).toHaveLength(3);
  });

  it('should handle setSelectedYear', () => {
    const state = totalSpendReducer(undefined, setSelectedYear('2024'));
    expect(state.selectedYear).toBe('2024');
  });

  it('should handle setSelectedTab', () => {
    const state = totalSpendReducer(undefined, setSelectedTab('influencer'));
    expect(state.selectedTab).toBe('influencer');
  });

  it('should handle setSelectedTab with paymentDate', () => {
    const state = totalSpendReducer(undefined, setSelectedTab('paymentDate'));
    expect(state.selectedTab).toBe('paymentDate');
  });

  it('should handle setSelectedTab back to campaign', () => {
    const modified = totalSpendReducer(undefined, setSelectedTab('influencer'));
    const state = totalSpendReducer(modified, setSelectedTab('campaign'));
    expect(state.selectedTab).toBe('campaign');
  });
});
