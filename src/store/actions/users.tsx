import * as actionTypes from "./actionTypes";
import axios from "../../axios";

// get all users
export const fetchUsers = () => {
  return async (dispatch: any) => {
    try {
      axios
        .get(`/users.php`)
        .then((response) => response.data)
        .then((data) => {
          if (data.success === 1) {
            dispatch({
              type: actionTypes.FETCH_USERS,
              users: data.users,
            });
          } else {
            dispatch({
              type: actionTypes.SET_SNACKBAR,
              snackbar: {
                isOpen: true,
                message: data.message,
                type: "error",
              },
            });
          }
        });
    } catch (error) {
      dispatch({
        type: actionTypes.SET_SNACKBAR,
        snackbar: {
          isOpen: true,
          message: error.message,
          type: "error",
        },
      });
    }
  };
};

// update specific user
export const updateUser = (newData: any) => {
  //format data
  const data = {
    id: parseInt(newData.id),
    email: newData.email.trim(),
    firstName: newData.firstName.trim(),
    lastName: newData.lastName.trim()
  }

  return async (dispatch: any) => {
    try {
      axios
        .post(`/update-user.php`, data)
        .then((response) => response.data)
        .then((data) => {
          if (data.success === 1) {
            dispatch({
              type: actionTypes.UPDATE_USERS,
              newData: newData,
            });
            dispatch({
              type: actionTypes.SET_SNACKBAR,
              snackbar: {
                isOpen: true,
                message: data.message,
                type: "success",
              },
            });
          } else {
            dispatch({
              type: actionTypes.SET_SNACKBAR,
              snackbar: {
                isOpen: true,
                message: data.message,
                type: "error",
              },
            });
          }
        });
    } catch (error) {
      dispatch({
        type: actionTypes.SET_SNACKBAR,
        snackbar: {
          isOpen: true,
          message: error.message,
          type: "error",
        },
      });
    }
  };
};

// update password of a specific user
export const updateUserPass = (newPass: string, id: string) => {
  // format data
  const data = {
    id: parseInt(id),
    password: newPass
  }

  return async (dispatch: any) => {
    try {
      axios
        .post(`/update-user-pass.php`, data)
        .then((response) => response.data)
        .then((data) => {
          if (data.success === 1) {
            dispatch({
              type: actionTypes.SET_SNACKBAR,
              snackbar: {
                isOpen: true,
                message: data.message,
                type: "success",
              },
            });
          } else {
            dispatch({
              type: actionTypes.SET_SNACKBAR,
              snackbar: {
                isOpen: true,
                message: data.message,
                type: "error",
              },
            });
          }
        });
    } catch (error) {
      dispatch({
        type: actionTypes.SET_SNACKBAR,
        snackbar: {
          isOpen: true,
          message: error.message,
          type: "error",
        },
      });
    }
  };
};

// delete specific user
export const deleteUser = (id: string) => {
  // format id
  const data = {
    id: parseInt(id),
  };

  return async (dispatch: any) => {
    try {
      axios
        .post(`/delete-user.php`, data)
        .then((response) => response.data)
        .then((data) => {
          if (data.success === 1) {
            dispatch({
              type: actionTypes.SET_SNACKBAR,
              snackbar: {
                isOpen: true,
                message: data.message,
                type: "success",
              },
            });
            dispatch({
              type: actionTypes.DEL_USERS,
              id: id,
            });
          } else {
            dispatch({
              type: actionTypes.SET_SNACKBAR,
              snackbar: {
                isOpen: true,
                message: data.message,
                type: "error",
              },
            });
          }
        });
    } catch (error) {
      dispatch({
        type: actionTypes.SET_SNACKBAR,
        snackbar: {
          isOpen: true,
          message: error.message,
          type: "error",
        },
      });
    }
  };
};
