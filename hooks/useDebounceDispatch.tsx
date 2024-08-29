import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';

function useDebounceDispatch(action: any, delay = 300) {
  const dispatch = useDispatch();
  const timerRef = useRef<number | NodeJS.Timeout | null>(null);

  const debouncedDispatch = useCallback(
    (payload: any) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        dispatch(action(payload));
      }, delay);
    },
    [dispatch, action, delay]
  );

  return debouncedDispatch;
}

export default useDebounceDispatch;
