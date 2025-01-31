import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";


const ProtectedRoutes = ({children}) => {
    const location = useLocation();
    // context value
    const {user} = useContext(AuthContext);
    
    // If the user does not exist then go to the login route, else to the visiting route
    if(user){
        return children;
    }

   
    return <Navigate to={"/login"} state={location.pathname}></Navigate>
};

export default ProtectedRoutes;