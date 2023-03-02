import { useEffect } from 'react';

import { SnackbarKey, useSnackbar } from 'notistack';

import { useAppDispatch, useAppSelector } from '~/store';
import { removeSnackbar } from '~/store/Notifications';

let displayed: SnackbarKey[] = [];

const useNotifier = (): void => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((st) => st.notifications.notifications || []);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  useEffect(() => {
    notifications.forEach(({ message, options, dismissed = false }) => {
      if (dismissed) {
        closeSnackbar(options.key);
        return;
      }
      if (displayed.includes(options.key)) return;
      enqueueSnackbar(message, {
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          dispatch(removeSnackbar(myKey));
          removeDisplayed(myKey);
        },
      });
      storeDisplayed(options.key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
};

export default useNotifier;
