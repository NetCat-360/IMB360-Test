import brandCampaignBidsReducer, {
  setSelectedTab,
  acceptBid,
  rejectBid,
  releasePayment,
  reportIssue,
  updateComment,
} from '../../../../store/slices/Brand/brandCampaignBidsSlice';

describe('brandCampaignBidsSlice', () => {
  it('should return initial state', () => {
    const state = brandCampaignBidsReducer(undefined, { type: 'unknown' });
    expect(state.selectedTab).toBe('campaignBids');
    expect(state.bids).toHaveLength(4);
    expect(state.recentActivity).toHaveLength(3);
  });

  it('should handle setSelectedTab', () => {
    const state = brandCampaignBidsReducer(undefined, setSelectedTab('recentActivity'));
    expect(state.selectedTab).toBe('recentActivity');
  });

  it('should handle acceptBid', () => {
    const state = brandCampaignBidsReducer(undefined, acceptBid(1));
    const bid = state.bids.find(b => b.id === 1);
    expect(bid?.status).toBe('accepted');
  });

  it('should handle rejectBid', () => {
    const state = brandCampaignBidsReducer(undefined, rejectBid(2));
    const bid = state.bids.find(b => b.id === 2);
    expect(bid?.status).toBe('rejected');
  });

  it('should not modify status for non-existent bid', () => {
    const state = brandCampaignBidsReducer(undefined, acceptBid(999));
    expect(state.bids.every(b => b.status === 'pending')).toBe(true);
  });

  it('should handle releasePayment', () => {
    const state = brandCampaignBidsReducer(undefined, releasePayment(1));
    const activity = state.recentActivity.find(a => a.id === 1);
    expect(activity?.paymentStatus).toBe('released');
  });

  it('should handle reportIssue', () => {
    const state = brandCampaignBidsReducer(undefined, reportIssue(2));
    const activity = state.recentActivity.find(a => a.id === 2);
    expect(activity?.paymentStatus).toBe('reported');
  });

  it('should not modify for non-existent activity', () => {
    const state = brandCampaignBidsReducer(undefined, releasePayment(999));
    expect(state.recentActivity.every(a => a.paymentStatus === 'pending')).toBe(true);
  });

  it('should handle updateComment', () => {
    const state = brandCampaignBidsReducer(
      undefined,
      updateComment({ id: 1, comment: 'Great work!' }),
    );
    const activity = state.recentActivity.find(a => a.id === 1);
    expect(activity?.comment).toBe('Great work!');
  });

  it('should not update comment for non-existent activity', () => {
    const state = brandCampaignBidsReducer(
      undefined,
      updateComment({ id: 999, comment: 'test' }),
    );
    expect(state.recentActivity.every(a => a.comment === '')).toBe(true);
  });
});
