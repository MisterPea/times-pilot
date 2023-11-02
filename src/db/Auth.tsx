/* eslint-disable react-hooks/exhaustive-deps */
import { initializeApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { Auth as AuthProps, getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, DocumentData, DocumentReference, query, Query, Firestore, updateDoc } from 'firebase/firestore';
import { Dispatch, createContext, useEffect, useRef, useState } from 'react';
import { Article, Bookmark } from '../components/types';

interface AuthComponentProps {
  children: React.ReactNode;
  setUidState: Dispatch<string | undefined>;
}

type AuthContextType = {
  uid: string | null | undefined,
  email: string | null | undefined,
  emailActive: boolean,
  userName: string | null | undefined,
  subscriptions: string[],
  bookmarks: Bookmark[],
  rootSections: string[],
  toggleEmailActive: any;
  updateBookmarks: ((value: Bookmark) => void) | undefined;
  fetchUserInfo: (() => void) | undefined;
  updateSections: ((sections: string[], completeCallback: (value: boolean) => void, settingsPage?: boolean) => void) | undefined;
  credentials: FirebaseApp | null;
  auth: AuthProps | null;
};

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  uid: undefined,
  userName: undefined,
  email: undefined,
  emailActive: true,
  toggleEmailActive: undefined,
  fetchUserInfo: undefined,
  updateSections: undefined,
  updateBookmarks: undefined,
  subscriptions: [],
  bookmarks: [],
  rootSections: [],
  credentials: null
});

export default function Auth({ children, setUidState }: AuthComponentProps) {
  const [uid, setUid] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | undefined | null>(null);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [emailActive, setEmailActive] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null | undefined>(null);
  const [authState, setAuthState] = useState<AuthProps | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [rootSections, setRootSections] = useState<string[]>([]);
  const credentialsRef = useRef<FirebaseApp | null>(null);
  const dbRef = useRef<Firestore | null>(null);

  // Initial load
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
    if (credentialsRef.current === null && credentials) {
      credentialsRef.current = credentials;
      dbRef.current = getFirestore(credentialsRef.current);
    }

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUid(authUser.uid);
        setUserName(authUser.displayName);
        setUidState(authUser.uid);
        setEmail(authUser.email);
        fetchUserInfo(authUser.uid);
      } else {
        setUid(null);
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

  /**
   * Function update get update context with user info
   * @returns void;
   */
  async function fetchUserInfo(scopedUid?: string) {
    const userId: string | undefined = uid ?? scopedUid;
    if (dbRef.current && userId) {
      const userRef = doc(dbRef.current, "users", userId);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const { selections, active, bookmarks, rootSections } = userSnapshot.data();
        setSubscriptions(selections);
        setEmailActive(active);
        setBookmarks(bookmarks);
      }
    } else {
      return new Error('Error no uid or db');
    }
  }

  /**
   * Function to toggle the emailActive on the db and local.
   * @returns void
   */
  async function toggleEmailActive() {
    if (dbRef.current && uid) {
      try {
        const userRef = doc(dbRef.current, "users", uid);
        await updateDoc(userRef, {
          active: !emailActive
        });
        setEmailActive(!emailActive);
      }
      catch (error) {
        return new Error(`${error}-updating email is active`);
      }
    }
  }

  /**
   * Function to handle update of emailed topics section. 
   * @param {string[]} selections Array of strings for the selections to be written. This is not a mutation; it's a complete rewrite
   * @param completeCallback Upon upload success / failure this function is called with success (true) or error (false) arg
   * @param settingsPage If we're on the settings page we want to suppress updates
   */
  async function updateSections(selections: string[], completeCallback: (newValue: boolean) => void, settingsPage: boolean = false) {
    if (dbRef.current && uid) {
      try {
        const userRef = doc(dbRef.current, "users", uid);
        await updateDoc(userRef, {
          selections
        });
        completeCallback(true);
        if (!settingsPage) {
          setSubscriptions(selections);
        }
      } catch (error) {
        completeCallback(false);
      }
    }
  }

  async function updateBookmarks(bookmarkInfo: Bookmark) {
    if (dbRef.current && uid) {
      try {
        const userRef = doc(dbRef.current, "users", uid);
        const tempBookmarks = [...bookmarks];
        let elemIndex: number;
        if (bookmarkInfo.url === undefined) {
          elemIndex = tempBookmarks.findIndex((e) => e.id === bookmarkInfo.id);
        } else {
          elemIndex = tempBookmarks.findIndex((e) => e.url === bookmarkInfo.url);
        }
        if (elemIndex === -1) {
          tempBookmarks.unshift(bookmarkInfo);
        } else {
          tempBookmarks.splice(elemIndex, 1);
        }
        await updateDoc(userRef, {
          bookmarks: tempBookmarks
        });
        setBookmarks(tempBookmarks);
      } catch (error) {
        setBookmarks(bookmarks);
        return new Error(`${error}`);
      }
    }
  }

  return (
    <AuthContext.Provider value={{
      uid: uid,
      userName: userName,
      auth: authState,
      email: email,
      emailActive: emailActive,
      toggleEmailActive,
      updateSections,
      fetchUserInfo,
      bookmarks,
      updateBookmarks,
      rootSections,
      subscriptions: subscriptions,
      credentials: credentialsRef.current
    }}>
      {children}
    </AuthContext.Provider>
  );
}
