import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addTodo,
  enableTodoEditMode,
  disableTodoEditMode
} from "../actions/todos";
import { Modes, Types } from "../constants";
import TodoForm from "./TodoForm";
import "../css/AddTodoContainer.scss";

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
    this.props.addTodo(title.trim(), dueDate, project);
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
        return (
          <AddTodoButton
            enableEditMode={() =>
              enableEditMode({
                type: Types.FORM.ADD_TODO,
                // when date not provided its a project list
                // when project not provided its an inbox list
                id: dueDate || project || "Inbox"
              })
            }
          />
        );

      case Modes.EDIT:
        return (
          <TodoForm
            addTodo={this.addTodo}
            disableEditMode={() =>
              disableEditMode({ type: Types.FORM.ADD_TODO })
            }
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
      dispatch(addTodo(title, dueDate, project)),
    enableEditMode: ({ type, id }) =>
      dispatch(enableTodoEditMode({ type, id })),
    disableEditMode: ({ type, id }) =>
      dispatch(disableTodoEditMode({ type, id }))
  };
};

export default connect(
  mapState,
  mapActions
)(AddTodoContainer);
