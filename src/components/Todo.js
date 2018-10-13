import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { completeTodo, updateTodo, deleteTodo } from "../actions/Todos";
import TodoForm from "./TodoForm";
import "../css/Todo.css";

class Todo extends Component {
  state = {
    view: "READ"
  };

  updateTodo = (title, dueDate, project) => {
    this.props.updateTodo(this.props.todo.id, title, dueDate, project);
    this.toggleView();
  };

  toggleView = () => {
    switch (this.state.view) {
      case "READ":
        this.setState({ view: "EDIT" });
        return;
      default:
        this.setState({ view: "READ" });
        return;
    }
  };

  render() {
    const { todo, completeTodo, deleteTodo } = this.props;
    const { view } = this.state;

    switch (view) {
      case "EDIT":
        return (
          <TodoForm
            view="UPDATE"
            title={todo.title}
            dueDate={todo.dueDate}
            project={todo.project}
            updateTodo={this.updateTodo}
            toggleView={this.toggleView}
          />
        );
      default:
        return (
          <div className="todo">
            <div className="complete-btn-container">
              <div
                onClick={() => completeTodo(todo.id)}
                className="complete-btn"
              />
            </div>

            <div onClick={this.toggleView} className="title">
              {todo.title}
            </div>
            <Link
              to={(todo.project && `/projects/${todo.project}`) || `/inbox`}
              className="project"
            >
              {(todo.project && todo.project) || "Inbox"}
            </Link>
            <div
              className="delete-container"
              onClick={() => deleteTodo(todo.id)}
            >
              <div className="delete">X</div>
            </div>
          </div>
        );
    }
  }
}

const mapState = () => ({});

const mapActions = dispatch => {
  return {
    completeTodo: id => dispatch(completeTodo(id)),
    updateTodo: (id, title, dueDate, project) =>
      dispatch(updateTodo(id, title, dueDate, project)),
    deleteTodo: id => dispatch(deleteTodo(id))
  };
};

export default connect(
  mapState,
  mapActions
)(Todo);
