import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";
import { Commet } from "react-loading-indicators";

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  // Wait until loading finishes before deciding to navigate
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Commet color="#cc7731" size="large" text="" textColor="#NaNNaNNaN" />
      </div>
    );
  }

  // Show children if authenticated, otherwise navigate to login
  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoutes;
