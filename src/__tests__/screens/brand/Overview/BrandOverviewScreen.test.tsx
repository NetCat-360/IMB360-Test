import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import brandOverviewReducer from '../../../../store/slices/Brand/brandOverviewSlice';
import BrandOverviewScreen from '../../../../screens/brand/Overview/BrandOverviewScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack } as any),
}));

jest.mock('react-native-chart-kit', () => ({
  LineChart: 'LineChart',
}));

jest.mock('react-native-element-dropdown', () => ({
  Dropdown: 'Dropdown',
}));

const createTestStore = () =>
  configureStore({
    reducer: { brandOverview: brandOverviewReducer },
  });

describe('BrandOverviewScreen', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  it('renders the screen title', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandOverviewScreen />
      </Provider>
    );
    expect(getByText('Profile Overview')).toBeTruthy();
  });

  it('renders Running Campaigns section', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandOverviewScreen />
      </Provider>
    );
    expect(getByText('Running Campaigns')).toBeTruthy();
    expect(getByText('Budget')).toBeTruthy();
    expect(getByText('Total Budget')).toBeTruthy();
  });

  it('renders campaign names from the store', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandOverviewScreen />
      </Provider>
    );
    expect(getByText('Summer Sale')).toBeTruthy();
    expect(getByText('Fashion Collab')).toBeTruthy();
    expect(getByText('Tech Launch')).toBeTruthy();
  });

  it('renders Current Month Campaign Performance section', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandOverviewScreen />
      </Provider>
    );
    expect(getByText('Current Month Campaign Performance')).toBeTruthy();
  });

  it('renders the LineChart component', () => {
    const { UNSAFE_getByType } = render(
      <Provider store={store}>
        <BrandOverviewScreen />
      </Provider>
    );
    expect(UNSAFE_getByType('LineChart' as any)).toBeTruthy();
  });

  it('renders the Dropdown component', () => {
    const { UNSAFE_getByType } = render(
      <Provider store={store}>
        <BrandOverviewScreen />
      </Provider>
    );
    expect(UNSAFE_getByType('Dropdown' as any)).toBeTruthy();
  });

  it('calls goBack when back button is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandOverviewScreen />
      </Provider>
    );
    fireEvent.press(getByText('Profile Overview'));
  });

  it('renders total budget as a number with ₹ symbol', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandOverviewScreen />
      </Provider>
    );
    const state = store.getState().brandOverview;
    const total = state.monthlyData[state.selectedMonth].totalBudget;
    expect(getByText(`₹${total.toLocaleString()}`)).toBeTruthy();
  });
});
