import React from "react";
import { Link } from "react-router-dom";
import "../../css/Sidebar.css";

export default () => {
  return (
    <div className="sidebar">
      <Link
        style={{
          color: "black",
          textDecoration: "none",
          display: "block",
          marginBottom: "10px"
        }}
        to="/inbox"
      >
        <span>@ </span>
        Inbox
      </Link>
      <Link
        style={{
          color: "black",
          textDecoration: "none",
          display: "block",
          marginBottom: "10px"
        }}
        to="/today"
      >
        <span>@ </span>
        Today
      </Link>
      <Link
        style={{
          color: "black",
          textDecoration: "none",
          display: "block",
          marginBottom: "10px"
        }}
        to="/week"
      >
        <span>@ </span>
        Next 7 Days
      </Link>
      {/* <div>
        <span>@ </span>
        Projects
        <span
          style={{
            // border: "1px solid black",
            float: "right",
            lineHeight: "17px",
            marginRight: "20px",
            fontSize: "22px"
          }}
        >
          +
        </span>
      </div> */}
    </div>
  );
};
