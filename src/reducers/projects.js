import { Types } from "../constants";

const projectDefault = { name: "", subProjects: [] };

const projects = (state = [], action) => {
  switch (action.type) {
    case Types.ADD_PROJECT:
      return [...state, { ...projectDefault, name: action.name }];
    default:
      return state;
  }
};

export default projects;
