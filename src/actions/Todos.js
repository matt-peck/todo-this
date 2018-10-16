import { Types } from "../constants";

export const completeTodo = id => {
  return async dispatch => {
    dispatch({ type: Types.TODO_COMPLETE, id });
  };
};

export const addTodo = (title, dueDate, project) => {
  return async dispatch => {
    if (!title) return dispatch({ type: Types.ADD_TODO_DISABLE_EDIT });
    dispatch({ type: Types.TODO_ADD, title, dueDate, project });
  };
};

export const updateTodo = (id, title, dueDate, project) => {
  return async dispatch => {
    if (!title) return dispatch({ type: Types.TODO_DISABLE_EDIT, id });
    dispatch({ type: Types.TODO_UPDATE, id, title, dueDate, project });
  };
};

export const deleteTodo = id => {
  return async dispatch => {
    dispatch({ type: Types.TODO_DELETE, id });
  };
};

export const enableTodoEditMode = ({ type, id }) => {
  return async dispatch => {
    switch (type) {
      case "TODO":
        dispatch({ type: Types.ADD_TODO_DISABLE_EDIT });
        return dispatch({ type: Types.TODO_ENABLE_EDIT, id });

      case "ADD_TODO":
        dispatch({ type: Types.TODO_DISABLE_EDIT_ALL });
        return dispatch({ type: Types.ADD_TODO_ENABLE_EDIT, id });

      default:
        return;
    }
  };
};

export const disableTodoEditMode = ({ type, id }) => {
  return async dispatch => {
    switch (type) {
      case "TODO":
        return dispatch({ type: Types.TODO_DISABLE_EDIT, id });

      case "ADD_TODO":
        return dispatch({ type: Types.ADD_TODO_DISABLE_EDIT });

      default:
        return;
    }
  };
};
