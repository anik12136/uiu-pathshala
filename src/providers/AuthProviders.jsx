import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

// Auth creation
const auth = getAuth(app);

// A context is being created for sharing data with other components
export const AuthContext = createContext(null);

// The component starts here
const AuthProviders = ({ children }) => {
  // State to capture logged-in user data from Firebase
  const [user, setUser] = useState(null);
  // Managing the loading state
  const [loading, setLoading] = useState(true);
  console.log("Loading State:", loading);

  // Getting logged-in user data from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state change:", currentUser);
      setUser(currentUser);
      setLoading(false); // Loading ends when auth state check is complete
    });

    return () => {
      unsubscribe(); // Cleanup subscription on unmount
    };
  }, []);

  // Create users using email and password
  const createUser = (email, password) => {
    setLoading(true); // Set loading when user creation starts
    return createUserWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  // Sign in using email and password
  const signIn = (email, password) => {
    setLoading(true); // Set loading when sign-in starts
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  // Sign out from the application
  const logOut = () => {
    setLoading(true); // Set loading when logout starts
    return signOut(auth).finally(() => setLoading(false));
  };

  // Context shareable data
  const shareableData = {
    user,
    loading, // Added loading to shared context
    createUser,
    signIn,
    logOut,
  };

  return (
    <div>
      {/* Context provider */}
      <AuthContext.Provider value={shareableData}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProviders;
