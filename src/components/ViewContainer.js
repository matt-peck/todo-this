import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { TodayView, WeekView } from "./DateViews";
import { InboxView, ProjectView } from "./ProjectViews";
import "../css/ViewContainer.scss";

const ViewContainer = () => {
  return (
    <article className="view-container">
      <Redirect to="/week" exact from="/" />
      <Route path="/inbox" component={InboxView} />
      <Route path="/today" component={TodayView} />
      <Route path="/week" component={WeekView} />
      <Route path="/projects/:projectName?" component={ProjectView} />
    </article>
  );
};

export default withRouter(ViewContainer);
