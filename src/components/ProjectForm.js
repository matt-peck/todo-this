import React, { Component } from "react";
import { connect } from "react-redux";
import { addProject } from "../actions/projects";
import "../css/ProjectForm.scss";

class ProjectForm extends Component {
  state = {
    name: ""
  };

  addProject = () => {
    if (this.state.name.trim() !== "") {
      this.props.addProject(this.state.name.trim());
      this.props.cancel();
    }
  };

  render() {
    return (
      this.props.isOpen && (
        <div className="project-form-container">
          <div className="project-form-input">
            <input
              type="text"
              autoFocus
              placeholder="Name your project"
              value={this.state.name}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  this.addProject();
                }
              }}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="project-form-actions">
            <div onClick={this.addProject} className="project-form-save">
              Add Project
            </div>
            <div onClick={this.props.cancel} className="project-form-cancel">
              Cancel
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapFormState = state => {
  return {};
};

const mapActions = dispatch => {
  return {
    addProject: name => dispatch(addProject(name))
  };
};

export default connect(
  mapFormState,
  mapActions
)(ProjectForm);
