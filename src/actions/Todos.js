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

export const updateTodo = (id, title, dueDate) => {
  return async dispatch => {
    dispatch({ type: Types.TODO_UPDATE, id, title, dueDate });
  };
};
