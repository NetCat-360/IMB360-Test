import { store } from '../../store/store';

describe('Redux store', () => {
  const reducerKeys = [
    'auth',
    'campaign',
    'asset',
    'addAsset',
    'overview',
    'analytics',
    'brandOverview',
    'brandCampaign',
    'brandCampaignBids',
    'totalSpend',
    'brandCampaignTab',
    'createCampaign',
    'chat',
    'payment',
  ];

  it('should initialize without error', () => {
    expect(store).toBeDefined();
    expect(store.getState()).toBeDefined();
  });

  it('should have all expected reducer keys', () => {
    const state = store.getState();
    reducerKeys.forEach(key => {
      expect(state).toHaveProperty(key);
    });
  });

  it('should have exactly the expected reducer keys', () => {
    const stateKeys = Object.keys(store.getState());
    expect(stateKeys.sort()).toEqual(reducerKeys.sort());
  });

  it('should return the initial state for each slice', () => {
    const state = store.getState();
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.campaign.campaigns).toHaveLength(3);
    expect(state.asset.assets).toHaveLength(1);
    expect(state.addAsset.assetName).toBe('');
    expect(state.overview.selectedMonth).toBe('June 2026');
    expect(state.analytics.selectedMonth).toBe('June 2026');
    expect(state.brandOverview.selectedMonth).toBe('June 2026');
    expect(state.brandCampaign.selectedTab).toBe('ongoing');
    expect(state.brandCampaignBids.selectedTab).toBe('campaignBids');
    expect(state.totalSpend.selectedYear).toBe('2025');
    expect(state.brandCampaignTab.searchQuery).toBe('');
    expect(state.createCampaign.currentStep).toBe(1);
    expect(state.chat.chats).toHaveLength(3);
    expect(state.payment.selectedTab).toBe('purchase');
  });
});
