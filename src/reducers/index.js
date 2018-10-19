import { combineReducers } from "redux";
import todos from "./todos";
import todoFormId from "./todoForm";
import projects from "./projects";

export default combineReducers({ todos, projects, todoFormId });
