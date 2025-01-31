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
import DashboardCourses from "../pages/Dashboard/DashboardCourses/DashboardCourses";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import MyBooks from "../pages/Dashboard/MyBooks/MyBooks";
import UnderConstruction from "../components/UnderConstruction";
// import ProtectedLogin from "./ProtectedRoutes/ProtectedLogin",
import LiveSessions from "../pages/Tutor/LiveSessions";
import Teaching from "../pages/Tutor/Teaching";
import Courses from "../pages/Tutor/Courses";
import EditCourse from "../pages/Tutor/EditCourse";
import BookMark from "../pages/BookMark/BookMarkMainLayout";
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
        path: "/bookmark",
        element: (
          <ProtectedRoutes>
            <BookMark />
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
        children: [
          {
            index: true, // Default route for `/tutor`
            element: (
              <ProtectedRoutes>
                <Courses />
              </ProtectedRoutes>
            ),
          },
          {
            path: "live-sessions",
            element: (
              <ProtectedRoutes>
                <LiveSessions />
              </ProtectedRoutes>
            ),
          },
          {
            path: "teaching",
            element: (
              <ProtectedRoutes>
                <Teaching />
              </ProtectedRoutes>
            ),
          },
          {
            path: "edit-course/:courseId",
            element: (
              <ProtectedRoutes>
                <EditCourse />
              </ProtectedRoutes>
            ),
          },
        ],
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
          // <ProtectedLogin>
            <LoginPage />
          // </ProtectedLogin>
        ),
      },
      {
        path: "/signup",
        element: (
          // <ProtectedLogin>
            <SignupPage />
          // </ProtectedLogin>
        ),
      },

      // Dashboard
      {
        path: "/dashboard",
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
        children: [
          {
            // index: true,
            path: "",
            element: <DashboardHome></DashboardHome>,
          },
          {
            // index: true,
            path: "enrolledCourses",
            element: <DashboardCourses></DashboardCourses>,
          },
          {
            path: "myBooks",
            element: <MyBooks></MyBooks>,
          },
          {
            path: "pdf",
            element: <UnderConstruction></UnderConstruction>,
          },
          {
            path: "notes",
            element: <UnderConstruction></UnderConstruction>,
          },
          {
            path: "questions",
            element: <UnderConstruction></UnderConstruction>,
          },
          {
            path: "tutors",
            element: <UnderConstruction></UnderConstruction>,
          },
          {
            path: "settings",
            element: <UnderConstruction></UnderConstruction>,
          },
        ],
      },
    ],
  },
]);

export default router;
