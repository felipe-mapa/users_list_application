import axios from "../../axios";
import * as actionTypes from "./actionTypes";

// login user
export const loginUser = (data: any) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(`/login.php`, data);
      dispatch({
        type: actionTypes.LOGIN_USER,
        user: {
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
        },
        isLoggedIn: true,
        isAdmin: response.data.is_admin === "1",
      });
      dispatch({
        type: actionTypes.SET_SNACKBAR,
        snackbar: {
          isOpen: true,
          message: response.data.message,
          type: "success",
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.SET_SNACKBAR,
        snackbar: {
          isOpen: true,
          message:
            error.response === undefined
              ? error.message !== undefined || null
                ? error.message
                : "Something went wrong."
              : error.response.data.message,
          type: "error",
        },
      });
    }
  };
};

// register user
export const register = (data: any) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(`/register.php`, data);
      dispatch({
        type: actionTypes.SET_SNACKBAR,
        snackbar: {
          isOpen: true,
          message: response.data.message,
          type: "success",
        },
      });
      dispatch(loginUser(data));
    } catch (error) {
      dispatch({
        type: actionTypes.SET_SNACKBAR,
        snackbar: {
          isOpen: true,
          message:
            error.response === undefined
              ? error.message !== undefined || null
                ? error.message
                : "Something went wrong."
              : error.response.data.message,
          type: "error",
        },
      });
    }
  };
};

//log out user
export const logoutUser = () => {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: actionTypes.LOGOUT_USER,
      });
      dispatch({
        type: actionTypes.SET_SNACKBAR,
        snackbar: {
          isOpen: true,
          message: "You are logged out",
          type: "success",
        },
      });
      dispatch({
        type: actionTypes.UNSET_USERS,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.SET_SNACKBAR,
        snackbar: {
          isOpen: true,
          message:
            error.response === undefined
              ? error.message !== undefined || null
                ? error.message
                : "Something went wrong."
              : error.response.data.message,
          type: "error",
        },
      });
    }
  };
};
