import React, { Component } from "react";
import { connect } from "react-redux";

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

class AddTodoFormShell extends Component {
  state = {
    title: this.props.title || "",
    dueDate: this.props.dueDate || "",
    project: this.props.project || ""
  };

  addTodo = () => {
    this.props.addTodo(
      this.state.title,
      this.state.dueDate,
      this.state.project
    );
    this.clearTitle();
  };

  updateTodo = () => {
    this.props.updateTodo(
      this.state.title,
      this.state.dueDate,
      this.state.project
    );
  };

  handleSubmit = () => {
    if (this.props.view && this.props.view === "UPDATE") {
      this.updateTodo();
    } else {
      this.addTodo();
    }
  };

  clearTitle = () => this.setState({ title: "" });

  render() {
    const { toggleView, view } = this.props;
    return (
      <div className="add-todo" style={{ marginTop: "5px" }}>
        <div className="input">
          <input
            type="text"
            autoFocus
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <input
            type="date"
            value={this.state.dueDate}
            onChange={e => this.setState({ dueDate: e.target.value })}
          />
        </div>
        <div style={{ paddingLeft: "20px", marginTop: "10px" }}>
          <span
            onClick={this.handleSubmit}
            className="btn"
            style={{ marginRight: "10px" }}
          >
            {(view && view === "UPDATE" && "Save") || "Add Task"}
          </span>
          <span onClick={toggleView} className="cancel">
            Cancel
          </span>
          <select
            className="todo-form-projects-button"
            value={this.state.project}
            onChange={e => this.setState({ project: e.target.value })}
          >
            <option>---</option>
            {this.props.Projects.map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

const mapFormState = state => {
  const Projects = state.Projects.reduce((list, p) => {
    return [...list, p.name, ...p.subProjects.map(s => s.name)];
  }, []);
  return {
    Projects
  };
};
export const AddTodoForm = connect(mapFormState)(AddTodoFormShell);

class AddTodo extends Component {
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
          <AddTodoForm
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

export default AddTodo;
