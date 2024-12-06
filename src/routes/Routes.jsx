import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Gallery from "../pages/Gallery/Gallery";
import Contact from "../pages/Contact/Contact";
import AboutUs from "../pages/AboutUs/AboutUs";
import LoginPage from "../Auth/LoginPage";
import SignupPage from "../Auth/SignupPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Library from "../pages/Library/Library";


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
        path: "/gallery",
        element:<Gallery></Gallery>
        
      },
      {
        path: "/contact",
        element:<Contact></Contact>
        
      },
      {
        path: "/aboutUs",
        element:<AboutUs></AboutUs>
        
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