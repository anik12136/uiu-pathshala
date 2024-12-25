import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

const auth = getAuth(app);
//A context is being created for sharing data to all other components
export const AuthContext = createContext(null);

// The components starts in here
const AuthProviders = ({children}) => {
    // This state will capture logged in user data from firebase
    const [user,setUser] = useState(null);

    //Getting logged in user data from firebase
    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser);
        });
        return unsubscribe();
    },[]);


    // create users using email and password
    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password);
    }
    //sign in using email and password
    const signIn = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }
    //sign out from the application
    const logOut = ()=>{
        return signOut(auth);
    }
    
    //Context shareable data
    const shareableData ={
        user,
        createUser,
        signIn,
        logOut,
    }

    return (
        <div>
            {/* Context provider */}
            <AuthContext.Provider value={shareableData}>{children}</AuthContext.Provider>
            
        </div>
    );
};

export default AuthProviders;