import { combineReducers } from "redux";
import Todos from "./Todos";

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

const Projects = (state = _projects, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({ Todos, Projects });
