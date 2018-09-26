import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import appReducer from "./appReducer.js";
import logger from "redux-logger";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";

const middleware = applyMiddleware(logger, thunk);
const store = createStore(appReducer, {}, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
