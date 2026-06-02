// src/hooks/useToast.ts
import { useState, useEffect, useRef } from 'react';
import { useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';

export const useToast = () => {
  const [message, setMessage] = useState('');
  const toastOpacity = useSharedValue(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear the timer if the component unmounts mid-countdown
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (text: string) => {
    setMessage(text);
    toastOpacity.value = withTiming(1, { duration: 250 }, () => {
      'worklet';
      runOnJS(() => {
        // Store the ref so we can cancel it
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          toastOpacity.value = withTiming(0, { duration: 250 }, () => {
            'worklet';
            runOnJS(setMessage)('');
          });
        }, 3000);
      })();
    });
  };

  return { message, toastOpacity, showToast };
};