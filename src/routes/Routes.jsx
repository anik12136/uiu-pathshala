import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import LoginPage from "../Auth/LoginPage";
import SignupPage from "../Auth/SignupPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Library from "../pages/Library/Library";
import Tutor from "../pages/Tutor/Tutor";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import Explore from "../pages/Explore/Explore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoutes>
            <Home></Home>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoutes>
            <Dashboard></Dashboard>,
          </ProtectedRoutes>
        ),
      },
      {
        path: "/messaging",
        element: (
          <ProtectedRoutes>
            <Dashboard></Dashboard>,
          </ProtectedRoutes>
        ),
      },
      
      {
        path: "/library",
        element: (
          <ProtectedRoutes>
            <Library></Library>,
          </ProtectedRoutes>
        ),
      },

      {
        path: "/tutor",
        element: (
          <ProtectedRoutes>
            <Tutor></Tutor>,
          </ProtectedRoutes>
        ),
      },
      {
        path:"/explore",
        element:<ProtectedRoutes>
          <Explore></Explore>
        </ProtectedRoutes>
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/signup",
        element: <SignupPage></SignupPage>,
      },
    ],
  },
]);

export default router;
