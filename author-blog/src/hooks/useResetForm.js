import { useStore } from 'react-redux';
import { useEffect } from 'react';

export const useResetForm = (reset) => {
  const store = useStore();
  useEffect(() => {
    let currentWasLogout = store.getState().appState.wasLogout;
    const unsubscribe = store.subscribe(() => {
      let prevWasLogout = currentWasLogout;
      currentWasLogout = store.getState().appState.wasLogout;
      if (prevWasLogout !== currentWasLogout) {
        reset();
      }
    });
    return unsubscribe;
  }, []);
};
