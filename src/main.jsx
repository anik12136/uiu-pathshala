import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import Routes from "../src/routes/Routes.jsx";
// import AuthProviders from "./providers/AuthProviders.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AuthProviders> */}
      <RouterProvider router={Routes}></RouterProvider>
    {/* </AuthProviders> */}
  </StrictMode>
);
