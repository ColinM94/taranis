import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Main } from "./main";
import "styles/global.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
