import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthProviders";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    setEmailError(regex.test(email) ? "" : "Invalid email format");
  };

  const validatePassword = (password) => {
    setPasswordError(password.length >= 6 ? "" : "Password must be at least 6 characters");
  };

  const isLoginDisabled = !email || !password || emailError || passwordError;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      toast.success("Login successful! Welcome back.");
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-600 to-orange-300 p-6">
      <ToastContainer />
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-4xl h-96">
        <div
          className="md:w-1/2 bg-cover bg-center  md:h-auto "
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-vector/secure-login-form-page-with-password-computer-padlock-3d-vector-icon-cartoon-minimal-style_365941-1119.jpg?semt=ais_hybrid')",
          }}
        ></div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Welcome Back</h2>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email"
                className={`w-full border ${emailError ? "border-red-500" : "border-black"} rounded-lg px-4 py-2`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                required
              />
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full border ${passwordError ? "border-red-500" : "border-black"} rounded-lg px-4 py-2 pr-10`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className={`w-full bg-orange-400 text-white py-2 rounded-lg ${isLoginDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"}`}
              disabled={isLoginDisabled}
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account? {" "}
              <Link to="/Signup" className="text-orange-500 font-bold hover:underline">
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
