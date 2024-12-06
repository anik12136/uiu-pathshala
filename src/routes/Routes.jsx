import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";



import LoginPage from "../Auth/LoginPage";
import SignupPage from "../Auth/SignupPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Library from "../pages/Library/Library";
import Tutor from "../pages/Tutor/Tutor";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element:<Home></Home>
        
      },
      {
        path: "/dashboard",
        element:<Dashboard></Dashboard>
        
      },
      {
        path:"/library",
        element:<Library></Library>
      },
   
      {
        path: "/tutor",
        element:<Tutor></Tutor>
        
      },
      {
        path: "/login",
        element:<LoginPage></LoginPage>
        
      },
      {
        path: "/signup",
        element:<SignupPage></SignupPage>
        
      },
    ],
  },
]);

export default router;