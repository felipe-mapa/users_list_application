import * as actionTypes from "../actions/actionTypes";

// set current user interface
interface User {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  isLoggedIn: boolean;
  isAdmin: boolean;
}

// set initial state
const initialState: User = {
  user: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
  },
  isLoggedIn: false,
  isAdmin: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    
    case actionTypes.LOGIN_USER:
      return {
        user: {
          id: action.user.id,
          firstName: action.user.firstName,
          lastName: action.user.lastName,
          email: action.user.email,
        },
        isLoggedIn: true,
        isAdmin: action.isAdmin,
      };

    case actionTypes.LOGOUT_USER:
      return {
        user: initialState.user,
        isLoggedIn: false,
        isAdmin: false,
      };

    default:
      return state;
  }
};
