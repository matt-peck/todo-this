import React, { Fragment } from "react";
import { connect } from "react-redux";
import TodoList from "./TodoList";
import * as moment from "moment";

const WeekView = () => {
  const days = [0, 1, 2, 3, 4, 5, 6];

  return (
    <Fragment>
      <header className="view-header">Next 7 Days</header>
      <TodoList overdue />

      {days.map(d => (
        <TodoList key={d} date={moment().add(d, "days")} />
      ))}
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
)(WeekView);
