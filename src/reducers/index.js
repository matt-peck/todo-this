import { combineReducers } from "redux";
import Todos from "./Todos";
import { Types } from "../constants";

// const initialState = {
//   user: {
//     lastName: "Peck",
//     firstName: "Matthew"
//   },
// };

// const mainReducer = (state = initialState, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };

const _projects = [
  {
    name: "Work",
    subProjects: [{ name: "Guard" }, { name: "Google" }]
  },
  {
    name: "Personal",
    subProjects: [{ name: "Admin" }, { name: "Finances" }]
  }
];

const _addTodoId = null;

const addTodoId = (state = _addTodoId, action) => {
  switch (action.type) {
    case Types.ADD_TODO_ENABLE_EDIT:
      return action.id;

    case Types.ADD_TODO_DISABLE_EDIT:
      return null;

    default:
      return state;
  }
};

const Projects = (state = _projects, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({ Todos, Projects, addTodoId });
