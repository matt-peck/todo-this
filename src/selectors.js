import * as moment from "moment";

export const getInboxTodos = state => state.todos.filter(t => !t.project);

export const getTodosForProject = (state, project) =>
  state.todos.filter(t => !t.completed && t.project === project);

export const getTodosForDate = (state, date, overdue) =>
  overdue
    ? state.todos
        .filter(t => !t.completed)
        .filter(t => moment(t.dueDate, "YYYY-MM-DD").isBefore(moment(), "day"))
    : state.todos
        .filter(t => !t.completed)
        .filter(t => moment(t.dueDate, "YYYY-MM-DD").isSame(date, "day"));
