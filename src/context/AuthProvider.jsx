import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { clearToken, fetchAndSaveToken, saveUserToDB } from '../utils/api';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // ── helpers ──────────────────────────────────────────────
  const afterLogin = async (firebaseUser) => {
    await fetchAndSaveToken(firebaseUser.email); // JWT save
    await saveUserToDB(firebaseUser);            // DB-তে user save
  };

  // ── auth methods ─────────────────────────────────────────
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).then(async (result) => {
      await afterLogin(result.user);
      return result;
    });
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).then(async (result) => {
      await afterLogin(result.user);
      return result;
    });
  };

  const updateUserProfile = async (displayName, photoURL) => {
    if (!auth.currentUser) {
      throw new Error("No authenticated user found.");
    }

    await updateProfile(auth.currentUser, { displayName, photoURL });

    const updatedUser = {
      ...auth.currentUser,
      displayName,
      photoURL,
    };

    setUser(updatedUser);
    await saveUserToDB(updatedUser);
    return updatedUser;
  };

  const signOutUser = () => {
    setLoading(true);
    clearToken(); // JWT token clear
    return signOut(auth);
  };

  // ── auth state listener ───────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      // Page refresh হলে token নেই কিন্তু user আছে — re-fetch JWT
      if (currentUser) {
        const existing = localStorage.getItem("fn_token");
        if (!existing) {
          await fetchAndSaveToken(currentUser.email);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    updateUserProfile,
    signInUser,
    signInWithGoogle,
    signOutUser,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
