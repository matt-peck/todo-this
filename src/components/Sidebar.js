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
import "../css/Sidebar.scss";

class Sidebar extends Component {
  state = {
    isOpen: false
  };

  toggleProjects = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  };

  render() {
    const { projects, todos, location } = this.props;
    const { isOpen } = this.state;

    const page = location.pathname;
    const today = moment().format("DD");
    return (
      <div className="sidebar">
        <Link
          className={`nav-link ${page === "/inbox" && "active"}`}
          to="/inbox"
        >
          <FontAwesomeIcon className="nav-link-icon" icon={faInbox} />
          Inbox
          <span className="counter">
            {todos.filter(t => !t.project).length || ""}
          </span>
        </Link>
        <Link
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
        <Link className={`nav-link ${page === "/week" && "active"}`} to="/week">
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
          {/* <span className="plus">+</span> */}
        </div>
        <div
          style={{
            height: isOpen ? `${projects.length * 40}px` : "0px"
          }}
          className="project-lists-container"
        >
          {projects.map(p => {
            return (
              <Link
                key={p}
                className={`nav-link  projects-list-item ${page ===
                  `/projects/${p}` && "active"}`}
                to={`/projects/${p}`}
              >
                {/* <FontAwesomeIcon className="nav-link-icon" icon={faAngleRight} /> */}
                {p}
                <span className="counter">
                  {todos.filter(t => t.project === p).length || ""}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
const mapState = state => {
  const projects = state.projects.reduce((list, p) => {
    return [...list, p.name, ...p.subProjects.map(s => s.name)];
  }, []);

  return {
    projects,
    todos: state.todos
  };
};
export default withRouter(connect(mapState)(Sidebar));
