import types from './types';

export const userReducer = (state = [], action) => {
  switch (action.type) {
    case types.USER_LIST:
      return [...action.payload];
    case types.USER_CREATE:
      return [...state, action.payload];
    case types.USER_EDIT:
      const indexToReplace = state.findIndex((x) => x.id === action.payload.id);
      state[indexToReplace] = action.payload;
      return [...state];
    case types.USER_DELETE:
      return state.filter((x) => x.id !== action.payload);
    default:
      return state;
  }
};
