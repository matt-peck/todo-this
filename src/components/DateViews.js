import React, { Fragment } from "react";
import TodoList from "./TodoList";
import * as moment from "moment";

export const TodayView = () => {
  return (
    <Fragment>
      <header className="view-header">Today</header>
      <TodoList date={moment()} />
    </Fragment>
  );
};

export const WeekView = () => {
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
