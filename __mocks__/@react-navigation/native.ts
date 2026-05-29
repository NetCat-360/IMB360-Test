const navigationMock = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  replace: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  dispatch: jest.fn(),
  addListener: jest.fn(() => jest.fn()),
  removeListener: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  getParent: jest.fn(() => null),
  getState: jest.fn(() => ({
    index: 0,
    routes: [{ key: 'test', name: 'Test' }],
    key: 'test',
    routeNames: [],
    type: 'stack',
    stale: false,
  })),
  setParams: jest.fn(),
  setOptions: jest.fn(),
};

const routeMock = {
  key: 'test',
  name: 'Test',
  params: {},
};

module.exports = {
  useNavigation: () => navigationMock,
  useRoute: () => routeMock,
  useFocusEffect: jest.fn(),
  useIsFocused: () => true,
  NavigationContainer: ({ children }: any) => children,
  createNavigatorFactory: () => () => ({}),
  useNavigationState: jest.fn(),
  useLinkProps: () => ({ onPress: jest.fn() }),
  useLinkBuilder: () => () => '',
  useLinkTo: () => jest.fn(),
  useScrollToTop: jest.fn(),
};
