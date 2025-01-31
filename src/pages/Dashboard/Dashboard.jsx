import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { NavLink, Outlet } from "react-router-dom";
import useUser from "../../Hooks/useUser";
import AdminDashboard from "./Admin/AdminDashboard";
import StudentDashboard from "./StudentDashboard/StudentDashboard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { dbUser, loading, error } = useUser();
  // console.log("dbUser",dbUser);
  if (loading) {
    return <p>Loading courses...</p>;
  }
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if(dbUser?.role=="admin"){
    return(
      <AdminDashboard></AdminDashboard>
    );
  }
  else return(
    <StudentDashboard></StudentDashboard>
  );
};

export default Dashboard;
