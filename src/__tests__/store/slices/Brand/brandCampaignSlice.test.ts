import brandCampaignReducer, {
  setSelectedTab,
  startCampaign,
  completeCampaign,
} from '../../../../store/slices/Brand/brandCampaignSlice';

describe('brandCampaignSlice', () => {
  it('should return initial state', () => {
    const state = brandCampaignReducer(undefined, { type: 'unknown' });
    expect(state.selectedTab).toBe('ongoing');
    expect(state.campaigns).toHaveLength(8);
  });

  it('should handle setSelectedTab', () => {
    const state = brandCampaignReducer(undefined, setSelectedTab('history'));
    expect(state.selectedTab).toBe('history');
  });

  it('should handle startCampaign', () => {
    const state = brandCampaignReducer(undefined, startCampaign(5));
    const campaign = state.campaigns.find(c => c.id === 5);
    expect(campaign?.status).toBe('ongoing');
  });

  it('should not affect non-existent campaign on startCampaign', () => {
    const state = brandCampaignReducer(undefined, startCampaign(999));
    expect(state.campaigns).toHaveLength(8);
  });

  it('should handle completeCampaign', () => {
    const state = brandCampaignReducer(undefined, completeCampaign(1));
    const campaign = state.campaigns.find(c => c.id === 1);
    expect(campaign?.status).toBe('history');
    expect(campaign?.totalSpent).toBe(1400);
  });

  it('should handle completeCampaign on campaign without totalSpent initially', () => {
    const state = brandCampaignReducer(undefined, completeCampaign(5));
    const campaign = state.campaigns.find(c => c.id === 5);
    expect(campaign?.status).toBe('history');
    expect(campaign?.totalSpent).toBeDefined();
  });

  it('should not affect non-existent campaign on completeCampaign', () => {
    const state = brandCampaignReducer(undefined, completeCampaign(999));
    expect(state.campaigns).toHaveLength(8);
  });
});
