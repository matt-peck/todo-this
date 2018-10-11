import { Types } from "../constants";

const _todos = [
  {
    id: 0,
    title: "Pay Bills - 1",
    completed: false,
    dueDate: "2018-10-07",
    project: "Finances"
  },
  {
    id: 1,
    title: "Pay Bills - 2",
    completed: false,
    dueDate: "2018-10-08",
    project: "Finances"
  },
  {
    id: 2,
    title: "Pay Bills - 3",
    completed: false,
    dueDate: "2018-10-01",
    project: "Finances"
  },
  {
    id: 3,
    title: "Attend HOA Meeting - 1",
    completed: false,
    dueDate: "2018-09-29",
    project: "Admin"
  },
  {
    id: 4,
    title: "Attend HOA Meeting - 2",
    completed: false,
    dueDate: "2018-10-06",
    project: "Admin"
  },
  {
    id: 5,
    title: "Attend HOA Meeting - 3",
    completed: false,
    dueDate: "2018-10-09",
    project: "Admin"
  },
  {
    id: 6,
    title: "Dental Exam",
    completed: false,
    dueDate: "2018-10-06",
    project: "Guard"
  },
  {
    id: 7,
    title: "Submit Timesheet",
    completed: false,
    dueDate: "2018-10-07",
    project: "Google"
  },
  {
    id: 8,
    title: "Attend Training",
    completed: false,
    dueDate: "2018-09-30",
    project: null
  }
];

const todos = (state = _todos, action) => {
  switch (action.type) {
    case Types.TODO_COMPLETE:
      return state.map(t => {
        if (t.id === action.id) {
          return { ...t, completed: true };
        }
        return t;
      });

    case Types.TODO_ADD:
      return [
        ...state,
        {
          id: state.length,
          title: action.title,
          dueDate: action.dueDate,
          project: action.project || null
        }
      ];

    case Types.TODO_UPDATE:
      return state.map(t => {
        if (t.id === action.id) {
          return {
            ...t,
            title: action.title,
            dueDate: action.dueDate,
            project: action.project
          };
        }
        return t;
      });

    case Types.TODO_DELETE:
      return state.filter(t => t.id !== action.id);

    default:
      return state;
  }
};

export default todos;
