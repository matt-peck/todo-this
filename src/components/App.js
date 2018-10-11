import React, { Fragment } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import ViewContainer from "./ViewContainer";
import "../css/App.css";

const App = () => {
  return (
    <Fragment>
      <Topbar />
      <div className="main-wrapper">
        <Sidebar />
        <ViewContainer />
      </div>
    </Fragment>
  );
};

export default App;
