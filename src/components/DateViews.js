import React, { Fragment } from "react";
import TodoListContainer from "./TodoListContainer";
import * as moment from "moment";

export const TodayView = () => {
  return (
    <Fragment>
      <header className="view-header">Today</header>
      <TodoListContainer date={moment()} />
    </Fragment>
  );
};

export const WeekView = () => {
  const days = [0, 1, 2, 3, 4, 5, 6];

  return (
    <Fragment>
      <header className="view-header week">Next 7 Days</header>
      <TodoListContainer overdue />
      {days.map(d => (
        <TodoListContainer key={d} date={moment().add(d, "days")} />
      ))}
    </Fragment>
  );
};
