import React, { Fragment } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import ViewContainer from "./ViewContainer";
import "../css/App.scss";

const App = () => {
  return (
    <Fragment>
      <Topbar />
      <div className="grid-container">
        <Sidebar />
        <ViewContainer />
      </div>
    </Fragment>
  );
};

export default App;
