import { Types } from "../constants";

const todoFormId = (state = null, action) => {
  switch (action.type) {
    case Types.ADD_TODO_ENABLE_EDIT:
      return action.id;

    case Types.ADD_TODO_DISABLE_EDIT:
      return null;

    case Types.TODO_DISABLE_EDIT_ALL:
      return null;

    default:
      return state;
  }
};

export default todoFormId;
