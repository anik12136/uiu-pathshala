import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import signupImage from "../assets/signup.png";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you include the toast CSS
import { AuthContext } from "../providers/AuthProviders";
// import auth from "../utils/firebase.config";


const SignupPage = () => {
  const {createUser} = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle Input Changes
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Handle Password Change and Validation
  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);

    // Password Validation Logic
    if (pwd.length < 6) {
      setPasswordStrength("Weak");
    } else if (
      /[A-Z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      /[$%]/.test(pwd) // Check specifically for $ or %
    ) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
    // Toast for missing required special characters
    if (!/[$%]/.test(pwd)) {
      setPasswordStrength(
        "Password must include at least one special character ($ or %)."
      );
    }
  };

  // Handle Confirm Password Change
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Toggle Password Visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Check if Signup Button Should Be Enabled
  const isSignupDisabled =
    name.trim() === "" ||
    email.trim() === "" ||
    password.trim() === "" ||
    confirmPassword.trim() === "" ||
    password !== confirmPassword;

  // Handle Form Submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
     await createUser(
       
          email,
          password
        );
        toast.success(`Account created successfully for ${name}!`);
        //clan up the form
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");


      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    } else {
      toast.error("Passwords do not match!");
    }
  };

  return (
    <div className="min-h-screen bg-[#ffddbb] flex flex-col items-center justify-center p-4">
      <ToastContainer></ToastContainer>
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-black mb-6">UIU Pathshala</h1>

      {/* Signup Container */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left Side Image */}
        <div className="flex-1 hidden md:flex items-center justify-center">
          <img
            src={signupImage}
            alt="Signup"
            className="max-w-full h-auto p-4"
          />
        </div>

        {/* Right Side Form */}
        <div className="flex-1 p-6 md:p-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            {/* Name Input */}
            <div>
              <label
                className="block text-gray-600 font-medium mb-1"
                htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                className="block text-gray-600 font-medium mb-1"
                htmlFor="email">
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
                htmlFor="password">
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
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600">
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <p
                className={`text-sm font-medium mt-1 ${passwordStrength === "Strong"
                    ? "text-green-600"
                    : passwordStrength === "Medium"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}>
                {password && `Password Strength: ${passwordStrength}`}
              </p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                className="block text-gray-600 font-medium mb-1"
                htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Re-enter your password"
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  Passwords do not match!
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full font-bold py-2 px-4 rounded-lg transition duration-200 ${isSignupDisabled
                  ? "bg-orange-200 text-gray-700 cursor-not-allowed"
                  : "bg-[#f68c1e] text-white hover:bg-orange-600"
                }`}
              disabled={isSignupDisabled}>
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-500 font-bold hover:underline">
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
