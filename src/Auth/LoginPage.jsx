import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImage from "../assets/login.png";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you include the toast CSS
// import auth from "../utils/firebase.config";
import { AuthContext } from "../providers/AuthProviders";

const LoginPage = () => {
  // Context value
  const { signIn,loading,user } = useContext(AuthContext);

  //get the location
  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();

  const fromLocation = location.state || "/";
  useEffect(()=>{
    if(!loading && user){
      navigate(fromLocation);
    }
  },[loading,fromLocation,user,navigate])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle Email Change
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Handle Password Change
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Toggle Password Visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Check if Login Button Should Be Enabled
  const isLoginDisabled = email.trim() === "" || password.trim() === "";

  // Handle Form Submission
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      await signIn(email, password).then((res) => {
        console.log("InnerRes",res);
        if (res) {
          console.log(fromLocation);
          toast.success("Login successful! Welcome back.");
          navigate(fromLocation);
        }
      });

      // You can navigate the user to another page after login if needed
    } catch (error) {
      // Show error message based on Firebase authentication error codes
      if (error.code === "auth/user-not-found") {
        toast.error("User not found. Please check your email or sign up.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many login attempts. Please try again later.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#ffddbb] flex flex-col items-center justify-center p-4">
      <ToastContainer></ToastContainer>
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-black mb-6">UIU Pathshala</h1>

      {/* Login Container */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left Side Image */}
        <div className="flex-1 hidden md:flex items-center justify-center">
          <img src={loginImage} alt="Login" className="max-w-full h-auto p-4" />
        </div>

        {/* Right Side Form */}
        <div className="flex-1 p-6 md:p-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Login</h2>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            {/* Email Input */}
            <div>
              <label
                className="block text-gray-600 font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                className="block text-gray-600 font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full font-bold py-2 px-4 rounded-lg transition duration-200 ${
                isLoginDisabled
                  ? "bg-orange-200 text-gray-700 cursor-not-allowed"
                  : "bg-[#f68c1e] text-white hover:bg-orange-600"
              }`}
              disabled={isLoginDisabled}
            >
              Login
            </button>
          </form>

          {/* Sign-Up Link */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/Signup"
                className="text-orange-500 font-bold hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
