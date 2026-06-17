import React, { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ToastProvider, useGlobalToast } from '../../context/ToastContext';

describe('ToastContext', () => {
  describe('ToastProvider', () => {
    it('renders children', () => {
      const { getByText } = render(
        <ToastProvider>
          <Text>Test Child</Text>
        </ToastProvider>,
      );
      expect(getByText('Test Child')).toBeTruthy();
    });

    it('does not show toast by default', () => {
      const { queryByText } = render(
        <ToastProvider>
          <Text>Child</Text>
        </ToastProvider>,
      );
      expect(queryByText('error')).toBeNull();
      expect(queryByText('success')).toBeNull();
      expect(queryByText('info')).toBeNull();
    });
  });

  describe('useGlobalToast', () => {
    it('returns a showToast function', () => {
      let contextValue: any;
      const Consumer = () => {
        contextValue = useGlobalToast();
        return null;
      };
      render(
        <ToastProvider>
          <Consumer />
        </ToastProvider>,
      );
      expect(contextValue).toBeDefined();
      expect(typeof contextValue.showToast).toBe('function');
    });
  });
});
