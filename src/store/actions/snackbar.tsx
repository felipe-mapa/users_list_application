import * as actionTypes from "./actionTypes";

// set notification
export const setSnackbar = (message: any) => {
  return (dispatch: any) => {
    dispatch({ type: actionTypes.SET_SNACKBAR, message });
  };
};

// clear notification
export const clearSnackbar = () => {
  return (dispatch: any) => {
    dispatch({ type: actionTypes.SNACKBAR_CLEAR });
  };
};
