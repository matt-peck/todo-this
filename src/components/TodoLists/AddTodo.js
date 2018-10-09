import React, { Component } from "react";

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

export class AddTodoForm extends Component {
  state = {
    title: this.props.title || "",
    dueDate: this.props.dueDate || ""
  };

  addTodo = () => {
    this.props.addTodo(this.state.title);
    this.clearTitle();
  };

  updateTodo = () => {
    this.props.updateTodo(this.state.title, this.state.dueDate);
  };

  handleSubmit = () => {
    if (this.props.view && this.props.view === "UPDATE") {
      this.updateTodo();
    } else {
      this.addTodo();
    }
  };

  clearTitle = () => this.setState({ title: "" });

  componentWillMount = () => {
    console.log("componentWillMount", this.props.dueDate);
  };

  componentDidMount = () => {
    console.log("componentDidMount", this.props.dueDate);
  };

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
          <span className="todo-form-projects-button">--PROJECTS--</span>
        </div>
      </div>
    );
  }
}

class AddTodo extends Component {
  state = {
    view: "BUTTON_VIEW"
  };

  addTodo = title => {
    this.props.addTodo(title);
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
    const { view } = this.state;

    switch (view) {
      case "BUTTON_VIEW":
        return <AddTodoButton toggleView={this.toggleView} />;

      case "FORM_VIEW":
        return (
          <AddTodoForm addTodo={this.addTodo} toggleView={this.toggleView} />
        );

      default:
        return;
    }
  }
}

export default AddTodo;
