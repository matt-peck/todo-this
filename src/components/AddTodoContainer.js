import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions/Todos";
import TodoForm from "./TodoForm";

const AddTodoButton = ({ toggleView }) => {
  return (
    <div
      onClick={toggleView}
      style={{ marginLeft: "20px", marginBottom: "25px" }}
    >
      <span
        style={{
          fontSize: "28px",
          marginRight: "10px",
          color: "#808080",
          fontWeight: "100"
        }}
      >
        +
      </span>
      <span
        style={{
          fontSize: "16px",
          fontWeight: "normal",
          color: "#808080"
        }}
      >
        Add Task
      </span>
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
