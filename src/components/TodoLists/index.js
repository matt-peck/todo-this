import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import TodayView from "./TodayView";
import WeekView from "./WeekView";
import InboxView from "./InboxView";
import "../../css/TodoLists.css";

// Check out: https://gist.github.com/zvweiss/66517767889a7ed9895a
// add viewFilter

const TodoLists = () => {
  return (
    <div className="main">
      <Route path="/inbox" render={props => <InboxView {...props} />} />
      <Route path="/today" render={props => <TodayView {...props} />} />
      <Route path="/week" render={props => <WeekView {...props} />} />
    </div>
  );
};

const mapState = state => {
  return {};
};

const mapActions = () => {
  return {};
};

export default withRouter(
  connect(
    mapState,
    mapActions
  )(TodoLists)
);
