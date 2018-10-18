import React, { Component } from "react";
import { connect } from "react-redux";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import * as moment from "moment";
import "../css/TodoForm.scss";

class TodoForm extends Component {
  state = {
    title: this.props.title || "",
    dueDate: moment(this.props.dueDate) || null,
    project: this.props.project || "",
    focused: false
  };

  addTodo = () => {
    this.props.addTodo(
      this.state.title.trim(),
      this.state.dueDate,
      this.state.project
    );
    this.clearTitle();
  };

  updateTodo = () => {
    this.props.updateTodo(
      this.state.title.trim(),
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
    const { view, disableEditMode } = this.props;
    return (
      <div className="todo-form-container">
        <div className="todo-form-input">
          <input
            type="text"
            autoFocus
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <SingleDatePicker
            date={this.state.dueDate}
            onDateChange={dueDate => this.setState({ dueDate })}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            id="schedule"
            numberOfMonths={1}
            small={true} //  input size
            hideKeyboardShortcutsPanel={true}
            displayFormat="MMM DD"
            orientation="horizontal"
            anchorDirection="left"
            daySize={30}
            isOutsideRange={() => false}
          />
        </div>
        <div className="todo-form-actions">
          <div onClick={this.handleSubmit} className="todo-form-save">
            {(view && view === "UPDATE" && "Save") || "Add Task"}
          </div>
          <div onClick={disableEditMode} className="todo-form-cancel">
            Cancel
          </div>
          <select
            className="todo-form-projects-button"
            value={this.state.project}
            onChange={e => this.setState({ project: e.target.value })}
          >
            <option value="">---</option>
            {this.props.projects.map(p => (
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
  const projects = state.projects.reduce((list, p) => {
    return [...list, p.name, ...p.subProjects.map(s => s.name)];
  }, []);

  return {
    projects
  };
};

export default connect(mapFormState)(TodoForm);
