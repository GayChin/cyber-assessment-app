import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
// import('./app').then(({ initialize }) => initialize());
import {store, persistor} from "./redux/store";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

import {PersistGate} from "redux-persist/integration/react";

if (process.env.REACT_APP_NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
