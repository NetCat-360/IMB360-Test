import { useAppDispatch, useAppSelector } from '../../hooks/redux';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: (selector: any) => selector({ test: 'value' }),
}));

describe('redux hooks', () => {
  describe('useAppDispatch', () => {
    it('returns a dispatch function', () => {
      const dispatch = useAppDispatch();
      expect(typeof dispatch).toBe('function');
    });
  });

  describe('useAppSelector', () => {
    it('returns the selector result', () => {
      const result = useAppSelector((state: any) => state.test);
      expect(result).toBe('value');
    });
  });
});
