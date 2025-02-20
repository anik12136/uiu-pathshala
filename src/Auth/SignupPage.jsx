import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthProviders";
import signupImage from "../assets/signup.png";

const SignupPage = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    setEmailError(regex.test(email) ? "" : "Invalid email format");
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    setPasswordError(
      regex.test(password) ? "" : "Password must be at least 6 characters and contain a special character"
    );
  };

  const validateConfirmPassword = (confirmPassword) => {
    setConfirmPasswordError(
      confirmPassword === password ? "" : "Passwords do not match"
    );
  };

  const isSignupDisabled =
    !name ||
    !studentID ||
    !email ||
    !password ||
    !confirmPassword ||
    emailError ||
    passwordError ||
    confirmPasswordError;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createUser(email, password);
      const user = result.user;

      // Store User Data in Database
      const userData = {
        name,
        studentID,
        email,
        photoURL: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
        role: "user",
        rating: 0,
        department: "",
      };

      const response = await fetch("http://localhost:7000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success("Account created successfully!");
        setName("");
        setStudentID("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhotoURL("");
        navigate("/");
      } else {
        throw new Error("Failed to save user data to the database");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 to-orange-400 p-4">
      <ToastContainer />

      {/* Sign-Up Container */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-200 rounded-2xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row">

        {/* Left Side Image */}
        <div className="flex-1 hidden md:flex items-center justify-center">
          <img src={signupImage} alt="Signup" className="max-w-xs md:max-w-sm" />
        </div>

        {/* Right Side Form */}
        <div className="flex-1 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Create an Account</h2>
          <p className="text-gray-600 text-center mb-6">Sign up and join our platform</p>

          <form className="space-y-5" onSubmit={handleFormSubmit}>
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className={`w-full border ${!name ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Student ID Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Student ID</label>
              <input
                type="text"
                placeholder="Enter your Student ID"
                className={`w-full border ${!studentID ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500`}
                value={studentID}
                onChange={(e) => setStudentID(e.target.value)}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full border ${emailError ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
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

            {/* Confirm Password Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                className={`w-full border ${confirmPasswordError ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500`}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateConfirmPassword(e.target.value);
                }}
                required
              />
              {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full font-bold py-2 px-4 rounded-lg transition duration-200 ${isSignupDisabled
                ? "bg-orange-200 text-gray-700 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              disabled={isSignupDisabled}
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 font-bold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
