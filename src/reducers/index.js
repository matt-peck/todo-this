import { combineReducers } from "redux";

const initialState = {
  user: {
    lastName: "Peck",
    firstName: "Matthew"
  },
  projects: [
    {
      name: "Work",
      subProjects: [{ name: "Guard" }, { name: "Google" }]
    },
    {
      name: "Personal",
      subProjects: [{ name: "Admin" }, { name: "Finances" }]
    }
  ]
};

const _todos = [
  { title: "Pay Bills", completed: false, dueDate: "", project: "Finances" },
  {
    title: "Attend HOA Meeting",
    completed: false,
    dueDate: "",
    project: "Admin"
  },
  { title: "Dental Exam", completed: false, dueDate: "", project: "Guard" },
  {
    title: "Submit Timesheet",
    completed: false,
    dueDate: "",
    project: "Google"
  },
  { title: "Attend Training", completed: false, dueDate: "", project: null }
];

const todos = (state = _todos, action) => {
  return state;
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({ todos });
