import React, { Component, Fragment } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Main from "./Main";

// import logo from './logo.svg';
import "./App.css";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Topbar />
        <div className="main-wrapper">
          <Sidebar />
          <Main />
        </div>
      </Fragment>
    );
  }
}

export default App;
