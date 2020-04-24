import * as actionTypes from "../actions/actionTypes";

// set User interface
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

// set user state interface
interface UserState {
  users: User[];
}

// set inicial state
const initialState: UserState = {
  users: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {

    case actionTypes.FETCH_USERS:
      return {
        users: action.users.map((u: any) => {
          return {
            id: u.user_id,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            isAdmin: u.is_admin === "1",
          };
        }),
      };
      case actionTypes.UNSET_USERS:
      return {
        users: []
      };

    case actionTypes.UPDATE_USERS:
      //get index
      const userIndex = state.users.findIndex(item => item.id === action.newData.id)
      // check length
      const listLenght = state.users.length

      // format data
      const updatedUser = {
        id: action.newData.id,
        firstName: action.newData.firstName,
        lastName: action.newData.lastName,
        email: action.newData.email,
        isAdmin: state.users[userIndex].isAdmin,
      }
      
      // insert into array
      const newUsersList = state.users.slice(0, userIndex).concat(updatedUser).concat(state.users.slice(userIndex + 1, listLenght))
      return {
        users: newUsersList
      };

    case actionTypes.DEL_USERS:      
      return {
        ...state,
        users: state.users.filter((item) => item.id !== action.id),
      };
      
    default:
      return state;
  }
};
