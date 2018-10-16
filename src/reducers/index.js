import { combineReducers } from "redux";
import { Types } from "../constants";
import todos from "./todos";
import projects from "./projects";

const addTodoId = (state = null, action) => {
  switch (action.type) {
    case Types.ADD_TODO_ENABLE_EDIT:
      return action.id;

    case Types.ADD_TODO_DISABLE_EDIT:
      return null;

    default:
      return state;
  }
};

export default combineReducers({ todos, projects, addTodoId });
