import { batch } from 'react-redux';

import { authAPI, resetAuth } from '.';

export const logout = () => {
  return (dispatch: (arg0: unknown) => void): void => {
    batch(() => {
      dispatch(resetAuth());
      dispatch(authAPI.util.resetApiState());
    });
  };
};
