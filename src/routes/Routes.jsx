import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Gallery from "../pages/Gallery/Gallery";
import Contact from "../pages/Contact/Contact";
import AboutUs from "../pages/AboutUs/AboutUs";


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
    ],
  },
]);

export default router;