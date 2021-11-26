import { useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import initializetioAuthentication from "../components/firebase/firebase.initi";
import { useEffect } from "react";
initializetioAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [admin, setadmin] = useState(false);
  const auth = getAuth();

  const singInWithGoogle = (history, redirec_url) => {
    setisLoading(true);
    const Gooleprovider = new GoogleAuthProvider();
    signInWithPopup(auth, Gooleprovider)
      .then((result) => {
        setUser(result.user);
        // console.log(result.user);
        adduserDB(result.user.email, result.user.displayName, "PUT");
        history.push(redirec_url);
      })
      .catch((error) => {
        seterror(error.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const signUpWithEmail = (email, password, name, phone, history) => {
    setisLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        updateUserProfile(name, phone);
        adduserDB(result.user.email, name, "POST");
        history.push("/");
        // console.log(result.user);
      })
      .catch((error) => {
        seterror(error.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  const updateUserProfile = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        // Profile updated!
      })
      .catch((error) => {
        seterror(error.message);
      });
  };

  const signInWithemailPass = (email, password) => {
    setisLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // console.log(user);
      } else {
        setUser({});
      }
      setisLoading(false);
    });
    return () => {};
  }, []);

  useEffect(() => {
    fetch(`https://arcane-river-87047.herokuapp.com/user/isadmin/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setadmin(data.admin);
      });
  }, [user.email]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const adduserDB = (email, name, method) => {
    const user = { email, name };
    fetch("https://arcane-river-87047.herokuapp.com/user/add", {
      headers: {
        "Content-Type": "application/json",
      },
      method: method,
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return {
    user,
    setUser,
    admin,
    seterror,
    isLoading,
    setisLoading,
    singInWithGoogle,
    signUpWithEmail,
    signInWithemailPass,
    logout,
  };
};

export default useFirebase;
