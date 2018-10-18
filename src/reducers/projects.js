import { Types } from "../constants";

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

const projects = (state = _projects, action) => {
  switch (action.type) {
    case Types.ADD_PROJECT:
      return [...state, { name: action.name, subProjects: [] }];
    default:
      return state;
  }
};

export default projects;
