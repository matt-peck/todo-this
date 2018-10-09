import React, { Component, Fragment } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import TodoLists from "./TodoLists";
import "../css/App.css";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Topbar />
        <div className="main-wrapper">
          <Sidebar />
          <TodoLists />
        </div>
      </Fragment>
    );
  }
}

export default App;
