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
  const [studentID, setStudentID,] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const isSignupDisabled =
    name.trim() === "" ||
    studentID.trim() === "" ||
    email.trim() === "" ||
    password.trim() === "" ||
    confirmPassword.trim() === "" ||
    password !== confirmPassword;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      // Create User with Firebase Auth
      const result = await createUser(email, password);
      const user = result.user;

      // // Update User Profile
      // await updateUserProfile({
      //   displayName: name,
      //   photoURL: photoURL,
      // });

      // Store User Data in Database
      const userData = {
        name,
        studentID,
        email,
        photoURL: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
        role: "user",
        rating:0,
        department:"",
        
      };

      const response = await fetch(
        "http://localhost:7000/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

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
    <div className="min-h-screen bg-[#ffddbb] flex flex-col items-center justify-center p-4">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-black mb-6">UIU Pathshala</h1>

      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row">
        <div className="flex-1 hidden md:flex items-center justify-center">
          <img src={signupImage} alt="Signup" className="max-w-full h-auto p-4" />
        </div>

        <div className="flex-1 p-6 md:p-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            {/* Name Input */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

           

            {/* student Id Input */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Student ID</label>
              <input
                type="number"
                placeholder="Enter your Student ID"
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500"
                value={studentID}
                onChange={(e) => setStudentID(e.target.value)}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Confirm Password Input */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
           

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full font-bold py-2 px-4 rounded-lg transition duration-200 ${isSignupDisabled
                  ? "bg-orange-200 text-gray-700 cursor-not-allowed"
                  : "bg-[#f68c1e] text-white hover:bg-orange-600"
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
