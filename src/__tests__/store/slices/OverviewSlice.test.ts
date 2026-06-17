import overviewReducer, {
  setMonth,
  setOverviewData,
} from '../../../store/slices/OverviewSlice';

describe('OverviewSlice', () => {
  it('should return initial state', () => {
    const state = overviewReducer(undefined, { type: 'unknown' });
    expect(state.selectedMonth).toBe('June 2026');
    expect(state.availableMonths).toHaveLength(6);
    expect(state.monthlyData['June 2026']).toBeDefined();
    expect(state.monthlyData['June 2026'].platforms).toHaveLength(4);
  });

  it('should handle setMonth', () => {
    const state = overviewReducer(undefined, setMonth('January 2026'));
    expect(state.selectedMonth).toBe('January 2026');
  });

  it('should handle setOverviewData with partial update', () => {
    const state = overviewReducer(
      undefined,
      setOverviewData({ selectedMonth: 'March 2026' }),
    );
    expect(state.selectedMonth).toBe('March 2026');
    expect(state.availableMonths).toHaveLength(6);
  });

  it('should handle setOverviewData with new monthlyData', () => {
    const state = overviewReducer(
      undefined,
      setOverviewData({
        availableMonths: ['July 2026'],
        monthlyData: {},
      }),
    );
    expect(state.availableMonths).toEqual(['July 2026']);
    expect(state.monthlyData).toEqual({});
    expect(state.selectedMonth).toBe('June 2026');
  });
});
