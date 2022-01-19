import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import styled, { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { store } from "./reducers";

const Global = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
`;

ReactDOM.render(
  <>
    <Global />
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById("root")
);
