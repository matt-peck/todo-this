import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendar as todayCal,
  faCalendarAlt
} from "@fortawesome/free-regular-svg-icons";
import "../css/Sidebar.css";

const Sidebar = ({ Projects, location }) => {
  const page = location.pathname;
  const today = moment().format("DD");
  return (
    <div className="sidebar">
      <Link className={`nav-link ${page === "/inbox" && "active"}`} to="/inbox">
        <FontAwesomeIcon className="nav-link-icon" icon={faInbox} />
        Inbox
      </Link>
      <Link className={`nav-link ${page === "/today" && "active"}`} to="/today">
        <FontAwesomeIcon className="nav-link-icon today" icon={todayCal} />
        <span className="today-text">{today}</span>
        Today
      </Link>
      <Link className={`nav-link ${page === "/week" && "active"}`} to="/week">
        <FontAwesomeIcon className="nav-link-icon" icon={faCalendarAlt} />
        Next 7 Days
      </Link>
      <Link className="nav-link projects" to="/projects">
        <FontAwesomeIcon className="nav-link-icon" icon={faAngleRight} />
        Projects
        <span className="plus">+</span>
      </Link>
      {/* {Projects.map(p => {
        return (
          <Link key={p} className="nav-link projects" to={`/projects/${p}`}>
            {p}
          </Link>
        );
      })} */}
    </div>
  );
};
const mapState = state => {
  const Projects = state.Projects.reduce((list, p) => {
    return [...list, p.name, ...p.subProjects.map(s => s.name)];
  }, []);
  return {
    Projects
  };
};
export default withRouter(connect(mapState)(Sidebar));
