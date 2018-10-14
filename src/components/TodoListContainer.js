import React from "react";
import { connect } from "react-redux";
import { enableTodoEditMode, disableTodoEditMode } from "../actions/Todos";
import * as moment from "moment";
import TodoContainer from "./TodoContainer";
import AddTodoContainer from "./AddTodoContainer";
import { Modes } from "../constants";
import "../css/TodoListContainer.css";

const TodoListContainer = ({
  date,
  todos,
  addTodoId,
  enableTodoEditMode,
  disableTodoEditMode
}) => {
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
          <TodoContainer
            key={todo.title}
            todo={todo}
            enableEditMode={() =>
              enableTodoEditMode({ type: "TODO", id: todo.id })
            }
            disableEditMode={() =>
              disableTodoEditMode({ type: "TODO", id: todo.id })
            }
          />
        ))}
      </div>
      {(title !== "Overdue" && (
        <AddTodoContainer
          dueDate={moment(date).format("YYYY-MM-DD")}
          enableEditMode={() =>
            enableTodoEditMode({ type: "ADD_TODO", id: date })
          }
          disableEditMode={() => disableTodoEditMode({ type: "ADD_TODO" })}
          mode={addTodoId === date ? Modes.EDIT : Modes.READ}
        />
      )) || <div className="todo-list-add-todo-placeholder" />}
    </div>
  );
};

const mapState = (state, ownProps) => {
  const todos = ownProps.overdue
    ? state.Todos.filter(t => !t.completed).filter(t =>
        moment(t.dueDate, "YYYY-MM-DD").isBefore(moment(), "day")
      )
    : state.Todos.filter(t => !t.completed).filter(t =>
        moment(t.dueDate, "YYYY-MM-DD").isSame(ownProps.date, "day")
      );

  return {
    todos,
    addTodoId: state.addTodoId
  };
};

const mapActions = dispatch => {
  return {
    enableTodoEditMode: id => dispatch(enableTodoEditMode(id)),
    disableTodoEditMode: id => dispatch(disableTodoEditMode(id))
  };
};

export default connect(
  mapState,
  mapActions
)(TodoListContainer);
