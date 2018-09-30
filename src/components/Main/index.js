import React from "react";
import { connect } from "react-redux";
import TodoList from "./TodoList";
import * as moment from "moment";
import "./Main.css";

const Main = ({ todos }) => {
  const overdue = todos.filter(todo =>
    moment(todo.dueDate, "YYYY-MM-DD").isBefore(moment(), "day")
  );
  const today = todos.filter(todo =>
    moment(todo.dueDate, "YYYY-MM-DD").isSame(moment(), "day")
  );
  const tomorrow = todos.filter(todo =>
    moment(todo.dueDate, "YYYY-MM-DD").isSame(moment().add(1, "days"), "day")
  );
  const threeDays = todos.filter(todo =>
    moment(todo.dueDate, "YYYY-MM-DD").isSame(moment().add(2, "days"), "day")
  );
  // const fourDays;
  // const fiveDays;
  // const sixDays;
  // const sevenDays;

  return (
    <div className="main">
      <TodoList date={moment().subtract(1, "days")} todos={overdue} />
      <TodoList date={moment()} todos={today} />
      <TodoList date={moment().add(1, "days")} todos={tomorrow} />
      <TodoList date={moment().add(2, "days")} todos={threeDays} />
      <TodoList date={moment().add(3, "days")} todos={threeDays} />
      <TodoList date={moment().add(4, "days")} todos={threeDays} />
      <TodoList date={moment().add(5, "days")} todos={threeDays} />
      <TodoList date={moment().add(6, "days")} todos={threeDays} />
    </div>
  );
};

const mapState = state => {
  return {
    todos: state.todos
  };
};

const mapActions = () => {
  return {};
};

export default connect(
  mapState,
  mapActions
)(Main);
