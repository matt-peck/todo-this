import { combineReducers } from "redux";

// const initialState = {
//   user: {
//     lastName: "Peck",
//     firstName: "Matthew"
//   },
//   projects: [
//     {
//       name: "Work",
//       subProjects: [{ name: "Guard" }, { name: "Google" }]
//     },
//     {
//       name: "Personal",
//       subProjects: [{ name: "Admin" }, { name: "Finances" }]
//     }
//   ]
// };

const _todos = [
  {
    title: "Pay Bills - 1",
    completed: false,
    dueDate: "2018-10-01",
    project: "Finances"
  },
  {
    title: "Pay Bills - 2",
    completed: false,
    dueDate: "2018-10-01",
    project: "Finances"
  },
  {
    title: "Pay Bills - 3",
    completed: false,
    dueDate: "2018-10-01",
    project: "Finances"
  },
  {
    title: "Attend HOA Meeting - 1",
    completed: false,
    dueDate: "2018-09-29",
    project: "Admin"
  },
  {
    title: "Attend HOA Meeting - 2",
    completed: false,
    dueDate: "2018-09-29",
    project: "Admin"
  },
  {
    title: "Attend HOA Meeting - 3",
    completed: false,
    dueDate: "2018-09-29",
    project: "Admin"
  },
  {
    title: "Dental Exam",
    completed: false,
    dueDate: "2018-09-28",
    project: "Guard"
  },
  {
    title: "Submit Timesheet",
    completed: false,
    dueDate: "2018-09-29",
    project: "Google"
  },
  {
    title: "Attend Training",
    completed: false,
    dueDate: "2018-9-30",
    project: null
  }
];

const todos = (state = _todos, action) => {
  return state;
};

// const mainReducer = (state = initialState, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };

export default combineReducers({ todos });
