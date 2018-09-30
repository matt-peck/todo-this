import React from "react";

const Todo = ({ todo }) => {
  return (
    <div className="todo">
      <span className="complete-btn" />
      <span className="title">{todo.title}</span>
      <span className="project">{todo.project && todo.project}</span>
    </div>
  );
};

export default Todo;
