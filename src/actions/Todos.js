import { Types } from "../constants";

export const completeTodo = id => {
  return async dispatch => {
    dispatch({ type: Types.TODO_COMPLETE, id });
  };
};

export const addTodo = (title, dueDate, project) => {
  return async dispatch => {
    dispatch({ type: Types.TODO_ADD, title, dueDate, project });
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
