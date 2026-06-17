import brandOverviewReducer, {
  setBrandMonth,
  setBrandOverviewData,
} from '../../../../store/slices/Brand/brandOverviewSlice';

describe('brandOverviewSlice', () => {
  it('should return initial state', () => {
    const state = brandOverviewReducer(undefined, { type: 'unknown' });
    expect(state.selectedMonth).toBe('June 2026');
    expect(state.availableMonths).toHaveLength(6);
    expect(state.monthlyData['June 2026']).toBeDefined();
    expect(state.monthlyData['June 2026'].runningCampaigns).toHaveLength(3);
  });

  it('should handle setBrandMonth', () => {
    const state = brandOverviewReducer(undefined, setBrandMonth('March 2026'));
    expect(state.selectedMonth).toBe('March 2026');
  });

  it('should handle setBrandOverviewData', () => {
    const state = brandOverviewReducer(
      undefined,
      setBrandOverviewData({ selectedMonth: 'January 2026' }),
    );
    expect(state.selectedMonth).toBe('January 2026');
  });
});
