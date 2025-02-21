import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImage from "../assets/login.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthProviders";

const LoginPage = () => {
  const { signIn, loading, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const fromLocation = location.state || "/";

  useEffect(() => {
    if (!loading && user) {
      navigate(fromLocation);
    }
  }, [loading, fromLocation, user, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle Email Change & Validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  // Handle Password Change & Validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Disable Login Button if Inputs Are Invalid
  const isLoginDisabled =
    email.trim() === "" || password.trim() === "" || emailError || passwordError;

  // Handle Form Submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password).then((res) => {
        if (res) {
          navigate(fromLocation);
          toast.success("Login successful! Welcome back.");
        }
      });
    } catch (error) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-800 to-orange-400 p-4">
      <ToastContainer />
      
      {/* Login Container */}
      <div className="bg-white bg-gradient-to-br from-orange-500 to-orange-200 rounded-2xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row">
        
        {/* Left Side Image */}
        <div className="flex-1 hidden md:flex items-center justify-center  from-orange-800 to-orange-400 rounded-l-2xl">
          <img src={loginImage} alt="Login" className="max-w-xs md:max-w-sm" />
        </div>

        {/* Right Side Form */}
        <div className="flex-1 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Welcome Back</h2>
          <p className="text-gray-600 text-center mb-6">Login to your account</p>
          
          <form className="space-y-5" onSubmit={handleFormSubmit}>
            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full border ${emailError ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500`}
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full border ${passwordError ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500`}
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
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full font-bold py-2 px-4 rounded-lg transition duration-200 ${
                isLoginDisabled
                  ? "bg-orange-200 text-gray-700 cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600"
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
