import React, { Fragment } from "react";
import * as moment from "moment";
import Todo from "./Todo";

const TodoList = ({ date, todos }) => {
  const title = moment(date).calendar(null, {
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Overdue]",
    lastWeek: "[Overdue]",
    sameElse: "[Overdue]"
  });

  const titleDate =
    title === ("Today" || "Tomorrow")
      ? moment(date).format("ddd MMM D")
      : moment(date).format("MMM D");

  return (
    <Fragment>
      <header className="todo-list-header">
        {title}
        <span className={`date ${title === "Overdue" && "overdue"}`}>
          {titleDate}
        </span>
      </header>
      {todos.map(todo => (
        <Todo key={todo.title} todo={todo} />
      ))}
    </Fragment>
  );
};

export default TodoList;
