import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-worklets', () => {
  const MockNativeWorklets = {
    install: () => {},
    tryInstall: () => false,
    isWorkletAvailable: () => false,
    createSerializable: (obj: any) => obj,
    makeShareableClone: (obj: any) => obj,
    isWorkletFunction: () => false,
  };
  return {
    __esModule: true,
    default: MockNativeWorklets,
    createReactNativeMock: (obj: any) => obj,
    createSerializable: (obj: any) => obj,
    makeShareableClone: (obj: any) => obj,
    isWorkletFunction: () => false,
  };
});

jest.mock('react-native-reanimated', () => {
  const RN = require('react-native');
  const AnimatedComponents = {
    View: RN.View,
    Text: RN.Text,
    ScrollView: RN.ScrollView,
    FlatList: RN.FlatList,
    Image: RN.Image,
    createAnimatedComponent: (Component: any) => Component,
  };
  return {
    ...AnimatedComponents,
    useSharedValue: (val: any) => ({ value: val }),
    useAnimatedStyle: (cb: () => any) => cb(),
    useDerivedValue: (cb: () => any) => ({ value: cb() }),
    withTiming: (val: any) => val,
    withSpring: (val: any) => val,
    withRepeat: (val: any, _: any, __: any, cb?: any) => { if (cb) cb(); return val; },
    withSequence: (...vals: any[]) => vals[vals.length - 1],
    interpolate: (val: any, inRange: any[], outRange: any[]) => outRange[0],
    Easing: { inOut: (e: any) => e, ease: 0 },
    Extrapolation: { CLAMP: 'clamp' },
    runOnJS: (fn: any) => fn,
    runOnUI: (fn: any) => fn,
    useAnimatedProps: (cb: () => any) => cb(),
    useAnimatedReaction: (_prepare: any, _react: any) => {},
    FadeInRight: { duration: (d: number) => ({ duration: d, delay: () => ({ springify: () => ({ damping: () => ({}) }), duration: d }), springify: () => ({ damping: () => ({}) }) }) },
    FadeOutLeft: { duration: (d: number) => ({ duration: d }) },
    Animated: AnimatedComponents,
    default: AnimatedComponents,
    call: () => {},
    spring: () => {},
    timing: () => {},
  };
});

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  const React = require('react');
  const RN = require('react-native');
  const MockSafeAreaView = (props: any) =>
    React.createElement(RN.View, props, props.children);
  return {
    SafeAreaProvider: ({ children }: any) => children,
    SafeAreaView: MockSafeAreaView,
    useSafeAreaInsets: () => inset,
    initialWindowMetrics: { insets: inset, frame: { x: 0, y: 0, width: 390, height: 844 } },
  };
});

jest.mock('react-native-skeleton-placeholder', () => 'SkeletonPlaceholder');

jest.mock('react-native-size-matters', () => ({
  scale: (size: number) => size,
  verticalScale: (size: number) => size,
  moderateScale: (size: number) => size,
  ScaledSheet: { create: (styles: any) => styles },
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-vector-icons/SimpleLineIcons', () => 'Icon');

jest.mock('react-native-config', () => ({
  ADMIN_EMAIL: 'admin@imb360.com',
  ADMIN_PASSWORD: 'Test@123',
  API_BASE_URL: 'http://localhost:5000',
  default: { ADMIN_EMAIL: 'admin@imb360.com', ADMIN_PASSWORD: 'Test@123', API_BASE_URL: 'http://localhost:5000' },
}));
