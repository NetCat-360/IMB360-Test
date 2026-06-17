import addAssetReducer, {
  updateField,
  resetAssetForm,
} from '../../../store/slices/addAssetSlice';

describe('addAssetSlice', () => {
  it('should return initial state', () => {
    const state = addAssetReducer(undefined, { type: 'unknown' });
    expect(state.assetName).toBe('');
    expect(state.amenities).toEqual([]);
    expect(state.coverImage).toBeNull();
    expect(state.gallery).toEqual([]);
    expect(state.city).toBe('');
    expect(state.country).toBe('');
  });

  it('should handle updateField with string value', () => {
    const state = addAssetReducer(undefined, updateField({ key: 'assetName', value: 'MacBook Pro' }));
    expect(state.assetName).toBe('MacBook Pro');
  });

  it('should handle updateField with array value', () => {
    const state = addAssetReducer(undefined, updateField({ key: 'amenities', value: ['WiFi', 'Camera'] }));
    expect(state.amenities).toEqual(['WiFi', 'Camera']);
  });

  it('should handle updateField with null value', () => {
    const state = addAssetReducer(undefined, updateField({ key: 'coverImage', value: null }));
    expect(state.coverImage).toBeNull();
  });

  it('should handle updateField with all fields', () => {
    const state = addAssetReducer(undefined, updateField({ key: 'city', value: 'Mumbai' }));
    const state2 = addAssetReducer(state, updateField({ key: 'state', value: 'Maharashtra' }));
    const state3 = addAssetReducer(state2, updateField({ key: 'pinCode', value: '400001' }));
    expect(state3.city).toBe('Mumbai');
    expect(state3.state).toBe('Maharashtra');
    expect(state3.pinCode).toBe('400001');
  });

  it('should handle resetAssetForm', () => {
    const modified = addAssetReducer(
      undefined,
      updateField({ key: 'assetName', value: 'Some Asset' }),
    );
    const state = addAssetReducer(modified, updateField({ key: 'city', value: 'Goa' }));
    const resetState = addAssetReducer(state, resetAssetForm());
    expect(resetState.assetName).toBe('');
    expect(resetState.city).toBe('');
    expect(resetState.amenities).toEqual([]);
    expect(resetState.coverImage).toBeNull();
  });
});
