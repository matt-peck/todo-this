import { Types, Modes } from "../constants";

const todoDefault = {
  id: null,
  title: "",
  completed: false,
  dueDate: "",
  project: "", // eventually this will be a projectId
  mode: Modes.READ
};

const todos = (state = [], action) => {
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
          ...todoDefault, // provide default state
          id: state.length, // once we move todos to back end, will generate unique id's
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
