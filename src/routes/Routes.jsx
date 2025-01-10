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
import ProgCommunity from "../pages/Programming  Community/MainLayout";
import Messaging from "../pages/Messaging/Messaging";
import Test from "../Laboratory/Test";
import UserProfile from "../pages/UserProfile/UserProfile";
import ProgrammingCommunityTabs from "../components/ProgrammingCommunityLayout";
import Question_Answer from "../pages/Programming  Community/MainLayout";
import Contest from "../pages/Programming  Community/Contest/MainLayout";
import ContestDetails from "../pages/Programming  Community/Contest/ContestDetails";
import ProtectedLogin from "./ProtectedRoutes/ProtectedLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      // This route is for test purpose
      {
        path: "/test",
        element: <Test></Test>,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoutes>
            <Dashboard />
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
            <Messaging />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/library",
        element: (
          <ProtectedRoutes>
            <Library />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/explore",
        element: (
          <ProtectedRoutes>
            <Explore />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/tutor",
        element: (
          <ProtectedRoutes>
            <Tutor />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/General_Community",
        element: (
          <ProtectedRoutes>
            <GeneralCommunity />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/Prog_Community",
        element: (
          <ProtectedRoutes>
            <ProgrammingCommunityTabs />
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true, // This will make `Question_Answer` the default route when visiting `/Prog_Community`
            element: (
              <ProtectedRoutes>
                <Question_Answer />
              </ProtectedRoutes>
            ),
          },
          {
            path: "Question_Answer", // Relative path
            element: (
              <ProtectedRoutes>
                <Question_Answer />
              </ProtectedRoutes>
            ),
          },
          {
            path: "Contest", // Relative path
            element: (
              <ProtectedRoutes>
                <Contest />
              </ProtectedRoutes>
            ),
          },
        ],
      },
      {
        path: "/contest-details/:id", // Add the new route for contest details
        element: (
          <ProtectedRoutes>
            <ContestDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedLogin>
            <LoginPage />
          </ProtectedLogin>
        ),
      },
      {
        path: "/signup",
        element: (
          <ProtectedLogin>
            <SignupPage />
          </ProtectedLogin>
        ),
      },
    ],
  },
]);

export default router;
