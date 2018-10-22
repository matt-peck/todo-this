import React from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { TodayView, WeekView } from "./DateViews";
import { InboxView, ProjectView } from "./ProjectViews";
import { Types } from "../constants";
import "../css/ViewContainer.scss";

const ViewContainer = ({ disableAllForms }) => {
  return (
    <article className="view-container">
      <Switch>
        <Redirect to="/week" exact from="/" />
        <Route
          path="/inbox"
          render={props => {
            disableAllForms();
            return <InboxView {...props} />;
          }}
        />
        <Route
          path="/today"
          render={props => {
            disableAllForms();
            return <TodayView {...props} />;
          }}
        />
        <Route
          path="/week"
          render={props => {
            return <WeekView {...props} />;
          }}
        />
        <Route path="/projects/:projectName?" render={ProjectView} />
      </Switch>
    </article>
  );
};

const mapActions = dispatch => {
  return {
    disableAllForms: () => dispatch({ type: Types.TODO_DISABLE_EDIT_ALL })
  };
};
export default withRouter(
  connect(
    null,
    mapActions
  )(ViewContainer)
);
