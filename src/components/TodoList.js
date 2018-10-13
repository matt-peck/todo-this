import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as moment from "moment";
import Todo from "./Todo";
import AddTodoContainer from "./AddTodoContainer";

const TodoList = ({ date, todos, addTodo }) => {
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
    <div className="todo-list">
      <header
        className={`todo-list-header ${title === "Overdue" && "overdue"}`}
      >
        {title}
        <span className="date">{titleDate}</span>
      </header>
      {todos.map(todo => (
        <Todo key={todo.title} todo={todo} />
      ))}
      {(title !== "Overdue" && (
        <AddTodoContainer dueDate={moment(date).format("YYYY-MM-DD")} />
      )) || <div style={{ marginBottom: "25px" }} />}
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
    todos
  };
};

export default connect(mapState)(TodoList);
