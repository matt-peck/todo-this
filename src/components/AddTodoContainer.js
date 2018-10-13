import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions/Todos";
import TodoForm from "./TodoForm";
import "../css/AddTodoContainer.css";

const AddTodoButton = ({ toggleView }) => {
  return (
    <div onClick={toggleView} className="add-todo-button-container">
      <div className="add-todo-button-plus">+</div>
      <div className="add-todo-button-text">Add Task</div>
    </div>
  );
};

class AddTodoContainer extends Component {
  state = {
    view: "BUTTON_VIEW"
  };

  addTodo = (title, dueDate, project) => {
    this.props.addTodo(title, dueDate, project);
    this.toggleView();
  };

  toggleView = () => {
    switch (this.state.view) {
      case "BUTTON_VIEW":
        this.setState({ view: "FORM_VIEW" });
        return;
      default:
        this.setState({ view: "BUTTON_VIEW" });
        return;
    }
  };

  render() {
    const { project, dueDate } = this.props;
    const { view } = this.state;

    switch (view) {
      case "BUTTON_VIEW":
        return <AddTodoButton toggleView={this.toggleView} />;

      case "FORM_VIEW":
        return (
          <TodoForm
            addTodo={this.addTodo}
            toggleView={this.toggleView}
            project={project}
            dueDate={dueDate}
          />
        );

      default:
        return;
    }
  }
}

const mapState = () => ({});

const mapActions = dispatch => {
  return {
    addTodo: (title, dueDate, project) =>
      dispatch(addTodo(title, dueDate, project))
  };
};

export default connect(
  mapState,
  mapActions
)(AddTodoContainer);
