import React from "react";
import { connect } from "react-redux";
import * as moment from "moment";
import TodoContainer from "./TodoContainer";
import AddTodoContainer from "./AddTodoContainer";
import { Modes } from "../constants";
import "../css/TodoListContainer.scss";
import { getTodosForDate } from "../selectors";

// Currently only used for date based lists
// refactor to be date or project based
const TodoListContainer = ({ date, todos, todoFormId }) => {
  const title = date
    ? moment(date).calendar(null, {
        sameDay: "[Today]",
        nextDay: "[Tomorrow]",
        nextWeek: "dddd",
        lastDay: "[Overdue]",
        lastWeek: "[Overdue]",
        sameElse: "[Overdue]"
      })
    : "Overdue";

  const titleDate =
    title === ("Today" || "Tomorrow")
      ? moment(date).format("ddd MMM D")
      : date
        ? moment(date).format("MMM D")
        : "";

  const dueDate = moment(date).format("YYYY-MM-DD");

  // if the todo list title is overdue and there are no todos, don't render a list
  if (title === "Overdue" && todos.length === 0) return <div />;

  return (
    <div className="todo-list-container">
      <header className="todo-list-header">
        <div className={`todo-list-title ${title === "Overdue" && "overdue"}`}>
          {title}
        </div>
        <div className="todo-list-date">{titleDate}</div>
      </header>

      <div className="todo-list-content">
        {todos.map(todo => (
          <TodoContainer key={todo.id} todo={todo} />
        ))}
      </div>

      {/* If the title of this todo list isn't Overdue render the Add Todo Container */}
      {(title !== "Overdue" && (
        <AddTodoContainer
          dueDate={dueDate}
          mode={todoFormId === dueDate ? Modes.EDIT : Modes.READ}
        />
      )) || <div className="todo-list-add-todo-placeholder" />}
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    todos: getTodosForDate(state, ownProps.date, ownProps.overdue),
    todoFormId: state.todoFormId
  };
};

export default connect(mapState)(TodoListContainer);
