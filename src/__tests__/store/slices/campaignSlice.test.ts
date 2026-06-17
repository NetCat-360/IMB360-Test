import campaignReducer, {
  updateCampaign,
} from '../../../store/slices/campaignSlice';

describe('campaignSlice', () => {
  const { campaigns } = campaignReducer(undefined, { type: 'unknown' });

  it('should return initial state with 3 campaigns', () => {
    const state = campaignReducer(undefined, { type: 'unknown' });
    expect(state.campaigns).toHaveLength(3);
    expect(state.campaigns[0].companyName).toBe('WebHelp365');
  });

  it('should handle updateCampaign for existing campaign', () => {
    const payload = { id: 2, companyName: 'Updated Softivo', budget: '$3.0K - $6.0K' };
    const state = campaignReducer(undefined, updateCampaign(payload));
    const updated = state.campaigns.find(c => c.id === 2);
    expect(updated?.companyName).toBe('Updated Softivo');
    expect(updated?.budget).toBe('$3.0K - $6.0K');
    expect(updated?.description).toBeDefined();
  });

  it('should not modify campaigns when id does not match', () => {
    const state = campaignReducer(undefined, updateCampaign({ id: 999, companyName: 'Ghost' }));
    expect(state.campaigns).toHaveLength(3);
    expect(state.campaigns.find(c => c.id === 999)).toBeUndefined();
  });
});
