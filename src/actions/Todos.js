import { Types } from "../constants";
import * as moment from "moment";

export const completeTodo = id => {
  return async dispatch => {
    dispatch({ type: Types.TODO_COMPLETE, id });
  };
};

export const addTodo = title => {
  return async dispatch => {
    dispatch({ type: Types.TODO_ADD, title, dueDate: moment() });
  };
};

export const updateTodo = (id, title, dueDate, project) => {
  return async dispatch => {
    dispatch({ type: Types.TODO_UPDATE, id, title, dueDate, project });
  };
};

export const deleteTodo = id => {
  return async dispatch => {
    dispatch({ type: Types.TODO_DELETE, id });
  };
};
