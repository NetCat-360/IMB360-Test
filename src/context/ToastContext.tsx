// src/context/ToastContext.tsx

import React, {
  createContext,
  useState,
  useRef,
  useCallback,
  useMemo,
  use,
  ReactNode,
} from 'react';

import {
  Text,
  StyleSheet,
} from 'react-native';

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {
  scale,
  verticalScale,
  moderateScale,
} from '../utils/scaling';

import { Colors } from '../config/theme';

type ToastType =
  | 'error'
  | 'success'
  | 'info';

interface ToastContextValue {
  showToast: (
    message: string,
    type?: ToastType,
  ) => void;
}

const ToastContext =
  createContext<ToastContextValue>({
    showToast: () => {},
  });

export const ToastProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [message, setMessage] =
    useState('');

  const [toastType, setToastType] =
    useState<ToastType>('error');

  const opacity =
    useSharedValue(0);

  const timerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const dismiss =
    useCallback(() => {
      opacity.value =
        withTiming(0, {
          duration: 250,
        });

      setTimeout(() => {
        setMessage('');
      }, 250);
    }, [opacity]);

  const showToast =
    useCallback(
      (
        text: string,
        type: ToastType = 'error',
      ) => {
        if (timerRef.current) {
          clearTimeout(
            timerRef.current,
          );
        }

        setMessage(text);

        setToastType(type);

        opacity.value =
          withTiming(1, {
            duration: 250,
          });

        timerRef.current =
          setTimeout(() => {
            dismiss();
          }, 3000);
      },
      [dismiss, opacity],
    );

  const animatedStyle =
    useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      };
    });

  const bgColor =
    toastType === 'success'
      ? Colors.success
      : toastType === 'info'
      ? Colors.teal
      : Colors.error;

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider
      value={contextValue}
    >
      {children}

      {message ? (
        <Animated.View
          style={[
            styles.toast,
            {
              backgroundColor:
                bgColor,
            },
            animatedStyle,
          ]}
        >
          <Text style={styles.text}>
            {message}
          </Text>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
};

export const useGlobalToast =
  () => use(ToastContext);

const styles =
  StyleSheet.create({
    toast: {
      position: 'absolute',

      bottom:
        verticalScale(90),

      left: scale(20),

      right: scale(20),

      paddingVertical:
        verticalScale(12),

      paddingHorizontal:
        scale(16),

      borderRadius:
        moderateScale(10),

      zIndex: 999,

      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    },

    text: {
      color: '#FFFFFF',

      fontSize:
        moderateScale(13),

      fontFamily:
        'Poppins-SemiBold',

      textAlign: 'center',
    },
  });