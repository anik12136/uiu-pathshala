import { createBrowserRouter, Navigate } from "react-router-dom";
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
// import DashboardCourses from "../pages/Dashboard/DashboardCourses/DashboardCourses";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import UnderConstruction from "../components/UnderConstruction";
// import ProtectedLogin from "./ProtectedRoutes/ProtectedLogin",
import LiveSessions from "../pages/Tutor/LiveSessions";
import Teaching from "../pages/Tutor/Teaching";
import Courses from "../pages/Tutor/Courses";
import EditCourse from "../pages/Tutor/EditCourse";
import BookMark from "../pages/BookMark/BookMarkMainLayout";
import UserDetails from "../pages/Dashboard/Admin/AllUsers/UserDetails";
import Books from "../pages/Books/Books";
import Questions from "../pages/Questions/Questions";
import Notes from "../pages/Notes/Notes";
import Curriculums from "../pages/Curriculums/Curriculums";
import DisplayLibraryContents from "../pages/DisplayLibraryContents/DisplayLibraryContents";
import AllCourses from "../pages/AllCourses/AllCourses";
import MyContest from "../pages/Dashboard/StudentDashboard/Mycontest/Mycontest";
import DashboardCourses from "../pages/Dashboard/StudentDashboard/DashboardCourses/DashboardCourses";
import MyPdf from "../pages/Dashboard/StudentDashboard/MyPdf/MyPdf";
import MyBooks from "../pages/Dashboard/StudentDashboard/MyBooks/MyBooks";
import MyNotes from "../pages/Dashboard/StudentDashboard/MyNotes/MyNotes";
import MyQuestions from "../pages/Dashboard/StudentDashboard/MyQuestions/MyQuestions";
import Test2 from "../Laboratory/Test2";
import SingleCourse from "../components/Course/SingleCourse";
import Announcements from "../pages/Dashboard/Admin/Announcements/Announcements";
import ContactUs from "../pages/ContactUs/ContactUs";

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
        path: "/test2",
        element: <Test2></Test2>,
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
      // Library Route
      {
        path: "/library",
        element: (
          <ProtectedRoutes>
            <Library />
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/library/books" replace />,
          },
          {
            path: "/library/books",
            element: (
              <ProtectedRoutes>
                <Books></Books>
              </ProtectedRoutes>
            ),
          },
          {
            path: "/library/books/:subject",
            element: (
              <ProtectedRoutes>
                <DisplayLibraryContents></DisplayLibraryContents>
              </ProtectedRoutes>
            ),
          },
          {
            path: "/library/questions",
            element: (
              <ProtectedRoutes>
                <Questions></Questions>
              </ProtectedRoutes>
            ),
          },
          {
            path: "/library/questions/:subject",
            element: (
              <ProtectedRoutes>
                <DisplayLibraryContents></DisplayLibraryContents>
              </ProtectedRoutes>
            ),
          },
          {
            path: "/library/notes",
            element: (
              <ProtectedRoutes>
                <Notes></Notes>
              </ProtectedRoutes>
            ),
          },
          {
            path: "/library/notes/:subject",
            element: (
              <ProtectedRoutes>
                <DisplayLibraryContents></DisplayLibraryContents>
              </ProtectedRoutes>
            ),
          },
          {
            path: "/library/curriculums",
            element: (
              <ProtectedRoutes>
                <Curriculums></Curriculums>
              </ProtectedRoutes>
            ),
          },
          {
            path: "/library/curriculums/:subject",
            element: (
              <ProtectedRoutes>
                <DisplayLibraryContents></DisplayLibraryContents>
              </ProtectedRoutes>
            ),
          },
        ],
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
      // Tutor Route
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
            path: "home",
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
            path: "myPdf",
            element: <MyPdf></MyPdf>,
          },

          {
            path: "myNotes",
            element: <MyNotes></MyNotes>,
          },
          {
            path: "myQuestions",
            element: <MyQuestions></MyQuestions>,
          },
          {
            path: "myContest",
            element: <MyContest></MyContest>,
          },
          {
            path: "adminAnnouncements",
            element: <Announcements></Announcements>,
          },
          // {
          //   path: "tutors",
          //   element: <UnderConstruction></UnderConstruction>,
          // },
          // {
          //   path: "settings",
          //   element: <UnderConstruction></UnderConstruction>,
          // },
          {
            path: "user_details/:id",
            element: <UserDetails />,
          },
        ],
      },

      {
        path: "/allCourses",
        element: <AllCourses></AllCourses>,
      },
      {
        path: "/course/:id", // Dynamic route for single course
        element: <SingleCourse />,
      },
      {
        path: "/contactUs", 
        element: <ContactUs></ContactUs>,
      },
    ],
  },
]);

export default router;
