import React, { Component } from "react";
import { connect } from "react-redux";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";
import "../css/TodoForm.scss";

class TodoForm extends Component {
  state = {
    title: this.props.title || "",
    dueDate: moment(this.props.dueDate) || null,
    project: this.props.project || "",
    focused: false,
    isProjectListOpen: false
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
    const { view, disableEditMode, projects } = this.props;
    return (
      <div className="todo-form-container">
        {/* Input Row */}

        <div className="todo-form-input">
          <div className="title">
            <input
              type="text"
              autoFocus
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
            />
            {this.state.isProjectListOpen && (
              <div className="todo-form-project-list">
                {projects.map(p => {
                  return (
                    <div
                      className="todo-form-project-item"
                      onClick={() =>
                        this.setState({
                          project: p.name,
                          isProjectListOpen: false
                        })
                      }
                    >
                      {p.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
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

        {/* Actions Row */}

        <div className="todo-form-actions">
          <div onClick={this.handleSubmit} className="todo-form-save">
            {(view && view === "UPDATE" && "Save") || "Add Task"}
          </div>
          <div onClick={disableEditMode} className="todo-form-cancel">
            Cancel
          </div>

          <FontAwesomeIcon
            onClick={() =>
              this.setState(prev => ({
                isProjectListOpen: !prev.isProjectListOpen
              }))
            }
            className="todo-form-projects-button"
            icon={faProjectDiagram}
          />
        </div>
      </div>
    );
  }
}

const mapFormState = state => {
  return {
    projects: state.projects
  };
};

export default connect(mapFormState)(TodoForm);
