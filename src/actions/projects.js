import { Types } from "../constants";

export const addProject = name => {
  return async dispatch => {
    dispatch({ type: Types.ADD_PROJECT, name });
  };
};
