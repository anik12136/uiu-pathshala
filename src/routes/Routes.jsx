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
import GeneralCommunity from "../pages/General Community/MainLayout";
import Prog_Community from "../pages/Programming  Community/MainLayout";
import Messaging from "../pages/Messaging/Messaging";
import Test from "../Laboratory/Test";
import UserProfile from "../pages/UserProfile/UserProfile";

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
      // This route is for tes purpose
      {
        path:"/test",
        element:<Test></Test>
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
        path: "/user-profile",
        element: (
          <ProtectedRoutes>
            <UserProfile></UserProfile>,
          </ProtectedRoutes>
        ),
      },
      {
        path: "/messaging",
        element: (
          <ProtectedRoutes>
            <Messaging></Messaging>,
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
        path: "/General_Community",
        element: (
          <ProtectedRoutes>
            <GeneralCommunity></GeneralCommunity>,
          </ProtectedRoutes>
        ),
      },
      {
        path: "/Prog_Community",
        element: (
          <ProtectedRoutes>
            <Prog_Community></Prog_Community>,
          </ProtectedRoutes>
        ),
      },
      {
        path: "/explore",
        element: (
          <ProtectedRoutes>
            <Explore></Explore>
          </ProtectedRoutes>
        ),
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