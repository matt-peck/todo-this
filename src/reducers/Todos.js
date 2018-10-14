import { Types, Modes } from "../constants";

const _todos = [
  {
    id: 0,
    title: "Pay Bills - 1",
    completed: false,
    dueDate: "2018-10-15",
    project: "Finances",
    mode: Modes.READ
  },
  {
    id: 1,
    title: "Pay Bills - 2",
    completed: false,
    dueDate: "2018-10-16",
    project: "Finances",
    mode: Modes.READ
  },
  {
    id: 2,
    title: "Pay Bills - 3",
    completed: false,
    dueDate: "2018-10-14",
    project: "Finances",
    mode: Modes.READ
  },
  {
    id: 3,
    title: "Attend HOA Meeting - 1",
    completed: false,
    dueDate: "2018-10-18",
    project: "Admin",
    mode: Modes.READ
  },
  {
    id: 4,
    title: "Attend HOA Meeting - 2",
    completed: false,
    dueDate: "2018-10-14",
    project: "Admin",
    mode: Modes.READ
  },
  {
    id: 5,
    title: "Attend HOA Meeting - 3",
    completed: false,
    dueDate: "2018-10-15",
    project: "Admin",
    mode: Modes.READ
  },
  {
    id: 6,
    title: "Dental Exam",
    completed: false,
    dueDate: "2018-10-15",
    project: "Guard",
    mode: Modes.READ
  },
  {
    id: 7,
    title: "Submit Timesheet",
    completed: false,
    dueDate: "2018-10-14",
    project: "Google",
    mode: Modes.READ
  },
  {
    id: 8,
    title: "Attend Training",
    completed: false,
    dueDate: "2018-10-17",
    project: null,
    mode: Modes.READ
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
            project: action.project || null,
            mode: Modes.READ
          };
        }
        return t;
      });

    case Types.TODO_DELETE:
      return state.filter(t => t.id !== action.id);

    case Types.TODO_ENABLE_EDIT:
      return state.map(t => {
        return t.id === action.id
          ? { ...t, mode: Modes.EDIT }
          : { ...t, mode: Modes.READ };
      });

    case Types.TODO_DISABLE_EDIT:
      return state.map(t => {
        return t.id === action.id ? { ...t, mode: Modes.READ } : t;
      });

    case Types.TODO_DISABLE_EDIT_ALL:
      return state.map(t => ({ ...t, mode: Modes.READ }));

    default:
      return state;
  }
};

export default todos;
