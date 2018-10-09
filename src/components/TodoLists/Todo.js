import React, { Component } from "react";
import { connect } from "react-redux";
import { completeTodo, updateTodo, deleteTodo } from "../../actions/Todos";
import { AddTodoForm } from "./AddTodo";

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
          <AddTodoForm
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
            <span
              onClick={() => completeTodo(todo.id)}
              className="complete-btn"
            />
            <span onClick={this.toggleView} className="title">
              {todo.title}
            </span>
            <span className="project">{todo.project && todo.project}</span>
            <span className="delete" onClick={() => deleteTodo(todo.id)}>
              X
            </span>
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
