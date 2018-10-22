import { Types } from "../constants";

const isProjectFormOpen = (state = false, action) => {
  switch (action.type) {
    case Types.OPEN_PROJECT_FORM:
      return true;

    case Types.CLOSE_PROJECT_FORM:
      return false;

    case Types.TODO_DISABLE_EDIT_ALL:
      return false;

    default:
      return state;
  }
};

export default isProjectFormOpen;
