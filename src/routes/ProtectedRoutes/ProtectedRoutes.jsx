import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { Navigate } from "react-router-dom";


const ProtectedRoutes = ({children}) => {
    // context value
    const {user} = useContext(AuthContext);
    
    // If the user does not exist then go to the login route, else to the visiting route
    if(!user){
        return <Navigate to={"/login"}></Navigate>
    }

    return children;
};

export default ProtectedRoutes;