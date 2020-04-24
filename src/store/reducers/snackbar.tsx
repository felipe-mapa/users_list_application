import * as actionTypes from "../actions/actionTypes";

// set snackbar interface
interface Snackbar {
  snackbar: {
    isOpen: boolean,
    type: string,
    message: string,
  },
}

// set initial state
const initialState: Snackbar = {
  snackbar: {
    isOpen: false,
    type: "",
    message: "",
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {

    case actionTypes.SET_SNACKBAR:
      return {
        snackbar: action.snackbar,
      };
      
    case actionTypes.SNACKBAR_CLEAR:
      return {
        ...state,
        snackbar: {
          isOpen: false,
          message: "",
          type: ""
        },
      };
    default:
      return state;
  }
};
