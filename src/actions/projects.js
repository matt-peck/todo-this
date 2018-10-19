import { Types } from "../constants";

/**
 * project action creators
 * using redux-thunk templating here for future api calls
 */

export const addProject = name => {
  return async dispatch => {
    dispatch({ type: Types.ADD_PROJECT, name });
  };
};
