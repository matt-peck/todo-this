import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../css/Sidebar.css";

const Sidebar = ({ Projects }) => {
  return (
    <div className="sidebar">
      <Link className="nav-link" to="/inbox">
        @ Inbox
      </Link>
      <Link className="nav-link" to="/today">
        @ Today
      </Link>
      <Link className="nav-link" to="/week">
        @ Next 7 Days
      </Link>
      <Link className="nav-link" to="/">
        @ Projects
      </Link>
      {Projects.map(p => {
        return (
          <Link key={p} className="nav-link project" to={`/project/${p}`}>
            {p}
          </Link>
        );
      })}
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
export default connect(mapState)(Sidebar);
