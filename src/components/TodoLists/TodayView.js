import React, { Fragment } from "react";
import { connect } from "react-redux";
import TodoList from "./TodoList";
import * as moment from "moment";

const TodayView = () => {
  return (
    <Fragment>
      <header className="view-header">Today</header>
      <TodoList date={moment()} />
    </Fragment>
  );
};

const mapState = state => {
  return {};
};

const mapActions = () => {
  return {};
};

export default connect(
  mapState,
  mapActions
)(TodayView);
