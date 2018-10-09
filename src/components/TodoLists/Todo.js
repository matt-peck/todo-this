import React, { Component } from "react";
import { connect } from "react-redux";
import { completeTodo, updateTodo } from "../../actions/Todos";
import { AddTodoForm } from "./AddTodo";

class Todo extends Component {
  state = {
    view: "READ"
  };

  updateTodo = (title, dueDate) => {
    this.props.updateTodo(this.props.todo.id, title, dueDate);
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
    const { todo, completeTodo } = this.props;
    const { view } = this.state;

    switch (view) {
      case "EDIT":
        return (
          <AddTodoForm
            view="UPDATE"
            title={todo.title}
            dueDate={todo.dueDate}
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
          </div>
        );
    }
  }
}

const mapState = () => ({});

const mapActions = dispatch => {
  return {
    completeTodo: id => dispatch(completeTodo(id)),
    updateTodo: (id, title, dueDate) => dispatch(updateTodo(id, title, dueDate))
  };
};

export default connect(
  mapState,
  mapActions
)(Todo);
