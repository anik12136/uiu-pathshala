import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthProviders";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupPage = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-600 to-orange-300 p-6">
      <ToastContainer />
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-4xl">
        <div
          className="md:w-1/2 bg-cover bg-center h-64 md:h-auto"
          style={{
            backgroundImage:
              "url('https://cdni.iconscout.com/illustration/premium/thumb/sign-up-illustration-download-in-svg-png-gif-file-formats--log-register-form-user-interface-pack-design-development-illustrations-6430773.png?f=webp')",
          }}
        ></div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create Your Account</h2>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Full Name" className="w-full border border-black rounded-lg px-4 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Student ID" className="w-full border border-black rounded-lg px-4 py-2" value={studentID} onChange={(e) => setStudentID(e.target.value)} required />
            <div>
              <input type="email" placeholder="Email" className={`w-full border ${emailError ? "border-red-500" : "border-black"} rounded-lg px-4 py-2`} value={email} onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }} required />
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            </div>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="Password" className={`w-full border ${passwordError ? "border-red-500" : "border-black"} rounded-lg px-4 py-2 pr-10`} value={password} onChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value); }} required />
              <button type="button" className="absolute right-3 top-3 text-gray-600" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>
            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" className={`w-full border ${confirmPasswordError ? "border-red-500" : "border-black"} rounded-lg px-4 py-2 pr-10`} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); validateConfirmPassword(e.target.value); }} required />
            </div>
            <button type="submit" className={`w-full bg-orange-400 text-white py-2 rounded-lg ${isSignupDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"}`} disabled={isSignupDisabled}>Sign Up</button>
          </form>
          {/* Sign-Up Link */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-500 font-bold hover:underline"
              >
                Login Here..
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
