import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions/Todos";
import TodoForm from "./TodoForm";
import "../css/AddTodoContainer.css";
import { Modes } from "../constants";

const AddTodoButton = ({ enableEditMode }) => {
  return (
    <div onClick={enableEditMode} className="add-todo-button-container">
      <div className="add-todo-button-plus">+</div>
      <div className="add-todo-button-text">Add Task</div>
    </div>
  );
};

class AddTodoContainer extends Component {
  addTodo = (title, dueDate, project) => {
    this.props.addTodo(title, dueDate, project);
  };

  render() {
    const {
      project,
      dueDate,
      enableEditMode,
      disableEditMode,
      mode
    } = this.props;

    switch (mode) {
      case Modes.READ:
        return <AddTodoButton enableEditMode={enableEditMode} />;

      case Modes.EDIT:
        return (
          <TodoForm
            addTodo={this.addTodo}
            disableEditMode={disableEditMode}
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
