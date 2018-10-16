import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import mainReducer from "./reducers/index.js";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { HashRouter as BrowserRouter } from "react-router-dom";
import App from "./components/App";

const middleware = applyMiddleware(logger, thunk);
const store = createStore(mainReducer, {}, middleware);

ReactDOM.render(
  <BrowserRouter basename="/week">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);
registerServiceWorker();
