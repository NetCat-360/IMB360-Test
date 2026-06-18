import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RoleSelectionScreen from '../../../../screens/auth/role-selection/RoleSelectionScreen';

jest.mock('../../../assets/images/Role Brand.svg', () => () => null);
jest.mock('../../../assets/images/Role Creator.svg', () => () => null);

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    replace: jest.fn(),
    goBack: jest.fn(),
    pop: jest.fn(),
  } as any),
}));

describe('RoleSelectionScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders BRAND section with title and description', () => {
    const { getAllByText, getByText } = render(<RoleSelectionScreen />);
    expect(getAllByText("I'M A").length).toBe(2);
    expect(getByText('BRAND')).toBeTruthy();
    expect(
      getByText(/Scale your campaigns and find the perfect creators/),
    ).toBeTruthy();
  });

  it('renders CREATOR section with title and description', () => {
    const { getByText } = render(<RoleSelectionScreen />);
    expect(getByText('CREATOR')).toBeTruthy();
    expect(
      getByText(/Partner with top brands and grow your influence/),
    ).toBeTruthy();
  });

  it('renders JOIN AS BRAND button', () => {
    const { getByText } = render(<RoleSelectionScreen />);
    expect(getByText('JOIN AS BRAND')).toBeTruthy();
  });

  it('renders JOIN AS CREATOR button', () => {
    const { getByText } = render(<RoleSelectionScreen />);
    expect(getByText('JOIN AS CREATOR')).toBeTruthy();
  });

  it('renders Login buttons for both sections', () => {
    const { getAllByText } = render(<RoleSelectionScreen />);
    const loginButtons = getAllByText('Login');
    expect(loginButtons.length).toBe(2);
  });

  it('navigates to Register with BRAND role on JOIN AS BRAND press', () => {
    const { getByText } = render(<RoleSelectionScreen />);
    fireEvent.press(getByText('JOIN AS BRAND'));
    expect(mockNavigate).toHaveBeenCalledWith('Register', { role: 'BRAND' });
  });

  it('navigates to Register with CREATOR role on JOIN AS CREATOR press', () => {
    const { getByText } = render(<RoleSelectionScreen />);
    fireEvent.press(getByText('JOIN AS CREATOR'));
    expect(mockNavigate).toHaveBeenCalledWith('Register', { role: 'CREATOR' });
  });

  it('navigates to Login on first Login button press (BRAND section)', () => {
    const { getAllByText } = render(<RoleSelectionScreen />);
    const loginButtons = getAllByText('Login');
    fireEvent.press(loginButtons[0]);
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('navigates to Login on second Login button press (CREATOR section)', () => {
    const { getAllByText } = render(<RoleSelectionScreen />);
    const loginButtons = getAllByText('Login');
    fireEvent.press(loginButtons[1]);
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
});
