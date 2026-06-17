import assetReducer, {
  setSelectedAsset,
  setActiveTab,
  toggleTerms,
} from '../../../store/slices/assetSlice';
import type { AssetTab } from '../../../store/slices/assetSlice';

describe('assetSlice', () => {
  it('should return initial state', () => {
    const state = assetReducer(undefined, { type: 'unknown' });
    expect(state.assets).toHaveLength(1);
    expect(state.selectedAsset).toBeNull();
    expect(state.activeTab).toBe('Asset Details');
    expect(state.showFullTerms).toBe(false);
  });

  it('should handle setSelectedAsset', () => {
    const asset = {
      id: '2',
      companyName: 'Test Laptop',
      description: 'A test laptop',
      city: 'Delhi',
      state: 'Delhi',
      startDate: '01/01/2026',
      endDate: '10/01/2026',
      rentPerDay: '₹ 500/Day',
      likes: 5,
      comments: 2,
      availableFrom: '01/01/2026',
      availableTo: '10/01/2026',
      amenities: ['Warranty'],
      providedFeatures: ['Fast'],
      priceDetails: '₹500 per day',
      termsAndConditions: 'Handle with care',
      rating: 4,
      reviewsCount: 10,
      gallery: ['img.png'],
    };
    const state = assetReducer(undefined, setSelectedAsset(asset));
    expect(state.selectedAsset).toEqual(asset);
  });

  it.each([
    'Asset Details',
    "What's Provided",
    'Price Details',
    'T&C',
    'Comments & Reviews',
    'Gallery',
  ] as AssetTab[])('should handle setActiveTab to %s', tab => {
    const state = assetReducer(undefined, setActiveTab(tab));
    expect(state.activeTab).toBe(tab);
  });

  it('should handle toggleTerms from false to true', () => {
    const state = assetReducer(undefined, toggleTerms());
    expect(state.showFullTerms).toBe(true);
  });

  it('should handle toggleTerms from true to false', () => {
    const current = assetReducer(undefined, toggleTerms());
    const toggled = assetReducer(current, toggleTerms());
    expect(toggled.showFullTerms).toBe(false);
  });
});
