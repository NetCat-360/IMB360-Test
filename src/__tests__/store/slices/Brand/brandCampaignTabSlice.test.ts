import brandCampaignTabReducer, {
  setSearchQuery,
  setSelectedStatus,
  setCampaigns,
} from '../../../../store/slices/Brand/brandCampaignTabSlice';
import type { CampaignItem } from '../../../../store/slices/Brand/brandCampaignTabSlice';

describe('brandCampaignTabSlice', () => {
  const emptyCampaigns: CampaignItem[] = [];

  it('should return initial state', () => {
    const state = brandCampaignTabReducer(undefined, { type: 'unknown' });
    expect(state.campaigns).toHaveLength(2);
    expect(state.searchQuery).toBe('');
    expect(state.selectedStatus).toBe('All Status');
    expect(state.stats.activeCampaigns).toBe(6);
    expect(state.stats.totalReach).toBe('10.0K');
  });

  it('should handle setSearchQuery', () => {
    const state = brandCampaignTabReducer(undefined, setSearchQuery('IMB360'));
    expect(state.searchQuery).toBe('IMB360');
  });

  it('should handle setSearchQuery with empty string', () => {
    const state = brandCampaignTabReducer(undefined, setSearchQuery(''));
    expect(state.searchQuery).toBe('');
  });

  it('should handle setSelectedStatus', () => {
    const state = brandCampaignTabReducer(undefined, setSelectedStatus('Ongoing'));
    expect(state.selectedStatus).toBe('Ongoing');
  });

  it('should handle setSelectedStatus to Completed', () => {
    const state = brandCampaignTabReducer(undefined, setSelectedStatus('Completed'));
    expect(state.selectedStatus).toBe('Completed');
  });

  it('should handle setSelectedStatus to Paused', () => {
    const state = brandCampaignTabReducer(undefined, setSelectedStatus('Paused'));
    expect(state.selectedStatus).toBe('Paused');
  });

  it('should handle setCampaigns with new array', () => {
    const newCampaigns: CampaignItem[] = [
      {
        id: '10',
        title: 'Test Campaign',
        status: 'ongoing',
        description: 'test',
        targetAudience: 'all',
        deliverables: ['post'],
        minFollowers: '10K',
        minEngagement: '5%',
        clicks: 100,
        roi: 2,
        budgetRange: '5K',
        engagement: '10%',
        reach: '20K',
        cpe: '2.5',
        budgetUsed: 1000,
        remainingBudget: 4000,
        startDate: '01/01/2026',
        endDate: '31/01/2026',
        usedBudget: '1K',
        progress: 25,
        socials: ['instagram'],
        topInfluencers: [],
        weeks: ['Week 1'],
        totalSpend: [500],
      },
    ];
    const state = brandCampaignTabReducer(undefined, setCampaigns(newCampaigns));
    expect(state.campaigns).toHaveLength(1);
    expect(state.campaigns[0].title).toBe('Test Campaign');
  });

  it('should handle setCampaigns with empty array', () => {
    const state = brandCampaignTabReducer(undefined, setCampaigns(emptyCampaigns));
    expect(state.campaigns).toEqual([]);
  });
});
