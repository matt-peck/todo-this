import { combineReducers } from "redux";
import todos from "./todos";
import todoFormId from "./todoForm";
import projects from "./projects";
import isProjectFormOpen from "./projectForm";

export default combineReducers({
  todos,
  projects,
  todoFormId,
  isProjectFormOpen
});
