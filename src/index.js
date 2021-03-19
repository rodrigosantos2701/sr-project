import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { StoredProvider } from "./providers/store";

ReactDOM.render(
  <React.StrictMode>
    <StoredProvider>
      <App />
    </StoredProvider>
  </React.StrictMode>,
  document.getElementById("root")
);


