import { SnackbarKey } from "notistack";
import { enqueueSnackbar, closeSnackbar, removeSnackbar } from ".";

export const showErrorSnackbar = (message: string) => {
  return (dispatch: (arg0: unknown) => void): void => {
    dispatch(
      enqueueSnackbar({
        dismissed: false,
        message: message,
        options: {
          variant: "error",
          key: new Date().getTime() + Math.random(),
        },
      })
    );
  };
};

export const showSuccessSnackbar = (message: string) => {
  return (dispatch: (arg0: unknown) => void): void => {
    dispatch(
      enqueueSnackbar({
        dismissed: false,
        message: message,
        options: {
          variant: "success",
          key: new Date().getTime() + Math.random(),
        },
      })
    );
  };
};

export const showWarningSnackbar = (message: string) => {
  return (dispatch: (arg0: unknown) => void): void => {
    dispatch(
      enqueueSnackbar({
        dismissed: false,
        message: message,
        options: {
          variant: "warning",
          key: new Date().getTime() + Math.random(),
        },
      })
    );
  };
};

export const showInfoSnackbar = (message: string) => {
  return (dispatch: (arg0: unknown) => void): void => {
    dispatch(
      enqueueSnackbar({
        dismissed: false,
        message: message,
        options: {
          variant: "info",
          key: new Date().getTime() + Math.random(),
        },
      })
    );
  };
};

export const closeSnackbarAction = (key?: SnackbarKey) => {
  return (dispatch: (arg0: unknown) => void): void => {
    dispatch(closeSnackbar({ dismissAll: !key, key }));
  };
};

export const removeSnackbarAction = (key: SnackbarKey) => {
    return (dispatch: (arg0: unknown) => void): void => {
      dispatch(removeSnackbar(key));
    };
  };
