import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendar as todayCal,
  faCalendarAlt
} from "@fortawesome/free-regular-svg-icons";
import ProjectForm from "./ProjectForm";
import { Types } from "../constants";
import "../css/Sidebar.scss";

class Sidebar extends Component {
  state = {
    isOpen: false
  };

  toggleProjects = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  };

  openProjectForm = () => {
    this.setState({ isProjectFormOpen: true });
  };

  render() {
    const {
      projects,
      todos,
      location,
      isProjectFormOpen,
      disableAllForms,
      openProjectForm,
      closeProjectForm
    } = this.props;
    const { isOpen } = this.state;

    const page = location.pathname;
    const today = moment().format("DD");
    return (
      <div className="sidebar">
        <Link
          onClick={disableAllForms}
          className={`nav-link ${page === "/inbox" && "active"}`}
          to={(page === "/inbox" && null) || "/inbox"}
        >
          <FontAwesomeIcon className="nav-link-icon" icon={faInbox} />
          Inbox
          <span className="counter">
            {todos.filter(t => !t.project).length || ""}
          </span>
        </Link>
        <Link
          onClick={disableAllForms}
          className={`nav-link ${page === "/today" && "active"}`}
          to="/today"
        >
          <FontAwesomeIcon className="nav-link-icon today" icon={todayCal} />
          <span className="today-text">{today}</span>
          Today
          <span className="counter">
            {todos.filter(t => moment().isSame(t.dueDate, "day")).length || ""}
          </span>
        </Link>
        <Link
          onClick={disableAllForms}
          className={`nav-link ${page === "/week" && "active"}`}
          to="/week"
        >
          <FontAwesomeIcon className="nav-link-icon" icon={faCalendarAlt} />
          Next 7 Days
          <span className="counter">
            {todos.filter(t =>
              moment(t.dueDate).isBefore(moment().add(7, "days"), "day")
            ).length || ""}
          </span>
        </Link>
        <div onClick={this.toggleProjects} className="nav-link projects">
          <FontAwesomeIcon
            style={{
              transform: isOpen ? "rotate(90deg)" : "rotate(0deg)"
            }}
            className="nav-link-icon projects"
            icon={faAngleRight}
          />
          Projects
          {/* <span className="plus" onClick={this.openProjectForm}>+</span> */}
        </div>
        <div
          style={{
            height: isOpen ? `${projects.length * 40 + 80}px` : "0px"
          }}
          className="project-lists-container"
        >
          {projects.map(p => {
            return (
              <Link
                key={p.name}
                onClick={disableAllForms}
                className={`nav-link  projects-list-item ${page ===
                  `/projects/${p.name}` && "active"}`}
                to={`/projects/${p.name}`}
              >
                {/* <FontAwesomeIcon className="nav-link-icon" icon={faAngleRight} /> */}
                {p.name}
                <span className="counter">
                  {todos.filter(t => t.project === p.name).length || ""}
                </span>
              </Link>
            );
          })}
          {(isProjectFormOpen && (
            <ProjectForm isOpen={isProjectFormOpen} cancel={closeProjectForm} />
          )) || (
            <div
              onClick={openProjectForm}
              className="add-todo-button-container"
            >
              <div className="add-todo-button-plus">+</div>
              <div className="add-todo-button-text">Add Project</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapState = state => {
  return {
    projects: state.projects,
    todos: state.todos,
    isProjectFormOpen: state.isProjectFormOpen
  };
};

const mapActions = dispatch => {
  return {
    disableAllForms: () => dispatch({ type: Types.TODO_DISABLE_EDIT_ALL }),
    openProjectForm: () => {
      dispatch({ type: Types.TODO_DISABLE_EDIT_ALL });
      dispatch({ type: Types.OPEN_PROJECT_FORM });
    },
    closeProjectForm: () => dispatch({ type: Types.CLOSE_PROJECT_FORM })
  };
};

export default withRouter(
  connect(
    mapState,
    mapActions
  )(Sidebar)
);
