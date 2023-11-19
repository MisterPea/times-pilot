/* eslint-disable react-hooks/exhaustive-deps */
import { initializeApp, FirebaseApp } from 'firebase/app';
import { Auth as AuthProps, getAuth, onAuthStateChanged, updateProfile, updateEmail, reauthenticateWithCredential, EmailAuthProvider, updatePassword, createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { getFirestore, doc, getDoc, Firestore, updateDoc, setDoc, deleteField, setLogLevel } from 'firebase/firestore';
import { Dispatch, createContext, useEffect, useRef, useState } from 'react';
import { Bookmark } from '../components/types';
import baseNewsSections from '../helpers/newsSections';
import { useRouter } from 'next/router';

interface AuthComponentProps {
  children: React.ReactNode;
  setUidState: Dispatch<string | undefined | null>;
  setRootSectionsTopLevel: Dispatch<string[]>; // Main Selection Buttons
}

type ReAuthStatus = {
  success: boolean,
  message?: any,
};

type AuthStatusNew = {
  name: "success" | "Error",
  message?: string,
};

type AuthContextType = {
  uid: string | null | undefined,
  email: string | null | undefined,
  updateUserEmail: ((newEmail: string, reAuthPassword: string) => Promise<AuthStatusNew>) | undefined;
  updateUserPassword: ((newPassword: string, reAuthPassword: string) => Promise<AuthStatusNew>) | undefined;
  createUser: ((email: string, password: string, userName: string) => Promise<AuthStatusNew>) | undefined,
  deleteAccount: ((reAuthPassword: string) => Promise<AuthStatusNew>) | undefined,
  emailActive: boolean,
  userName: string | null | undefined,
  updateUserName: ((newName: string) => void) | undefined;
  subscriptions: string[],
  getDbContents: ((credentials: FirebaseApp, uid: string) => void) | undefined;
  bookmarks: Bookmark[],
  updateBookmarks: ((value: Bookmark) => void) | undefined;
  rootSections: string[] | undefined,
  updateRootSections: ((rootSections: string[]) => Promise<{ success: boolean, message?: string; }>) | undefined;
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
  deleteAccount: undefined,
  email: undefined,
  updateUserEmail: undefined,
  emailActive: true,
  toggleEmailActive: undefined,
  getDbContents: undefined,
  updateSections: undefined,
  subscriptions: [],
  bookmarks: [],
  updateBookmarks: undefined,
  rootSections: undefined,
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
  const { replace } = useRouter();

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
    // setLogLevel('debug');
    if (credentialsRef.current === null && credentials) {
      credentialsRef.current = credentials;
      userInfo.setCredentials(credentials);
    }

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser && authUser.uid) { // Added check for authUser.uid
        setUid(authUser.uid);
        setUidState(authUser.uid);
        setUserName(authUser.displayName);
        setEmail(authUser.email);
        userInfo.setUid(authUser.uid);
      } else {
        setUid(null); // Why are we treating Auth component state differently?
        setUidState(undefined);
        setRootSectionsTopLevel(Object.keys(baseNewsSections));
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
   * @module userInfo
   * @description Module to set uid and credentials and fetch db collections
   */
  const userInfo = (function () {
    let moduleUid: null | string = null;
    let moduleCredentials: null | FirebaseApp = null;

    // private function 
    function _checkAndFetchData() {
      let activeUid = moduleUid || uid;
      let activeCredentials = moduleCredentials || credentialsRef.current;
      if (activeUid && activeCredentials) {
        getDbContents(activeCredentials, activeUid);
      }
    }

    return {
      setUid: function (newUid: string) {
        moduleUid = newUid;
        _checkAndFetchData();
      },
      setCredentials: function (newCredentials: FirebaseApp) {
        moduleCredentials = newCredentials;
        _checkAndFetchData();
      }
    };
  })();


  /**
   * Function to get db collection and set state/context
   * @param {FirebaseApp} credentials Credential created from Firebase auth
   * @param {string} uid User id
   */
  async function getDbContents(credentials: FirebaseApp, uid: string) {
    const dbRefLocal = getFirestore(credentials);
    // Once we connect to db we're storing it.
    dbRef.current = dbRefLocal;
    const userRef = doc(dbRefLocal, "users", uid);
    try {
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const { selections, active, bookmarks, rootSections } = userSnapshot.data();
        setSubscriptions(selections);
        setEmailActive(active);
        setBookmarks(bookmarks);
        setRootSections(rootSections);
        setRootSectionsTopLevel(rootSections);
      }
    } catch (error: any | { message: string; }) {
      console.warn(error);
      throw new Error(error.message);
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
  async function updateRootSections(rootSections: string[]): Promise<{ success: boolean, message?: string; }> {
    if (!(dbRef.current && uid)) {
      return { success: false, message: 'No UID or Database Reference' };
    }
    try {
      const rootSectionsSorted = rootSections.sort((a, b) => a.localeCompare(b, 'en', { ignorePunctuation: true }));
      const userRef = doc(dbRef.current, "users", uid);
      await updateDoc(userRef, {
        rootSections: rootSectionsSorted
      });
      setRootSectionsTopLevel(rootSectionsSorted);
      const firstRoute = rootSectionsSorted[0].toLowerCase();
      replace(`/${firstRoute}`);
      return { success: true };
    } catch (error) {
      return { success: false, message: `${error}` };
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
  async function reauthorize(reAuthPassword: string): Promise<ReAuthStatus> {
    const reAuthResult: ReAuthStatus = { success: false };
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
  async function updateUserEmail(newEmail: string, reAuthPassword: string): Promise<AuthStatusNew> {
    if (!authState?.currentUser) {
      throw new Error('User not found');
    }
    const isReAuthed = await reauthorize(reAuthPassword);
    if (!isReAuthed.success) {
      throw new Error(isReAuthed.message);
    }
    try {
      await updateEmail(authState.currentUser, newEmail);
      setEmail(newEmail);
      return { name: 'success' };
    } catch (error: any | { code: string; }) {
      throw new Error(error.code || 'Failed to update user email');
    }
  }

  /**
   * Function to update an existing user's password
   * @param {string} newPassword New password string
   * @param {string} reAuthPassword Current password string
   * @returns {Promise} Returns a Promise that resolves to an object `{success:boolean, message?:string}` the message is an error message
   */
  async function updateUserPassword(newPassword: string, reAuthPassword: string): Promise<AuthStatusNew> {
    if (!authState?.currentUser) {
      throw new Error('User not found');
    }
    const isReAuthed = await reauthorize(reAuthPassword);
    if (!isReAuthed.success) {
      throw new Error(isReAuthed.message);
    }
    try {
      await updatePassword(authState.currentUser, newPassword);
      return { name: 'success' };
    } catch (error: any | { code: string; }) {
      throw new Error(error.code || 'Failed to update password');
    }
  }

  /**
   * Function to create a new user. Upon acct creation, will set local state and call helper to allocate resources
   * @param {string} email User email
   * @param {string} password User password
   * @param {string} userName User's user name
   * @returns {Promise} Returns a promise in the shape of `{success: boolean, message?: string}`
   */
  async function createUser(email: string, password: string, userName: string): Promise<AuthStatusNew> {
    if (!authState) {
      throw new Error('AuthStatus Not Available');
    }
    try {
      const { user } = await createUserWithEmailAndPassword(authState, email, password);
      await updateUserName(userName);
      setUid(user.uid);
      setEmail(email);
      await allocateUserResources(user.uid);
      return { name: 'success' };
    } catch (error: any | { code: string; }) {
      throw new Error(error.code);
    }
  }

  /**
   * Helper function to allocate user and empty database object.
   * @returns {Promise}
   */
  async function allocateUserResources(uidArg: string): Promise<AuthStatusNew> {
    if (!dbRef.current) {
      throw new Error('Database Unavailable');
    }
    try {
      await setDoc(doc(dbRef.current, 'users', uidArg), {
        active: true,
        bookmarks: [],
        rootSections: [],
        selections: [],
      });
      return { name: 'success' };
    } catch (error) {
      throw new Error('Unable To Allocate Database Resources');
    }
  }

  /**
   * Function to log out current user
   * @returns {Promise} {loggedOut:boolean}
   */
  async function logoutUser(): Promise<{ loggedOut: boolean; }> {
    if (!authState) {
      return { loggedOut: false };
    }
    try {
      await authState.signOut();
      clearUserInfo();
      return { loggedOut: true };
    } catch (err) {
      return { loggedOut: false };
    }
  }

  /**
   * Convenience function to reset local user data
   */
  function clearUserInfo() {
    setUidState(null);
    setUid(null);
    setUserName('');
    setEmail('');
    setSubscriptions([]);
    setBookmarks([]);
    setRootSections(Object.keys(baseNewsSections));
  }

  /**
   * Function to delete the current user
   * @param {string} reAuthPassword Current password
   * @returns {Promise} Returns a promise in the shape of `{name: boolean, message?: string}`
   */
  async function deleteAccount(reAuthPassword: string): Promise<AuthStatusNew> {
    if (!authState?.currentUser) {
      throw new Error('User not found');
    }
    const isReAuthed = await reauthorize(reAuthPassword);
    if (!isReAuthed.success) {
      throw new Error(isReAuthed.message);
    }
    try {
      await deallocateDatabase();
      await deleteUser(authState.currentUser);
      return { name: 'success' };
    } catch (error: any | { code: string; }) {
      throw new Error(error.code || 'Failed Delete Account');
    }
  }

  async function deallocateDatabase(): Promise<AuthStatusNew> {
    if (!(dbRef.current && uid)) {
      throw new Error('No database to deallocate');
    }
    try {
      const userRef = doc(dbRef.current, "users", uid);
      await updateDoc(userRef, {
        active: deleteField(),
        bookmarks: deleteField(),
        rootSections: deleteField(),
        selections: deleteField(),
      });
      return { name: 'success' };
    }
    catch (error) {
      throw new Error('Could not deallocate resources');
    }
  }

  return (
    <AuthContext.Provider value={{
      uid,
      userName,
      updateUserName,
      updateUserPassword,
      createUser,
      deleteAccount,
      auth: authState,
      email,
      updateUserEmail,
      emailActive,
      toggleEmailActive,
      updateSections,
      getDbContents,
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
