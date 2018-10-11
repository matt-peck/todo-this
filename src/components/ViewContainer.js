import React from "react";
import { Route, withRouter } from "react-router-dom";
import { TodayView, WeekView } from "./DateViews";
import { InboxView, ProjectView } from "./ProjectViews";
import "../css/ViewContainer.css";

const ViewContainer = () => {
  return (
    <div className="view-container">
      <Route path="/inbox" component={InboxView} />
      <Route path="/today" component={TodayView} />
      <Route path="/week" component={WeekView} />
      <Route path="/projects/:projectName?" component={ProjectView} />
    </div>
  );
};

export default withRouter(ViewContainer);
