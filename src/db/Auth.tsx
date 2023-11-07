/* eslint-disable react-hooks/exhaustive-deps */
import { initializeApp, FirebaseApp } from 'firebase/app';
import { Auth as AuthProps, getAuth, onAuthStateChanged, updateProfile, updateEmail, reauthenticateWithCredential, EmailAuthProvider, updatePassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, Firestore, updateDoc, setDoc } from 'firebase/firestore';
import { Dispatch, createContext, useEffect, useRef, useState } from 'react';
import { Bookmark } from '../components/types';
import baseNewsSections from '../helpers/newsSections';

interface AuthComponentProps {
  children: React.ReactNode;
  setUidState: Dispatch<string | undefined | null>;
  setRootSectionsTopLevel: Dispatch<string[]>; // Main Selection Buttons
}

type AuthStatus = {
  success: boolean,
  message?: any,
};

type AuthContextType = {
  uid: string | null | undefined,
  email: string | null | undefined,
  updateUserEmail: ((newEmail: string, reAuthPassword: string) => Promise<AuthStatus>) | undefined;
  updateUserPassword: ((newPassword: string, reAuthPassword: string) => Promise<AuthStatus>) | undefined;
  createUser: ((email: string, password: string, userName: string) => Promise<AuthStatus>) | undefined,
  emailActive: boolean,
  userName: string | null | undefined,
  updateUserName: ((newName: string) => void) | undefined;
  subscriptions: string[],
  fetchUserInfo: (() => void) | undefined;
  bookmarks: Bookmark[],
  updateBookmarks: ((value: Bookmark) => void) | undefined;
  rootSections: string[],
  updateRootSections: ((value: string[], completeCallback: (value: boolean) => void) => void) | undefined;
  toggleEmailActive: any;
  updateSections: ((sections: string[], completeCallback: (value: boolean) => void, settingsPage?: boolean) => void) | undefined;
  credentials: FirebaseApp | null;
  auth: AuthProps | null;
  logoutUser: (() => Promise<{ loggedOut: boolean; }>) | undefined;
};

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  uid: undefined,
  userName: undefined,
  updateUserName: undefined,
  updateUserPassword: undefined,
  createUser: undefined,
  email: undefined,
  updateUserEmail: undefined,
  emailActive: true,
  toggleEmailActive: undefined,
  fetchUserInfo: undefined,
  updateSections: undefined,
  subscriptions: [],
  bookmarks: [],
  updateBookmarks: undefined,
  rootSections: [],
  updateRootSections: undefined,
  credentials: null,
  logoutUser: undefined,
});

export default function Auth({ children, setUidState, setRootSectionsTopLevel }: AuthComponentProps) {
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
        setRootSectionsTopLevel(baseNewsSections);
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
        setRootSections(rootSections);
        setRootSectionsTopLevel(rootSections);
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

  /**
 * Function to handle update of rootSections - that the user sees atop their page. 
 * @param {string[]} rootSections Array of strings for the selections to be written. This is not a mutation; it's a complete rewrite
 * @param completeCallback Upon upload success / failure this function is called with success (true) or error (false) arg
 */
  async function updateRootSections(rootSections: string[], completeCallback: (newValue: boolean) => void) {
    if (dbRef.current && uid) {
      const rootSectionsSorted = rootSections.sort((a, b) => a.localeCompare(b, 'en', { ignorePunctuation: true }));
      try {
        const userRef = doc(dbRef.current, "users", uid);
        await updateDoc(userRef, {
          rootSections
        });
        completeCallback(true);
        setRootSectionsTopLevel(rootSections);
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

  // **** Account Settings **** //
  /**
   * Function to update username (displayName).
   * @param {string} newName String representing the new name.
   */
  async function updateUserName(newName: string) {
    if (authState?.currentUser) {
      try {
        updateProfile(authState.currentUser, {
          displayName: newName
        });
        setUserName(newName);
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**
   * Sibling function to reauthenticate user before password and email change
   * @param {string} reAuthPassword Current user password
   * @returns {Promise} in the shape of {success:boolean, result:any}
   */
  async function reauthorize(reAuthPassword: string): Promise<AuthStatus> {
    const reAuthResult: AuthStatus = { success: false };
    if (authState?.currentUser?.email) {
      try {
        const credential = EmailAuthProvider.credential(
          authState.currentUser.email,
          reAuthPassword
        );
        const result = await reauthenticateWithCredential(
          authState.currentUser,
          credential
        );
        reAuthResult.success = true;
        reAuthResult.message = result;
      } catch (error) {
        reAuthResult.success = false;
        reAuthResult.message = error;
      }
    }
    return reAuthResult;
  }

  /**
   * Function to allow the changing of a user's email
   * @param {string} newEmail String of new email
   * @param {string} reAuthPassword Current user password
   */
  async function updateUserEmail(newEmail: string, reAuthPassword: string): Promise<AuthStatus> {
    if (!authState?.currentUser) {
      return { success: false, message: 'No current user.' };
    }
    const isReAuthed = await reauthorize(reAuthPassword);
    if (!isReAuthed.success) {
      return { success: false, message: isReAuthed.message };
    }
    try {
      await updateEmail(authState.currentUser, newEmail);
      setEmail(newEmail);
      return { success: true };
    } catch (error: any | { code: string; }) {
      return { success: false, message: error.code || 'Failed to update user email.' };
    }
  }

  /**
   * Function to update an existing user's password
   * @param {string} newPassword New password string
   * @param {string} reAuthPassword Current password string
   * @returns {Promise} Returns a Promise that resolves to an object `{success:boolean, message?:string}` the message is an error message
   */
  async function updateUserPassword(newPassword: string, reAuthPassword: string): Promise<AuthStatus> {
    if (!authState?.currentUser) {
      return { success: false, message: 'No current user.' };
    }
    const isReAuthed = await reauthorize(reAuthPassword);
    if (!isReAuthed.success) {
      return { success: false, message: isReAuthed.message };
    }
    try {
      await updatePassword(authState.currentUser, newPassword);
      return { success: true };
    } catch (error: any | { code: string; }) {
      return { success: false, message: error.code || 'Failed to update password' };
    }
  }

  /**
   * Function to create a new user. Upon acct creation, will set local state and call helper to allocate resources
   * @param {string} email User email
   * @param {string} password User password
   * @param {string} userName User's user name
   * @returns {Promise} Returns a promise in the shape of `{success: boolean, message?: string}`
   */
  async function createUser(email: string, password: string, userName: string): Promise<AuthStatus> {
    if (!authState) {
      return { success: false, message: 'AuthStatus Not Available' };
    }
    try {
      const { user } = await createUserWithEmailAndPassword(authState, email, password);
      await updateUserName(userName);
      setUid(user.uid);
      setEmail(email);
      await allocateUserResources();
      return { success: true };
    } catch (error: any | { code: string; }) {
      return { success: false, message: error.code };
    }
  }

  /**
   * Helper function to allocate user and empty database object.
   * @returns {Promise}
   */
  async function allocateUserResources(): Promise<AuthStatus> {
    if (!dbRef.current) {
      return { success: false, message: 'Database Unavailable' };
    }
    if (!uid) {
      return { success: false, message: 'UID not populated' };
    }
    try {
      await setDoc(doc(dbRef.current, 'users', uid), {
        active: true,
        bookmarks: [],
        rootSections: [],
        selections: [],
      });
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Unable To Allocate Database Resources' };
    }
  }

  async function logoutUser(): Promise<{ loggedOut: boolean; }> {
    if (!authState) {
      return { loggedOut: false };
    }
    try {
      await authState.signOut();
      clearUserInfo()
      return { loggedOut: true };
    } catch (err) {
      return { loggedOut: false };
    }
  }

 function clearUserInfo() {
    setUidState(null);
    setUid(null);
    setUserName('');
    setEmail('');
    setSubscriptions([])
    setBookmarks([])
    setRootSections(baseNewsSections)
  }

  return (  
    <AuthContext.Provider value={{
      uid,
      userName,
      updateUserName,
      updateUserPassword,
      createUser,
      auth: authState,
      email,
      updateUserEmail,
      emailActive,
      toggleEmailActive,
      updateSections,
      fetchUserInfo,
      bookmarks,
      updateBookmarks,
      rootSections,
      updateRootSections,
      subscriptions,
      credentials: credentialsRef.current,
      logoutUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}
