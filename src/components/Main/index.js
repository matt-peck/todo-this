import React from "react";
import { connect } from "react-redux";
import TodoList from "./TodoList";
import "./Main.css";

const Main = ({ todos }) => {
  return (
    <div className="main">
      <TodoList todos={todos} />
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
