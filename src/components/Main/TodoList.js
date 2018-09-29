import React, { Fragment } from "react";
import Todo from "./Todo";

const TodoList = ({ todos }) => {
  return (
    <Fragment>
      {todos.map(todo => (
        <Todo key={todo.title} todo={todo} />
      ))}
    </Fragment>
  );
};

export default TodoList;
