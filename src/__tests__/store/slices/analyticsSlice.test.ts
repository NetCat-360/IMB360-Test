import analyticsReducer, {
  setMonth,
  setAnalyticsData,
} from '../../../store/slices/analyticsSlice';

describe('analyticsSlice', () => {
  it('should return initial state', () => {
    const state = analyticsReducer(undefined, { type: 'unknown' });
    expect(state.selectedMonth).toBe('June 2026');
    expect(state.availableMonths).toHaveLength(6);
    expect(state.stats.totalReach).toBe('1.2M');
    expect(state.platformDistribution).toHaveLength(3);
    expect(state.audienceInsights.ageGroups).toHaveLength(3);
    expect(state.growthInsights).toHaveLength(3);
    expect(state.smartRecommendations).toHaveLength(2);
  });

  it('should handle setMonth', () => {
    const state = analyticsReducer(undefined, setMonth('April 2026'));
    expect(state.selectedMonth).toBe('April 2026');
  });

  it('should handle setAnalyticsData', () => {
    const partial = {
      stats: { totalReach: '2.5M', totalEngagement: '60K', avgER: '4.1%', totalSpent: '$5K' },
    };
    const state = analyticsReducer(undefined, setAnalyticsData(partial));
    expect(state.stats.totalReach).toBe('2.5M');
    expect(state.selectedMonth).toBe('June 2026');
    expect(state.platformDistribution).toHaveLength(3);
  });

  it('should handle setAnalyticsData with empty performance data', () => {
    const state = analyticsReducer(
      undefined,
      setAnalyticsData({ performanceData: [], performanceLabels: [] }),
    );
    expect(state.performanceData).toEqual([]);
    expect(state.performanceLabels).toEqual([]);
  });
});
