/* eslint-disable react-hooks/exhaustive-deps */
import { initializeApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { Auth as AuthProps, getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { Dispatch, createContext, useEffect, useRef, useState } from 'react';

interface AuthComponentProps {
  children: React.ReactNode;
  setUidState: Dispatch<string | undefined>;
}

type AuthContextType = {
  uid: string | null | undefined,
  credentials: FirebaseApp | null;
  auth: AuthProps | null;
};

export const AuthContext = createContext<AuthContextType>({ auth: null, uid: undefined, credentials: null });

export default function Auth({ children, setUidState }: AuthComponentProps) {
  const [user, setUser] = useState<string | null>(null);
  const [authState, setAuthState] = useState<AuthProps | null>(null);
  const credentialsRef = useRef<FirebaseApp | null>(null);
  useEffect(() => {
    const credentials = initializeApp({
      apiKey: 'AIzaSyDetBYYx4c4S3g4JIOCEKgkxloRXq4CVtI',
      authDomain: 'nyt-aggregator.firebaseapp.com',
      databaseURL: 'https://nyt-aggregator.firebaseio.com',
      projectId: 'nyt-aggregator',
      storageBucket: 'nyt-aggregator.appspot.com',
      messagingSenderId: '967423304427',
      appId: '1:967423304427:web:f45aed30d2e4ea2c4654ae',
      measurementId: 'G-V32GK3JSP6',
    });

    const auth = getAuth(credentials);
    const db = getFirestore(credentials);
    const users = collection(db, 'users');

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser.uid);
        setUidState(authUser.uid);
      } else {
        setUser(null);
        setUidState(undefined);
      }
    });

    if (auth && !authState) {
      setAuthState(auth);
    }

    // cleanup on unmount
    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <AuthContext.Provider value={{ uid: user, auth: authState, credentials: credentialsRef.current }}>
      {children}
    </AuthContext.Provider>
  );
}
