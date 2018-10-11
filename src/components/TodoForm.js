import React, { Component } from "react";
import { connect } from "react-redux";

class TodoForm extends Component {
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

export default connect(mapFormState)(TodoForm);
