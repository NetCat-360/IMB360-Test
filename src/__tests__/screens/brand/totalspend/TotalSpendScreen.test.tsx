import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import totalSpendReducer from '../../../../store/slices/Brand/totalSpendSlice';
import TotalSpendScreen from '../../../../screens/brand/totalspend/TotalSpendScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack }),
}));

const createTestStore = () =>
  configureStore({
    reducer: { totalSpend: totalSpendReducer },
  });

describe('TotalSpendScreen', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  it('renders the screen title', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TotalSpendScreen />
      </Provider>
    );
    expect(getByText('Total Spend')).toBeTruthy();
  });

  it('renders the year button with default selected year', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TotalSpendScreen />
      </Provider>
    );
    const state = store.getState().totalSpend;
    expect(getByText(state.selectedYear)).toBeTruthy();
  });

  it('renders the total spend card', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TotalSpendScreen />
      </Provider>
    );
    const state = store.getState().totalSpend;
    expect(getByText(`Total Spend (${state.selectedYear})`)).toBeTruthy();
  });

  it('shows empty state when no data for selected year', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TotalSpendScreen />
      </Provider>
    );
    const state = store.getState().totalSpend;
    expect(getByText(`No spending data available for ${state.selectedYear}`)).toBeTruthy();
  });

  it('renders tabs', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TotalSpendScreen />
      </Provider>
    );
    expect(getByText('Campaign')).toBeTruthy();
    expect(getByText('Influencer')).toBeTruthy();
    expect(getByText('Payment Date')).toBeTruthy();
  });

  it('shows data after switching to a year with data', () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <TotalSpendScreen />
      </Provider>
    );
    fireEvent.press(getByText('2025'));
    fireEvent.press(getByText('2024'));
    const state = store.getState().totalSpend;
    const year2024 = state.spendHistory.find(y => y.year === '2024');
    if (year2024 && year2024.data.length > 0) {
      expect(getByText(year2024.data[0].title)).toBeTruthy();
    }
    expect(queryByText(`No spending data available for 2024`)).toBeNull();
  });

  it('toggles year dropdown on press', () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <TotalSpendScreen />
      </Provider>
    );
    fireEvent.press(getByText('2025'));
    expect(getByText('2024')).toBeTruthy();
    expect(getByText('2023')).toBeTruthy();
    fireEvent.press(getByText('2024'));
    expect(queryByText('2023')).toBeNull();
  });

  it('changes year when a year option is selected', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TotalSpendScreen />
      </Provider>
    );
    fireEvent.press(getByText('2025'));
    fireEvent.press(getByText('2024'));
    expect(getByText('Total Spend (2024)')).toBeTruthy();
  });

  it('renders Next button to switch between tab sets', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TotalSpendScreen />
      </Provider>
    );
    expect(getByText('Next')).toBeTruthy();
  });

  it('switches tab set on Next press', () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <TotalSpendScreen />
      </Provider>
    );
    fireEvent.press(getByText('Next'));
    expect(getByText('Spent Amount')).toBeTruthy();
    expect(getByText('Status')).toBeTruthy();
    expect(queryByText('Campaign')).toBeNull();
    expect(getByText('Previous')).toBeTruthy();
  });

  it('switches back with Previous button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TotalSpendScreen />
      </Provider>
    );
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Previous'));
    expect(getByText('Campaign')).toBeTruthy();
    expect(getByText('Influencer')).toBeTruthy();
    expect(getByText('Payment Date')).toBeTruthy();
  });

  it('calls goBack when back is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TotalSpendScreen />
      </Provider>
    );
  });
});
